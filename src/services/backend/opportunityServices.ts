import { db } from '@/firebase/config';
import responseHandler from '../../../lib/responseHandler';
import { addDoc, collection } from 'firebase/firestore';

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
      opportuntyType,
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
      opportuntyType,
      eventDate,
      createdBy,
      imageLink,
      location,
      lowercaseName: name.toLowerCase().trim(),
      createdAt: new Date(),
      updatedAt: new Date(),
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
