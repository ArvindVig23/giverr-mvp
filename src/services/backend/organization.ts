import { db } from '@/firebase/config';
import responseHandler from '@/lib/responseHandler';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  writeBatch,
} from 'firebase/firestore';
import { currentUtcDate, getUserDetailsById } from './opportunityServices';
import { ADMIN_EMAIL, DOMAIN_URL, TOKEN_SECRET } from '@/constants/constants';
import jwt from 'jsonwebtoken';
import { compileEmailTemplate } from './handlebars';
import { sendEmail } from './emailService';
import { approveOrgTemplate } from '@/utils/templates/approveOrgTemplate';

export const createOrganization = async (
  id: string,
  name: string,
  username: string,
  avatarLink: string,
  website: string,
  createdBy: string,
  members: any[],
) => {
  try {
    const createOrg = await addDoc(collection(db, 'organizations'), {
      username: username.toLowerCase().trim(),
      name: name.trim(),
      website: website.trim(),
      avatarLink: avatarLink.trim(),
      status: 'PENDING',
      createdBy: id,
      createdAt: currentUtcDate,
      updatedAt: currentUtcDate,
    });
    const createdOrgDoc = await getDoc(createOrg);
    const createdOrgData = createdOrgDoc.data();
    const orgId = createdOrgDoc.id;

    // create the members
    const createMembers = await createMember(members, id, orgId);
    if (!createMembers) {
      const response = responseHandler(
        500,
        false,
        null,
        'Error in creating organization.',
      );
      return response;
    }
    // send email for approval
    const token = jwt.sign({ orgId }, TOKEN_SECRET!, {
      expiresIn: '1w',
    });
    const approvalUrl = `${DOMAIN_URL}/api/organization-status?token=${token}&status=APPROVED`;
    const rejectUrl = `${DOMAIN_URL}/api/organization-status?token=${token}&status=REJECTED`;
    const emailData = {
      name,
      username,
      website,
      createdBy: createdBy,
      approvalUrl,
      rejectUrl,
    };

    const template = compileEmailTemplate(approveOrgTemplate, emailData);
    await sendEmail(
      ADMIN_EMAIL!,
      'Organization Approval Required',
      'Organization Approval Required',
      template,
    );
    const response = responseHandler(
      200,
      true,
      { ...createdOrgData, id: createdOrgDoc.id },
      'Organization submitted Successfully and sent for approval',
    );
    return response;
  } catch (error) {
    console.log(error, 'Error in sign up');
    const response = responseHandler(
      500,
      false,
      null,
      'Error in creating organization.',
    );
    return response;
  }
};

// service to create the member
export const createMember = async (
  members: any,
  userId: string,
  orgId: string,
) => {
  try {
    const batch = writeBatch(db);

    // Store the references for the members that need a token
    const membersNeedingTokens: any[] = [];

    members.forEach((memberId: string) => {
      // Create a new document reference for each member
      const memberRef = doc(collection(db, 'organizationMembers'));

      // Add the operation to the batch
      batch.set(memberRef, {
        userId: memberId,
        organizationId: orgId,
        status: memberId === userId ? 'APPROVED' : 'PENDING',
        role: memberId === userId ? 'OWNER' : 'MEMBER',
        createdAt: currentUtcDate,
        updatedAt: currentUtcDate,
      });

      // Collect member references that need tokens
      if (memberId !== userId) {
        membersNeedingTokens.push(memberRef);
      }
    });

    // Commit the batch
    await batch.commit();

    // Handle token creation for the members that need it
    await Promise.all(
      membersNeedingTokens.map(async (memberRef) => {
        const createdMemberDetails = await getDoc(memberRef);
        await createTokenForInvitation(createdMemberDetails.id, orgId);
      }),
    );
    return true;
  } catch (error) {
    console.log(error, 'Error in creating members');
    const response = responseHandler(
      500,
      false,
      null,
      'Error in creating organization.',
    );
    throw response;
  }
};

export const createTokenForInvitation = async (id: string, orgId: string) => {
  try {
    const token = jwt.sign({ id }, TOKEN_SECRET!);
    await addDoc(collection(db, 'organizationMemberInviteToken'), {
      memberId: id,
      createdAt: currentUtcDate,
      updatedAt: currentUtcDate,
      token,
      organizationId: orgId,
    });
  } catch (error) {
    console.log(error, 'Error in creating token entry');
    const response = responseHandler(
      500,
      false,
      null,
      'Error in creating organization.',
    );
    throw response;
  }
};

// get members associated with organization
export const getMembersForOrganization = async (orgId: string) => {
  try {
    const membersRef = collection(db, 'organizationMembers');
    const querySnapshot = await getDocs(
      query(
        membersRef,
        where('organizationId', '==', orgId),
        where('status', '!=', 'REJECTED'),
      ),
    );
    const listOfMembers = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const memberData = {
          id: doc.id,
          ...doc.data(),
          userDetails: await getUserDetailsById(doc.data().userId), // Call getUserDetailsById here
        };
        return memberData;
      }),
    );
    listOfMembers.sort((a: any, b: any) => {
      if (a.role === 'OWNER') return -1;
      if (b.role === 'OWNER') return 1;
      return 0;
    });
    return listOfMembers;
  } catch (error) {
    const response = responseHandler(
      500,
      false,
      null,
      'Error in creating organization.',
    );
    throw response;
  }
};

//  delete org members
export const deleteInviteUser = async (orgId: string, memberId: string) => {
  try {
    // Create a query to find the invite document
    const q = query(
      collection(db, 'organizationMemberInviteToken'),
      where('memberId', '==', memberId),
      where('organizationId', '==', orgId),
    );

    // Get a reference to the document
    const querySnapshot = await getDocs(q);

    // Check if a document was found
    if (querySnapshot.size === 0) {
      return;
    }

    const doc = querySnapshot.docs[0].ref;
    await deleteDoc(doc);
  } catch (error) {
    console.log(error, 'Error in deleting the associated token record');

    const response = responseHandler(
      500,
      false,
      null,
      'Error in Deleting organization member.',
    );
    throw response;
  }
};
