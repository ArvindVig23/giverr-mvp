import { db } from '@/firebase/config';
import { addDoc, collection, getDoc } from 'firebase/firestore';
import { cookies } from 'next/headers';
import responseHandler from '@/lib/responseHandler';
import { sendEmail } from './emailService';
import { UserDetailsCookies } from '@/interface/user';
import { currentUtcDate } from './opportunityServices';
import { compileEmailTemplate } from './handlebars';
import { registerEmailTemplate } from '@/utils/templates/registerEmailTemplate';
import {
  getNotificationSettings,
  getTimeZoneSettingAsPerUser,
} from './commonServices';

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
    // add records in user notification collection
    await addDoc(collection(db, 'userNotificationSettings'), {
      userId,
      allowUpdates: true,
      acceptSubmission: true,
      allowVolunteeringUpdates: true,
      createdAt: currentUtcDate,
      updatedAt: currentUtcDate,
    });

    // // create record in the settings
    await addDoc(collection(db, 'userSettings'), {
      userId,
      autoTimeZone: true,
      selectedTimeZone: '',
      selectedTimeZoneInMilisecond: 0,
      istwentyFourHourTimeFormat: false,
      isDayMonthYearDateFormat: true,
      createdAt: currentUtcDate,
      updatedAt: currentUtcDate,
    });
    if (token) {
      const notificationSetting = await getNotificationSettings(userId);
      const timeZoneSettings = await getTimeZoneSettingAsPerUser(userId);
      // const subscribeCat = await getDoc(createCatSubscribe);
      const userCookies: UserDetailsCookies = {
        email: email,
        username: username,
        id: userId,
        profileUrl: '',
        fullName,
        notificationSetting,
        categorySubscribe: [],
        timeZoneSettings,
      };
      cookies().set('userToken', token);
      cookies().set('userDetails', JSON.stringify(userCookies));
    }

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
