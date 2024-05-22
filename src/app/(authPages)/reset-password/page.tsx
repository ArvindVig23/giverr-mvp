'use client';
import React from 'react';
import ResetPasswordForm from '@/components/resetPassword/ResetPasswordForm';
import { withAdminAuthorization } from '@/components/hoc/HOCAuth';

const ResetPassword: React.FC = () => {
  return <div>{<ResetPasswordForm />}</div>;
};
export default withAdminAuthorization(ResetPassword);
