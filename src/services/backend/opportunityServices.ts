import { db } from '@/firebase/config';
import responseHandler from '@/lib/responseHandler';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import moment from 'moment-timezone';

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
      status: false,
      lowercaseName: name.toLowerCase().trim(),
      createdAt: currentUtcDate,
      updatedAt: currentUtcDate,
    });
    const response = responseHandler(
      200,
      true,
      createOpportunity,
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
  console.log(id, 'id');

  const docRef = doc(organizationsRef, id);
  const docSnap = await getDoc(docRef);
  const orgData: any = docSnap.data();
  if (!orgData) {
    return null;
  } else {
    return orgData;
  }
};
