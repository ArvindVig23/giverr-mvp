import { db } from '@/firebase/config';
import responseHandler from '@/lib/responseHandler';
import { addDoc, collection, getDoc } from 'firebase/firestore';
import { currentUtcDate } from './opportunityServices';

export const createOrganization = async (
  id: string,
  name: string,
  username: string,
  avatarLink: string,
  website: string,
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
    //  add one enter in the organizationMembers with the role owner
    await addDoc(collection(db, 'organizationMembers'), {
      userId: id,
      organizationId: createdOrgDoc.id,
      status: true, // wil might chnage to false as default value
      role: 'OWNER',
      createdAt: currentUtcDate,
      updatedAt: currentUtcDate,
    });
    const response = responseHandler(
      200,
      true,
      null,
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
