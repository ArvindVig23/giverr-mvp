import { auth } from '@/firebase/config';
import { ToastData } from '@/interface/notification';
import { userDetail } from '@/interface/user';
import axios from 'axios';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';
import { resetGlobalState } from './initialStates/userInitialStates';
import { updateUserDetails } from '@/app/redux/slices/userDetailSlice';

export const handleGoogleSignUp = async (
  userDetails: userDetail,
  setToastData: React.Dispatch<React.SetStateAction<ToastData>>,
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
    await axios.post('/api/sign-up', formData);
    setToastData({
      status: 'success',
      message: 'Login Successfull',
      show: true,
    });
    setTimeout(() => {
      router.push('/');
    }, 2000);
    dispatch(updateUserDetails(resetGlobalState));
  } catch (error: any) {
    console.log('Error in sign up with google', error);
    const { message } = error.response.data;
    setToastData({
      status: 'error',
      message,
      show: true,
    });
  }
};

export const tooglePassword = (
  showPassword: boolean,
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setShowPassword(!showPassword);
};
