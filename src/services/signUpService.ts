import { db } from '@/firebase/config';
import { addDoc, collection } from 'firebase/firestore';
import { cookies } from 'next/headers';
import responseHandler from '../../lib/responseHandler';

export const createUserService = async (userData: any, token?: any) => {
  try {
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
    if (token) {
      cookies().set('userToken', token);
    }
    const response = responseHandler(
      200,
      false,
      createuser,
      'User created & Sign in Successfully',
    );
    return response;
  } catch (error) {
    const response = responseHandler(
      500,
      false,
      null,
      'Error in creating new user.',
    );
    return response;
  }
};
