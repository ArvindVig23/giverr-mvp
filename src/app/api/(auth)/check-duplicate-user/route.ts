import { NextRequest } from 'next/server';
import responseHandler from '@/lib/responseHandler';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { schemaWithOptionalFields } from '@/utils/joiSchema';

/**
 * @swagger
 * /api/check-duplicate-user:
 *   post:
 *     summary: Check if a user already exists
 *     description: Endpoint to check if a user with the provided username or email already exists.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username to check.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address to check.
 *     responses:
 *       '200':
 *         description: User with this Email already exists.
 *       '403':
 *         description: User with this username already exists.
 *       '500':
 *         description: Internal server error || Error in checking the duplicate username..
 */

export async function POST(req: NextRequest) {
  try {
    const reqBody: any = await req.json();
    const { username, email } = reqBody;
    //  add validations

    const usersRef = collection(db, 'users');
    if (email) {
      const { error } = schemaWithOptionalFields.validate(
        { email },
        { abortEarly: false },
      );
      if (error) {
        const errorMessage: string = error.details
          .map((err) => err.message)
          .join('; ');

        const response = responseHandler(403, false, null, errorMessage);
        return response;
      }
      const findUserWithEmail = query(
        usersRef,
        where('email', '==', email.toLowerCase().trim()),
      );
      const existedUserWithEmail = await getDocs(findUserWithEmail);
      if (!existedUserWithEmail.empty) {
        const response = responseHandler(
          200,
          true,
          { redirectUrl: '/sign-in?step=2' },
          'User with this Email already exists.',
        );
        return response;
      } else {
        const response = responseHandler(
          200,
          true,
          { redirectUrl: '/sign-up?step=2' },
          'User does not exist with this email. Create new user',
        );
        return response;
      }
    }
    if (username) {
      const { error } = schemaWithOptionalFields.validate(
        { username },
        { abortEarly: false },
      );
      if (error) {
        const errorMessage: string = error.details
          .map((err) => err.message)
          .join('; ');

        const response = responseHandler(403, false, null, errorMessage);
        return response;
      }
      const findUserWithUsername = query(
        usersRef,
        where('username', '==', username.toLowerCase().trim()),
      );
      const existedUserWithUsername = await getDocs(findUserWithUsername);
      if (!existedUserWithUsername.empty) {
        const response = responseHandler(
          403,
          false,
          null,
          'User with this username already exists.',
        );
        return response;
      }
      const response = responseHandler(
        200,
        true,
        null,
        'User with this username does not exists.',
      );
      return response;
    }
  } catch (error: any) {
    console.log(error, 'Error');

    const response = responseHandler(
      500,
      false,
      null,
      'Error in checking the duplicate username.',
    );
    return response;
  }
}
