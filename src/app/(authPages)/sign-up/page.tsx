'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import SignUpStep1 from '../../../../components/signUp/SignUpStep1';
import SignUpStep2 from '../../../../components/signUp/SignUpStep2';
import { ToastData } from '@/interface/notification';
import { userDetail } from '@/interface/user';
import Toast from '../../../../components/notification/ToastNotification';
import { SignUpContext } from '@/utils/context/signUpContext';

const SignUp: React.FC = () => {
  const searchParams = useSearchParams();
  const step = searchParams.get('step');

  const [toastData, setToastData] = useState<ToastData>({
    status: 'success',
    message: '',
    show: false,
  });
  const initialValueOfUser: userDetail = {
    username: '',
    fullName: '',
    email: '',
    location: '',
    isGoogleAuth: false,
    isAppleAuth: false,
    isEmailAuth: false,
    status: true,
  };
  const [userDetails, setUserDetails] =
    useState<userDetail>(initialValueOfUser);

  return (
    <SignUpContext.Provider
      value={{ toastData, setToastData, userDetails, setUserDetails }}
    >
      <div>{step === '2' ? <SignUpStep2 /> : <SignUpStep1 />}</div>
      <Toast {...toastData} />
    </SignUpContext.Provider>
  );
};

export default SignUp;
