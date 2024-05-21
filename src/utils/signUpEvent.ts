import { auth } from '@/firebase/config';
import { userDetail } from '@/interface/user';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';
import { resetGlobalState } from './initialStates/userInitialStates';
import { updateUserDetails } from '@/app/redux/slices/userDetailSlice';
import callApi from '@/services/frontend/callApiService';
import { sweetAlertToast } from '@/services/frontend/toastServices';

export const handleGoogleSignUp = async (
  userDetails: userDetail,
  router: any,
  dispatch: any,
) => {
  const googleProvider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const { user } = result;
    // const uid = user.uid;
    const { email } = user;
    const token = await user.getIdToken();
    const userData = {
      ...userDetails,
      email,
      isGoogleAuth: true,
    };

    const formData = new FormData();
    formData.append('userDetails', JSON.stringify(userData));
    formData.append('token', token);
    await callApi('sign-up', 'post', formData);
    sweetAlertToast('success', 'Login Successfull');
    router.push('/');
    dispatch(updateUserDetails(resetGlobalState));
  } catch (error: any) {
    console.log('Error in sign up with google', error);
    const { message } = error.data;
    sweetAlertToast('error', message);
  }
};

export const tooglePassword = (
  showPassword: boolean,
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setShowPassword(!showPassword);
};
