'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import SignUpStep2 from '../../../../components/signUp/SignUpStep2';
import { ToastData } from '@/interface/notification';
import Toast from '../../../../components/notification/ToastNotification';
import CommonStep1 from '../../../../components/commonStep/CommonStep1';

const SignUp: React.FC = () => {
  const searchParams = useSearchParams();
  const step = searchParams.get('step');

  const [toastData, setToastData] = useState<ToastData>({
    status: 'success',
    message: '',
    show: false,
  });

  return (
    <div>
      {step === '2' ? (
        <SignUpStep2 setToastData={setToastData} />
      ) : (
        <CommonStep1 setToastData={setToastData} />
      )}
      <Toast toastData={toastData} setToastData={setToastData} />
    </div>
  );
};

export default SignUp;
