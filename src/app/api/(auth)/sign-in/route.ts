import { NextRequest } from 'next/server';
import responseHandler from '@/lib/responseHandler';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { schema } from '@/utils/joiSchema';
import { cookies } from 'next/headers';
import { UserDetailsCookies } from '@/interface/user';

/**
 * @swagger
 * /api/sign-in:
 *   post:
 *     summary: Sign in to the application
 *     description: Endpoint to sign in to the application.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password for the user account.
 *     responses:
 *       '200':
 *         description: User with this email is available, please login.
 *       '404':
 *         description: User with this email is not registered.
 *       '500':
 *         description: Error while sign in..
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

    const cookiesNeedsToSet: UserDetailsCookies = {
      email: userData.email,
      username: userData.username,
      id: documentId,
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
