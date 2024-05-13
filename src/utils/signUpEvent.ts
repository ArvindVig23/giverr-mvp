import { auth } from '@/firebase/config';
import { ToastData } from '@/interface/notification';
import { userDetail } from '@/interface/user';
import axios from 'axios';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';

export const handleGoogleSignUp = async (
  userDetails: userDetail,
  setUserDetails: React.Dispatch<React.SetStateAction<userDetail>>,
  setToastData: React.Dispatch<React.SetStateAction<ToastData>>,
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
    const response = await axios.post('/api/sign-up', formData);
    console.log(response, 'response');
    setUserDetails({ ...userDetails, email: email });
    setToastData({
      status: 'success',
      message: 'Login Successfull ',
      show: true,
    });
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
