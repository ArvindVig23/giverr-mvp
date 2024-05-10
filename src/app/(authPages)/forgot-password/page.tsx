'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import ForgotStep2 from '../../../../components/forgotPassword/ForgotStep2';
import ForgotStep1 from '../../../../components/forgotPassword/ForgotStep1';

const ForgotPassword: React.FC = () => {
  const searchParams = useSearchParams();
  const step = searchParams.get('step');
  return <div> {step === '2' ? <ForgotStep2 /> : <ForgotStep1 />}</div>;
};

export default ForgotPassword;
