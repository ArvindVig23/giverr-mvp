import { db } from '@/firebase/config';
import { OrgDetails } from '@/interface/organization';
import responseHandler from '@/lib/responseHandler';
import { getUserDetailsCookie } from '@/services/backend/commonServices';
import {
  createOrganization,
  getMembersForOrganization,
} from '@/services/backend/organization';
import { orgIdSchema, organizationSchema } from '@/utils/joiSchema';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { NextRequest } from 'next/server';
export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { name, username, avatarLink, website, members } = reqBody;
    // validations check
    const { error } = organizationSchema.validate({
      name,
      username,
      website,
    });
    if (error) {
      const errorMessage: string = error.details
        .map((err) => err.message)
        .join('; ');

      const response = responseHandler(403, false, null, errorMessage);
      return response;
    }

    //  userDetails
    const userDetails = getUserDetailsCookie();
    const convertString = JSON.parse(userDetails.value);
    const { id, fullName, email } = convertString;
    //  check organization with existing username globally
    const organizationRef = collection(db, 'organizations');
    // to check the username should be unique gloablly
    const orgQuery = query(
      organizationRef,
      where('createdBy', '!=', id),
      where('username', '==', username.trim().toLowerCase()),
    );
    const usernameExist = await getDocs(orgQuery);
    if (!usernameExist.empty) {
      const response = responseHandler(
        409,
        false,
        null,
        'Organization with this username already exists',
      );
      return response;
    }
    // Firebse does not support OR operator that is the reason we are quering the in different query
    // Query for existing organization by username under loggedin user
    const usernameQuery = query(
      organizationRef,
      where('createdBy', '==', id),
      where('username', '==', username.trim().toLowerCase()),
      where('status', '!=', 'REJECTED'),
    );

    // Query for existing organization by name under loggedin user
    const nameQuery = query(
      organizationRef,
      where('createdBy', '==', id),
      where('nameLowerCase', '==', name.trim().toLowerCase()),
      where('status', '!=', 'REJECTED'),
    );

    // Execute both queries
    const [usernameSnapshot, nameSnapshot] = await Promise.all([
      getDocs(usernameQuery),
      getDocs(nameQuery),
    ]);

    // Check if any organization exists
    if (!usernameSnapshot.empty || !nameSnapshot.empty) {
      const response = responseHandler(
        409,
        false,
        null,
        'Organization with this username/organization name already exists under your account.',
      );
      return response;
    }

    //  create new organization
    const newOrganization = await createOrganization(
      id,
      name,
      username,
      avatarLink,
      website,
      fullName ? fullName : email,
      members,
    );
    return newOrganization;
  } catch (error) {
    console.log(error, 'Error creating organization');
    const response = responseHandler(
      500,
      false,
      null,
      'Error in creating organization.',
    );
    return response;
  }
}

export async function GET() {
  try {
    const userDetailCookie = getUserDetailsCookie();
    const convertString = JSON.parse(userDetailCookie.value);
    const { id } = convertString;
    const organizationsRef = collection(db, 'organizations');
    const queryWhereCondition = query(
      organizationsRef,
      where('createdBy', '==', id),
      where('status', '!=', 'REJECTED'),
    );
    const querySnapshot = await getDocs(queryWhereCondition);

    let data: OrgDetails[] = [];
    if (!querySnapshot.empty) {
      data = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const organizationData = doc.data();
          const orgId = doc.id;
          organizationData.id = orgId;

          // Get members for this organization
          const memberList = await getMembersForOrganization(orgId);
          organizationData.members = memberList;

          return organizationData;
        }),
      );
    }

    const response = responseHandler(
      200,
      false,
      data,
      'Organization fetched successfully',
    );
    return response;
  } catch (error) {
    console.log(error, 'Error in getting organization');
    const response = responseHandler(
      500,
      false,
      null,
      'Error in getting organization.',
    );
    return response;
  }
}

