'use client';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import SignInStep2 from '../../../../components/signIn/SignInStep2';
import CommonStep1 from '../../../../components/commonStep/CommonStep1';
import { ToastData } from '@/interface/notification';
import Toast from '../../../../components/notification/ToastNotification';

const SignIn: React.FC = () => {
  const [toastData, setToastData] = useState<ToastData>({
    status: 'success',
    message: '',
    show: false,
  });
  const searchParams = useSearchParams();
  const step = searchParams.get('step');
  return (
    <div>
      {step === '2' ? (
        <SignInStep2 setToastData={setToastData} />
      ) : (
        <CommonStep1 setToastData={setToastData} />
      )}
      <Toast toastData={toastData} setToastData={setToastData} />
    </div>
  );
};

export default SignIn;
