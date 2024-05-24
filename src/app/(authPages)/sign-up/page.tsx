'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import SignUpStep2 from '@/components/signUp/SignUpStep2';
import CommonStep1 from '@/components/commonStep/CommonStep1';
import { hocAuth } from '@/components/hoc/HOCAuth';

const SignUp: React.FC = () => {
  const searchParams = useSearchParams();
  const step = searchParams.get('step');

  return <div>{step === '2' ? <SignUpStep2 /> : <CommonStep1 />}</div>;
};

export default hocAuth(SignUp);
