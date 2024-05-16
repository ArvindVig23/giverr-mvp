import { db } from '@/firebase/config';
import { addDoc, collection } from 'firebase/firestore';
import { cookies } from 'next/headers';
import responseHandler from '../../lib/responseHandler';
import { sendEmail } from './emailService';

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
      username: username.toLowerCase(),
      fullName,
      email: email.toLowerCase(),
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

    // send email after user created
    await sendEmail(
      email,
      'Sign up sucessfull',
      'You are registered sucessfully',
    );
    const response = responseHandler(
      200,
      false,
      createuser,
      'User created Successfully',
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
