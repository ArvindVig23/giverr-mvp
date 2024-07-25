import { NextRequest } from 'next/server';
import responseHandler from '@/lib/responseHandler';
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import { cookies } from 'next/headers';
import { createUserService } from '@/services/backend/signUpService';
import { schema } from '@/utils/joiSchema';
import { UserDetailsCookies } from '@/interface/user';
import {
  getNotificationSettings,
  getSubscribeCategorySettings,
  getTimeZoneSettingAsPerUser,
} from '@/services/backend/commonServices';

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: API endpoints for user-related operations
 * /api/sign-up:
 *   post:
 *      tags:
 *        - Users
 *      summary: Create a new user
 *      description: Endpoint to create a new user.
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                userDetails:
 *                  type: object
 *                  properties:
 *                    email:
 *                      type: string
 *                      format: email
 *                      description: The email address of the user.
 *                    username:
 *                      type: string
 *                      description: The username of the user.
 *                    password:
 *                      type: string
 *                      format: password
 *                      description: The password for the user account.
 *                    fullName:
 *                      type: string
 *                      description: The full name of the user.
 *                    isEmailAuth:
 *                       type: boolean
 *                       description: Indicates whether email authentication sign-up is enabled for users.
 *                    location:
 *                       type: string
 *                       description: Specifies the location information for the user.
 *                    isGoogleAuth:
 *                       type: boolean
 *                       description: Indicates whether Google authentication sign-up is enabled for users.
 *                    isAppleAuth:
 *                       type: boolean
 *                       description: Indicates whether Apple authentication sign-up is enabled for users.
 *                    status:
 *                       type: boolean
 *                       description: Represents the current status of the authentication settings.
 *      responses:
 *        '200':
 *          description: User created Successfully.
 *        '403':
 *          description: User with this email already exists.
 *        '500':
 *          description: Error while sign up.
 */

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const userDetailsString = data.get('userDetails');
    let userData = null;
    if (typeof userDetailsString === 'string') {
      userData = JSON.parse(userDetailsString);
    }
    const token: any = data.get('token');
    const { email, isGoogleAuth, fullName, isEmailAuth, isAppleAuth } =
      userData;
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
    // sign up with google auth
    if (isGoogleAuth) {
      const usersRef = collection(db, 'users');
      const findUserQuery = query(
        usersRef,
        where('email', '==', email.trim().toLowerCase()),
      );
      const existedUser = await getDocs(findUserQuery);
      if (existedUser.empty) {
        await createUserService(userData, token);
      }
      const userDoc = existedUser.docs[0]; // Get the first user document
      if (userDoc) {
        const userDocData = userDoc.data();
        const userId = userDoc.id;
        await updateDoc(doc(db, 'users', userId), {
          isEmailAuth: false,
          isGoogleAuth: true,
          isAppleAuth: false,
        });
        //  get the notification settings details with user id
        const notificationSetting = await getNotificationSettings(userId);

        // get the category subscribe details on the basis of user ID
        const categorySubscribe = await getSubscribeCategorySettings(userId);
        // get user time zone setting
        const timeZoneSettings = await getTimeZoneSettingAsPerUser(userId);

        const userCookies: UserDetailsCookies = {
          email: userDocData.email,
          username: userDocData.username,
          id: userDoc.id,
          notificationSetting,
          categorySubscribe,
          timeZoneSettings,
          loginAsOrg: false,
          locationName: userDocData.locationName,
          lat: userDocData.lat,
          long: userDocData.long,
        };
        cookies().set('userDetails', JSON.stringify(userCookies));
        cookies().set('userToken', token);
      }
      const response = responseHandler(
        200,
        true,
        null,
        'User with this email already exists. Sign in Successfully',
      );
      return response;
    }
    // Sign up with email
    if (isEmailAuth) {
      // check if user exist with the same email
      const usersRef = collection(db, 'users');
      const findUserQuery = query(
        usersRef,
        where('email', '==', email.trim().toLowerCase()),
      );
      const existedUser = await getDocs(findUserQuery);
      if (!existedUser.empty) {
        const response = responseHandler(
          403,
          false,
          null,
          'User with this email already exists.',
        );
        return response;
      }
      const user = await createUserService(userData, null);
      return user;
    }

    // sign up with apple
    if (isAppleAuth) {
      const usersRef = collection(db, 'users');
      const findUserQuery = query(
        usersRef,
        where('email', '==', email.trim().toLowerCase()),
      );
      const existedUser = await getDocs(findUserQuery);
      if (existedUser.empty) {
        await createUserService(userData, token);
      }
      const userDoc = existedUser.docs[0]; // Get the first user document
      if (userDoc) {
        const userDocData = userDoc.data();
        const userId = userDoc.id;
        await updateDoc(doc(db, 'users', userId), {
          isEmailAuth: false,
          isGoogleAuth: false,
          isAppleAuth: true,
        });
        //  get the notification settings details with user id
        const notificationSetting = await getNotificationSettings(userId);

        // get the category subscribe details on the basis of user ID
        const categorySubscribe = await getSubscribeCategorySettings(userId);
        // get user time zone setting
        const timeZoneSettings = await getTimeZoneSettingAsPerUser(userId);

        const userCookies: UserDetailsCookies = {
          email: userDocData.email,
          username: userDocData.username,
          id: userDoc.id,
          notificationSetting,
          categorySubscribe,
          timeZoneSettings,
          loginAsOrg: false,
          locationName: userDocData.locationName,
          lat: userDocData.lat,
          long: userDocData.long,
        };
        cookies().set('userDetails', JSON.stringify(userCookies));
        cookies().set('userToken', token);
      }
      const response = responseHandler(
        200,
        true,
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
