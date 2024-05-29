'use client';
import React from 'react';
import ActivityTabs from '@/components/allActivity/ActivityTabs';
import { hocAuth } from '@/components/hoc/HOCAuth';

const Activity: React.FC = () => {
  return <ActivityTabs />;
};
export default hocAuth(Activity);
