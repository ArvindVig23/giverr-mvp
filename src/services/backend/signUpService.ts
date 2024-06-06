import { db } from '@/firebase/config';
import { addDoc, collection, getDoc } from 'firebase/firestore';
import { cookies } from 'next/headers';
import responseHandler from '@/lib/responseHandler';
import { sendEmail } from './emailService';
import { UserDetailsCookies } from '@/interface/user';
import { currentUtcDate } from './opportunityServices';
import { compileEmailTemplate } from './handlebars';
import { registerEmailTemplate } from '@/utils/templates/registerEmailTemplate';

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
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      location,
      isGoogleAuth,
      isAppleAuth,
      isEmailAuth,
      status,
      profileUrl: '',
      createdAt: currentUtcDate,
      updatedAt: currentUtcDate,
    });
    const getCreatedUser = await getDoc(createuser);
    const userId = getCreatedUser.id;
    if (token) {
      const userCookies: UserDetailsCookies = {
        email: email,
        username: username,
        id: userId,
        profileUrl: '',
        fullName,
      };
      cookies().set('userToken', token);
      cookies().set('userDetails', JSON.stringify(userCookies));
    }
    await addDoc(collection(db, 'userSettings'), {
      userId,
      allowUpdates: false,
      acceptSubmission: false,
      allowVolunteeringUpdates: false,
      autoTimeZone: false,
      selectedTimeZone: '',
      istwentyFourHourTimeFormat: false,
      isDayMonthYearDateFormat: false,
      createdAt: currentUtcDate,
      updatedAt: currentUtcDate,
    });
    // send email after user created
    const template = compileEmailTemplate(registerEmailTemplate, { email });
    await sendEmail(
      email,
      'Sign up sucessfull',
      'You are registered sucessfully',
      template,
    );
    const response = responseHandler(
      200,
      true,
      null,
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
