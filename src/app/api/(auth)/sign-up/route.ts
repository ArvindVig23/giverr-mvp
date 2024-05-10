import { NextRequest } from 'next/server';
import responseHandler from '../../../../../lib/responseHandler';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const userDetailsString = data.get('userDetails');
    let userData = null;
    if (typeof userDetailsString === 'string') {
      userData = JSON.parse(userDetailsString);
    }
    const token: any = data.get('token');

    const {
      username,
      fullName,
      email,
      location,
      isGoogleAuth,
      isAppleAuth,
      isEmailAuth,
      status,
    } = userData;

    if (isGoogleAuth) {
      const usersRef = collection(db, 'users');
      const findUserQuery = query(usersRef, where('email', '==', email));
      const existedUser = await getDocs(findUserQuery);
      if (existedUser.empty) {
        const createuser = await addDoc(collection(db, 'users'), {
          username,
          fullName,
          email,
          location,
          isGoogleAuth,
          isAppleAuth,
          isEmailAuth,
          status,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        cookies().set('userToken', token);
        const response = responseHandler(
          200,
          false,
          createuser,
          'User created & Sign in Successfully',
        );
        return response;
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
