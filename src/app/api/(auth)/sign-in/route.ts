import { NextRequest } from 'next/server';
import responseHandler from '@/lib/responseHandler';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { schema } from '@/utils/joiSchema';
import { cookies } from 'next/headers';
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
 * /api/sign-in:
 *   post:
 *      tags:
 *        - Users
 *      summary: Sign in to the application
 *      description: Endpoint to sign in to the application.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  format: email
 *                  description: The email address of the user.
 *                password:
 *                  type: string
 *                  format: password
 *                  description: The password for the user account.
 *      responses:
 *        '200':
 *          description: User with this email is available, please login.
 *        '404':
 *          description: User with this email is not registered.
 *        '500':
 *          description: Error while sign in.
 */

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
      query(usersRef, where('email', '==', email.toLowerCase().trim())),
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
    const documentId = userDoc.id;

    //  get the notification settings details with user id
    const notificationSetting = await getNotificationSettings(documentId);

    // get the category subscribe details on the basis of user ID
    const categorySubscribe = await getSubscribeCategorySettings(documentId);
    // get user time zone setting
    const timeZoneSettings = await getTimeZoneSettingAsPerUser(documentId);
    const cookiesNeedsToSet: UserDetailsCookies = {
      email: userData.email,
      username: userData.username,
      id: documentId,
      profileUrl: userData.profileUrl || '',
      fullName: userData.fullName,
      notificationSetting,
      categorySubscribe,
      timeZoneSettings,
    };
    cookies().set({
      name: 'userDetails',
      value: JSON.stringify(cookiesNeedsToSet),
    });
    const response = responseHandler(
      200,
      true,
      null,
      'User with this email is available, please login',
    );
    return response;
  } catch (error) {
    const response = responseHandler(500, false, null, 'Error while sign in.');
    return response;
  }
}
