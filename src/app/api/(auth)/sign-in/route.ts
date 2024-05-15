import { NextRequest } from 'next/server';
import responseHandler from '../../../../../lib/responseHandler';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { schema } from '@/utils/joiSchema';

export async function POST(req: NextRequest) {
  try {
    const reqBody: any = await req.json();
    const { email } = reqBody;
    // validate email
    const { error } = schema.validate({ email }, { abortEarly: false });
    if (error) {
      const errorMessage: string = error.details
        .map((err) => err.message)
        .join('; ');

      const response = responseHandler(403, false, null, errorMessage);
      return response;
    }
    const usersRef = collection(db, 'users');
    // get the user with email
    const userWithEmail = await getDocs(
      query(usersRef, where('email', '==', email.toLowerCase())),
    );
    // if user not existed
    if (userWithEmail.empty) {
      const response = responseHandler(
        404,
        false,
        null,
        'User with this email is not registered.',
      );
      return response;
    }
    const userDoc = userWithEmail.docs[0];
    const userData = userDoc.data();
    if (userData.isEmailAuth) {
      const response = responseHandler(
        200,
        false,
        null,
        'User with email is available',
      );
      return response;
    } else {
      const response = responseHandler(
        409,
        false,
        null,
        'User registered with Google Sign up method.',
      );
      return response;
    }
  } catch (error) {
    const response = responseHandler(500, false, null, 'Error while sign in.');
    return response;
  }
}
