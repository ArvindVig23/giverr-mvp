'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ForgotStep2 from '@/components/forgotPassword/ForgotStep2';
import ForgotStep1 from '@/components/forgotPassword/ForgotStep1';
import { hocAuth } from '@/components/hoc/HOCAuth';

const ForgotPassword: React.FC = () => {
  const searchParams = useSearchParams();
  const step = searchParams.get('step');
  const [email, setEmail] = useState<string>('');
  return (
    <div>
      {' '}
      {step === '2' ? (
        <ForgotStep2 email={email} />
      ) : (
        <ForgotStep1 setEmail={setEmail} />
      )}
    </div>
  );
};

export default hocAuth(ForgotPassword);
