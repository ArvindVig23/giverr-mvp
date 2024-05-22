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

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const userDetailsString = data.get('userDetails');
    let userData = null;
    if (typeof userDetailsString === 'string') {
      userData = JSON.parse(userDetailsString);
    }
    const token: any = data.get('token');
    const { email, isGoogleAuth, fullName, isEmailAuth } = userData;
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
        const userCookies: UserDetailsCookies = {
          email: userDocData.email,
          username: userDocData.username,
          id: userDoc.id,
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
  } catch (error) {
    console.log(error, 'Error in sign up');
    const response = responseHandler(500, false, null, 'Error while sign up.');
    return response;
  }
}
