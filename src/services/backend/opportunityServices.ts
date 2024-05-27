import { ADMIN_EMAIL, DOMAIN_URL, TOKEN_SECRET } from '@/constants/constants';
import { generateApprovalTemplate } from '@/emailTemplate/approval';
import { db } from '@/firebase/config';
import responseHandler from '@/lib/responseHandler';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import moment from 'moment-timezone';
import jwt from 'jsonwebtoken';
import { sendEmail } from './emailService';
import { getFormattedLocalTime } from '../frontend/commonServices';
//  current date to utc format
export const currentUtcDate = moment().tz('UTC').toDate().toISOString();

// create opportunity
export const createOpportunity = async (opportunity: any) => {
  try {
    const {
      name,
      registrationType,
      frequency,
      description,
      activities,
      volunteerRequirements,
      registrationWebsiteLink,
      organizationId,
      opportunityType,
      eventDate,
      createdBy,
      imageLink,
      location,
    } = opportunity;
    const createOpportunity = await addDoc(collection(db, 'opportunities'), {
      name: name.trim(),
      registrationType,
      frequency,
      description,
      activities,
      volunteerRequirements,
      registrationWebsiteLink,
      organizationId,
      opportunityType,
      eventDate,
      createdBy,
      imageLink,
      location,
      status: 'pending',
      lowercaseName: name.toLowerCase().trim(),
      createdAt: currentUtcDate,
      updatedAt: currentUtcDate,
    });

    await sendEmailForApproval(
      name,
      description,
      frequency,
      activities,
      volunteerRequirements,
      eventDate,
      location,
      createOpportunity.id,
      organizationId,
      opportunityType,
      createdBy,
    );
    const response = responseHandler(
      200,
      true,
      null,
      'Opportunity created Successfully',
    );
    return response;
  } catch (error) {
    const response = responseHandler(
      500,
      false,
      null,
      'Error in creating new opportunity.',
    );
    return response;
  }
};

export const getOpportunityTypeById = async (id: any) => {
  const opportunityTypesRef = collection(db, 'opportunityTypes');
  const docRef = doc(opportunityTypesRef, id);
  const docSnap = await getDoc(docRef);
  const opportunityTypeData: any = docSnap.data();
  if (!opportunityTypeData) {
    return null;
  } else {
    return opportunityTypeData;
  }
};

export const getOrgDetailsById = async (id: any) => {
  const organizationsRef = collection(db, 'organizations');

  const docRef = doc(organizationsRef, id);
  const docSnap = await getDoc(docRef);
  const orgData: any = docSnap.data();
  if (!orgData) {
    return null;
  } else {
    return orgData;
  }
};

export const getUserDetailsById = async (id: any) => {
  const userRef = collection(db, 'users');

  const docRef = doc(userRef, id);
  const docSnap = await getDoc(docRef);
  const orgData: any = docSnap.data();
  if (!orgData) {
    return null;
  } else {
    return orgData;
  }
};

export const sendEmailForApproval = async (
  name?: string,
  description?: string,
  frequency?: string,
  activities?: string,
  volunteerRequirements?: string,
  eventDate?: string,
  location?: string,
  opportunityId?: string,
  organizationId?: string,
  opportunityType?: string,
  createdBy?: string,
) => {
  try {
    const token = jwt.sign({ opportunityId }, TOKEN_SECRET!, {
      expiresIn: '1w',
    });
    const approvalUrl = `${DOMAIN_URL}/api/opportunity-status?token=${token}&status=approved`;
    const rejectUrl = `${DOMAIN_URL}/api/opportunity-status?token=${token}&status=rejected`;
    // convert to local time string
    const time = getFormattedLocalTime(eventDate!);

    // gett org details
    let org = '';
    if (organizationId) {
      const organization = await getOrgDetailsById(organizationId);
      org = organization.name;
    }

    // get opp type
    let oppType = '';
    if (opportunityType) {
      const opportunity = await getOpportunityTypeById(opportunityType);
      oppType = opportunity.name;
    }
    let userEmail = '';
    if (createdBy) {
      const user = await getUserDetailsById(createdBy);
      userEmail = user.email;
    }

    const template = generateApprovalTemplate(
      name,
      description,
      frequency,
      activities,
      time,
      location,
      approvalUrl,
      rejectUrl,
      volunteerRequirements,
      org,
      oppType,
      userEmail,
    );
    const email = await sendEmail(
      ADMIN_EMAIL!,
      'Post Approval Required',
      'Post Approval Required',
      template,
    );
    console.log(email, 'email');
  } catch (error) {
    console.log(error, 'error in sending email for approval');
  }
};
