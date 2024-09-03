'use client';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Header from '../common/header/Header';
import Footer from '../common/footer/Footer';
import { useSelector } from 'react-redux';
import Spinner from '../common/loader/Spinner';
import MobileHeader from '../common/header/MobileHeader';
const AppWrapper = ({ children }: any) => {
  const [mounted, setMounted] = useState(false);
  const excludedPaths = [
    '/sign-in',
    '/sign-up',
    '/forgot-password',
    '/api-doc',
    '/reset-password',
    '/opportunity-status',
  ];

  const pathName = usePathname();
  const loader = useSelector((state: any) => state.loaderReducer);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <>
      {excludedPaths.includes(pathName) ? (
        <>{children}</>
      ) : (
        <>
          <Header />
          <MobileHeader />
          {children}
          <Footer />
        </>
      )}
      {loader && <Spinner />}
    </>
  );
};

export default AppWrapper;
