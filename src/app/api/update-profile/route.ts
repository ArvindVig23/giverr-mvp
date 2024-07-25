import { db } from '@/firebase/config';
import responseHandler from '@/lib/responseHandler';
import { getUserDetailsCookie } from '@/services/backend/commonServices';
import { currentUtcDate } from '@/services/backend/opportunityServices';
import { fullNameSchema } from '@/utils/joiSchema';
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function PUT(req: NextRequest) {
  try {
    const reqbody = await req.json();
    const { profileUrl, fullName, username } = reqbody;
    const { error } = fullNameSchema.validate(
      { fullName },
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

    if (username) {
      const usersRef = collection(db, 'users');
      const userWithUsername = await getDocs(
        query(usersRef, where('username', '==', username.toLowerCase().trim())),
      );
      const filteredDocs = userWithUsername.docs.filter((doc) => doc.id !== id);

      if (filteredDocs.length > 0) {
        const response = responseHandler(
          409,
          false,
          null,
          'Username is not available, please try again.',
        );
        return response;
      }
    }

    await updateDoc(doc(db, 'users', id), {
      profileUrl: profileUrl ? profileUrl : '',
      fullName,
      username,
      updatedAt: currentUtcDate,
    });

    // update userDetails cookie
    const updatedCookies = {
      ...convertString,
      profileUrl,
      fullName,
      username,
    };
    cookies().set({
      name: 'userDetails',
      value: JSON.stringify(updatedCookies),
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
