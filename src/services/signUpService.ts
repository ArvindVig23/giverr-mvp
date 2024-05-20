import { db } from '@/firebase/config';
import { addDoc, collection, getDoc } from 'firebase/firestore';
import { cookies } from 'next/headers';
import responseHandler from '../../lib/responseHandler';
import { sendEmail } from './emailService';
import { UserDetailsCookies } from '@/interface/user';

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
      username: username.toLowerCase().trim(),
      fullName,
      email: email.toLowerCase().trim(),
      location,
      isGoogleAuth,
      isAppleAuth,
      isEmailAuth,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    if (token) {
      const getCreatedUser = await getDoc(createuser);
      const userId = getCreatedUser.id;
      const userCookies: UserDetailsCookies = {
        email: email,
        username: username,
        id: userId,
      };
      cookies().set('userToken', token);
      cookies().set('userDetails', JSON.stringify(userCookies));
    }

    // send email after user created
    await sendEmail(
      email,
      'Sign up sucessfull',
      'You are registered sucessfully',
    );
    const response = responseHandler(
      200,
      true,
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
