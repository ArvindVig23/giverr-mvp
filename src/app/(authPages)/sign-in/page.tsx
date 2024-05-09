'use client';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import SignInStep1 from '../../../../components/signIn/SignInStep1';
import SignInStep2 from '../../../../components/signIn/SignInStep2';

const SignIn: React.FC = () => {
  const searchParams = useSearchParams();
  const step = searchParams.get('step');
  return <div>{step === '2' ? <SignInStep2 /> : <SignInStep1 />}</div>;
};

export default SignIn;
