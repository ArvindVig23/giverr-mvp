import { NextRequest } from 'next/server';
import responseHandler from '../../../../../lib/responseHandler';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase/config';

export async function POST(req: NextRequest) {
  try {
    const reqBody: any = await req.json();
    const { username, email } = reqBody;

    const usersRef = collection(db, 'users');
    if (email) {
      const findUserWithEmail = query(
        usersRef,
        where('email', '==', email.toLowerCase()),
      );
      const existedUserWithEmail = await getDocs(findUserWithEmail);
      if (!existedUserWithEmail.empty) {
        const response = responseHandler(
          200,
          false,
          { redirectUrl: '/sign-in?step=2' },
          'User with this Email already exists.',
        );
        return response;
      } else {
        const response = responseHandler(
          200,
          false,
          { redirectUrl: '/sign-up?step=2' },
          'User does not exist with this email. Create new user',
        );
        return response;
      }
    }
    if (username) {
      const findUserWithUsername = query(
        usersRef,
        where('username', '==', username.toLowerCase()),
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
