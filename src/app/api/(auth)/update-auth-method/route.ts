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
import { schemaWithOptionalFields } from '@/utils/joiSchema';
import { db } from '@/firebase/config';

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: API endpoints for user-related operations
 * /api/update-auth-method:
 *   post:
 *     tags:
 *       - Users
 *     summary: Update user authentication method
 *     description: Endpoint to update the authentication method associated with a user account.
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
 *     responses:
 *       '200':
 *         description: User with this Email already exists.
 *       '404':
 *         description: User does not exist with this email.
 *       '500':
 *         description: Error in checking the updating the user auth method.'
 */

export async function POST(req: NextRequest) {
  try {
    const reqBody: any = await req.json();
    const { email } = reqBody;
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
        const userDoc = existedUserWithEmail.docs[0];
        const userData: any = userDoc.data();
        const userId: any = userDoc.id;
        userData.isEmailAuth = true;

        await updateDoc(doc(db, 'users', userId), {
          isEmailAuth: true,
        });
        const response = responseHandler(
          200,
          true,
          null,
          'User with this Email already exists.',
        );
        return response;
      } else {
        const response = responseHandler(
          404,
          false,
          null,
          'User does not exist with this email.',
        );
        return response;
      }
    }
  } catch (error) {
    console.log(error, 'error');

    const response = responseHandler(
      500,
      false,
      null,
      'Error in checking the updating the user auth method.',
    );
    return response;
  }
}
