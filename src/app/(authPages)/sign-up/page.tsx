'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import SignUpStep1 from '../../../../components/signUp/SignUpStep1';
import SignUpStep2 from '../../../../components/signUp/SignUpStep2';

const SignUp: React.FC = () => {
  const searchParams = useSearchParams();
  const step = searchParams.get('step');

  return <div>{step === '2' ? <SignUpStep2 /> : <SignUpStep1 />}</div>;
};

export default SignUp;
