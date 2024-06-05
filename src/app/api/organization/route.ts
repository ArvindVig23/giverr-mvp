import { db } from '@/firebase/config';
import responseHandler from '@/lib/responseHandler';
import { getUserDetailsCookie } from '@/services/backend/commonServices';
import { createOrganization } from '@/services/backend/organization';
import { organizationSchema } from '@/utils/joiSchema';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { name, username, avatarLink, website } = reqBody;
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
    const { id } = convertString;
    //  check organization with existing username
    const organizationRef = collection(db, 'organizations');
    const orgQuery = query(
      organizationRef,
      where('createdBy', '==', id),
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

    //  create new organization
    const newOrganization = await createOrganization(
      id,
      name,
      username,
      avatarLink,
      website,
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
    );
    const querySnapshot = await getDocs(queryWhereCondition);

    let data = null;
    if (!querySnapshot.empty) {
      const organizationData = querySnapshot.docs[0].data();
      organizationData.id = querySnapshot.docs[0].id;
      data = organizationData;
    }
    const response = responseHandler(
      200,
      false,
      data,
      'Organization fetched successfully',
    );
    return response;
  } catch (error) {
    console.log(error, 'Error in sign up');
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
    // update details
    await updateDoc(doc(db, 'organizations', orgId), {
      name,
      username,
      avatarLink,
      website,
    });
    console.log(updateDoc, 'data');
    const response = responseHandler(
      200,
      true,
      { name, username, avatarLink, website, id: orgId },
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
