'use client';
import { usePathname } from 'next/navigation';
import React from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
const AppWrapper = ({ children }: any) => {
  const pathName = usePathname();
  return pathName === '/sign-in' ||
    pathName === '/sign-up' ||
    pathName === '/forgot-password' ||
    pathName === 'reset-password' ? (
    <>{children}</>
  ) : (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default AppWrapper;
