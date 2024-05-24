'use client';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Header from '../common/header/Header';
import Footer from '../common/footer/Footer';
const AppWrapper = ({ children }: any) => {
  const [mounted, setMounted] = useState(false);

  const pathName = usePathname();
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return pathName === '/sign-in' ||
    pathName === '/sign-up' ||
    pathName === '/forgot-password' ||
    pathName === '/api-doc' ||
    pathName === '/reset-password' ? (
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
