import { NextRequest } from 'next/server';
import responseHandler from '../../../../../lib/responseHandler';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { cookies } from 'next/headers';
import { createUserService } from '@/services/signUpService';
import { schema } from '@/utils/joiSchema';

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const userDetailsString = data.get('userDetails');
    let userData = null;
    if (typeof userDetailsString === 'string') {
      userData = JSON.parse(userDetailsString);
    }
    const token: any = data.get('token');

    const { email, isGoogleAuth, fullName } = userData;
    // validation check for email & fullName
    const { error } = schema.validate(
      { email, fullName },
      { abortEarly: false },
    );
    if (error) {
      const errorMessage: string = error.details
        .map((err) => err.message)
        .join('; ');

      const response = responseHandler(403, false, null, errorMessage);
      return response;
    }
    if (isGoogleAuth) {
      const usersRef = collection(db, 'users');
      const findUserQuery = query(usersRef, where('email', '==', email));
      const existedUser = await getDocs(findUserQuery);
      if (existedUser.empty) {
        await createUserService(userData, token);
      }

      cookies().set('userToken', token);
      const response = responseHandler(
        200,
        false,
        null,
        'User with this email already exists. Sign in Successfully',
      );
      return response;
    }
  } catch (error) {
    console.log(error, 'Error in sign up');
    const response = responseHandler(500, false, null, 'Error while sign up.');
    return response;
  }
}
