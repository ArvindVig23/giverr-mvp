'use client';
import React from 'react';
import ManageProfile from '../../components/manageProfile/ManageProfile';
import { hocAuth } from '@/components/hoc/HOCAuth';

const Profile: React.FC = () => {
  return <ManageProfile />;
};
export default hocAuth(Profile);