// update organization
export async function PUT(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { orgId, name, username, avatarLink, website } = reqBody;

    // validations check
    const { error } = organizationSchema.validate({
      name,
      username,
      website,
      orgId,
    });
    if (error) {
      const errorMessage: string = error.details
        .map((err) => err.message)
        .join('; ');

      const response = responseHandler(403, false, null, errorMessage);
      return response;
    }
    // check if organization exists or not
    const orgRef = doc(db, 'organizations', orgId);
    const organizationDoc = await getDoc(orgRef);
    const orgData = organizationDoc.data();
    if (!orgData) {
      const response = responseHandler(
        404,
        false,
        null,
        'Organization does not exist.',
      );
      return response;
    }

    //  userDetails
    const userDetails = getUserDetailsCookie();
    const convertString = JSON.parse(userDetails.value);
    const { id } = convertString;

    //  check organization with existing username
    const organizationRef = collection(db, 'organizations');
    const orgQuery = query(
      organizationRef,
      where('createdBy', '!=', id),
      where('username', '==', username.trim().toLowerCase()),
    );
    const usernameExist = await getDocs(orgQuery);
    if (!usernameExist.empty) {
      const response = responseHandler(
        409,
        false,
        null,
        'Organization with this username already exists',
      );
      return response;
    }

    // Firebse does not support OR operator that is the reason we are quering the in different query
    // Query for existing organization by username under loggedin user
    const usernameQuery = query(
      organizationRef,
      where('createdBy', '==', id),
      where('username', '==', username.trim().toLowerCase()),
      where('status', '!=', 'REJECTED'),
      // where('__name__', '!=', orgId),
    );

    // Query for existing organization by name under loggedin user
    const nameQuery = query(
      organizationRef,
      where('createdBy', '==', id),
      where('nameLowerCase', '==', name.trim().toLowerCase()),
      where('status', '!=', 'REJECTED'),
      // where('__name__', '!=', orgId),
    );

    // Execute both queries
    const [usernameSnapshot, nameSnapshot] = await Promise.all([
      getDocs(usernameQuery),
      getDocs(nameQuery),
    ]);

    const usernameExists = usernameSnapshot.docs.some(
      (doc) => doc.id !== orgId,
    );
    const nameExists = nameSnapshot.docs.some((doc) => doc.id !== orgId);

    // Check if any organization exists
    if (usernameExists || nameExists) {
      const response = responseHandler(
        409,
        false,
        null,
        'Organization with this username/organization name already exists under your account.',
      );
      return response;
    }

    // update details
    await updateDoc(doc(db, 'organizations', orgId), {
      name,
      username,
      avatarLink,
      website,
      nameLowerCase: name.toLowerCase(),
    });
    const response = responseHandler(
      200,
      true,
      {
        name,
        username,
        avatarLink,
        website,
        id: orgId,
        status: orgData.status,
      },
      'Organization updated Successfully',
    );
    return response;
  } catch (error) {
    console.log(error, 'Error updating organization');
    const response = responseHandler(
      500,
      false,
      null,
      'Error in updating organization.',
    );
    return response;
  }
}

// delete organization
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const orgId: any = searchParams.get('orgId');
    const { error } = orgIdSchema.validate({ orgId });
    if (error) {
      const errorMessage: string = error.details
        .map((err) => err.message)
        .join('; ');

      const response = responseHandler(403, false, null, errorMessage);
      return response;
    }
    // check if org exists
    const orgRef = collection(db, 'organizations');
    const docRef = doc(orgRef, orgId);
    const docSnap = await getDoc(docRef);
    const orgData: any = docSnap.data();
    if (!orgData) {
      const response = responseHandler(
        404,
        false,
        null,
        'Organization not found',
      );
      return response;
    }

    // delete the organization with id
    await deleteDoc(doc(db, 'organizations', orgId));

    //  delete all the records from the organization member as well
    const orgMemberRef = collection(db, 'organizationMembers');
    const q = query(orgMemberRef, where('organizationId', '==', orgId));
    const existedOrgMembers = await getDocs(q);

    const batch = writeBatch(db);
    if (!existedOrgMembers.empty) {
      existedOrgMembers.forEach((doc) => {
        batch.delete(doc.ref);
      });
    }

    // delete records from the token table as well
    const tokemMemberRef = collection(db, 'organizationMemberInviteToken');
    const memQuery = query(
      tokemMemberRef,
      where('organizationId', '==', orgId),
    );
    const membersWithToken = await getDocs(memQuery);

    if (!membersWithToken.empty) {
      membersWithToken.forEach((doc) => {
        batch.delete(doc.ref);
      });
    }

    // deleting events of organizations
    const opportunitiesRef = collection(db, 'opportunities');
    const opportunityQuery = query(
      opportunitiesRef,
      where('organizationId', '==', orgId),
    );

    const opportunitiesSnapshot = await getDocs(opportunityQuery);
    await Promise.all(
      opportunitiesSnapshot.docs.map(async (doc) => {
        // deleting volunteers data
        const oppVolunteersQuery = query(
          collection(db, 'opportunityMembers'),
          where('opportunityId', '==', doc.id),
        );
        const oppVolunteersSnapShot = await getDocs(oppVolunteersQuery);
        if (!oppVolunteersSnapShot.empty) {
          oppVolunteersSnapShot.docs.forEach((volData) => {
            batch.delete(volData.ref);
          });
        }
        // deleting location data
        const locationsQuery = query(
          collection(db, 'opportunityLocations'),
          where('opportunityId', '==', doc.id),
        );
        const locationsSnapshot = await getDocs(locationsQuery);
        if (!locationsSnapshot.empty) {
          locationsSnapshot.forEach((locationDoc) => {
            batch.delete(locationDoc.ref);
          });
        }
        // deleting commitment data
        const commitmentQuery = query(
          collection(db, 'opportunityCommitment'),
          where('opportunityId', '==', doc.id),
        );
        const commitmentSnapshot = await getDocs(commitmentQuery);
        if (!commitmentSnapshot.empty) {
          commitmentSnapshot.forEach((commitmentDoc) => {
            batch.delete(commitmentDoc.ref);
          });
        }
        batch.delete(doc.ref);
        await batch.commit();
      }),
    );

    const response = responseHandler(
      200,
      true,
      null,
      'Organization deleted Successfully',
    );
    return response;
  } catch (error) {
    console.log(error, 'Error in deleting organization');
    const response = responseHandler(
      500,
      false,
      null,
      'Error in deleting organization.',
    );
    return response;
  }
}
