import { db } from '@/firebase/config';
import responseHandler from '@/lib/responseHandler';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  writeBatch,
} from 'firebase/firestore';
import { currentUtcDate } from './opportunityServices';
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
        await createTokenForInvitation(createdMemberDetails.id);
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

export const createTokenForInvitation = async (id: string) => {
  try {
    const token = jwt.sign({ id }, TOKEN_SECRET!);
    await addDoc(collection(db, 'organizationMemberInviteToken'), {
      memberId: id,
      createdAt: currentUtcDate,
      updatedAt: currentUtcDate,
      token,
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
