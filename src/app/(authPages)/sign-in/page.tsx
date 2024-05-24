'use client';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import SignInStep2 from '@/components/signIn/SignInStep2';
import CommonStep1 from '@/components/commonStep/CommonStep1';
import { hocAuth } from '../../../components/hoc/HOCAuth';

const SignIn: React.FC = () => {
  const searchParams = useSearchParams();
  const step = searchParams.get('step');
  return <div>{step === '2' ? <SignInStep2 /> : <CommonStep1 />}</div>;
};

export default hocAuth(SignIn);
