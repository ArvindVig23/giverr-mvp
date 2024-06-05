import { db } from '@/firebase/config';
import responseHandler from '@/lib/responseHandler';
import { addDoc, collection, getDoc } from 'firebase/firestore';
import { currentUtcDate } from './opportunityServices';
import { ADMIN_EMAIL, DOMAIN_URL, TOKEN_SECRET } from '@/constants/constants';
import jwt from 'jsonwebtoken';
import { compileEmailTemplate } from './handlebars';
import { sendEmail } from './emailService';

export const createOrganization = async (
  id: string,
  name: string,
  username: string,
  avatarLink: string,
  website: string,
  createdBy: string,
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

    // organizationMembers with the role owner
    await addDoc(collection(db, 'organizationMembers'), {
      userId: id,
      organizationId: createdOrgDoc.id,
      status: true, // wil might chnage to false as default value
      role: 'OWNER',
      createdAt: currentUtcDate,
      updatedAt: currentUtcDate,
    });
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

    const template = compileEmailTemplate(
      'src/templates/approveOrgTemplate.html',
      emailData,
    );
    await sendEmail(
      ADMIN_EMAIL!,
      'Post Approval Required',
      'Post Approval Required',
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
