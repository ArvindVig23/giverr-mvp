import { db } from '@/firebase/config';
import responseHandler from '@/lib/responseHandler';
import { getUserDetailsCookie } from '@/services/backend/commonServices';
import { currentUtcDate } from '@/services/backend/opportunityServices';
import {
  checkDuplicateWithEmail,
  checkDuplicateWithUsername,
} from '@/services/backend/profileService';
import { schema } from '@/utils/joiSchema';
import { doc, updateDoc } from 'firebase/firestore';
import { NextRequest } from 'next/server';

export async function PUT(req: NextRequest) {
  try {
    const reqbody = await req.json();
    const { email, profileUrl, username, fullName } = reqbody;

    const { error } = schema.validate(
      { email, username, fullName },
      { abortEarly: false },
    );
    if (error) {
      const errorMessage: string = error.details
        .map((err) => err.message)
        .join('; ');

      const response = responseHandler(403, false, null, errorMessage);
      return response;
    }
    const userDetails = getUserDetailsCookie();
    const convertString = JSON.parse(userDetails.value);
    const { id } = convertString;
    // check for the duplicate user email
    const duplicateUserWithEmail = await checkDuplicateWithEmail(id, email);
    if (duplicateUserWithEmail) {
      const response = responseHandler(
        409,
        false,
        null,
        'User with this email already exists',
      );
      return response;
    }

    // check for duplicate user with username
    const duplicateUserWithUsername = await checkDuplicateWithUsername(
      id,
      username,
    );
    if (duplicateUserWithUsername) {
      const response = responseHandler(
        409,
        false,
        null,
        'User with this username already exists',
      );
      return response;
    }

    await updateDoc(doc(db, 'users', id), {
      email,
      profileUrl,
      username,
      fullName,
      updatedAt: currentUtcDate,
    });
    const response = responseHandler(
      200,
      true,
      null,
      'User updated successfully',
    );
    return response;
  } catch (error) {
    console.log(error, 'Error in sign up');
    const response = responseHandler(
      500,
      false,
      null,
      'Error in updating details.',
    );
    return response;
  }
}
