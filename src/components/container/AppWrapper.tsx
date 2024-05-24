'use client';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Header from '../common/header/Header';
import Footer from '../common/footer/Footer';
import { useSelector } from 'react-redux';
import Spinner from '../common/loader/Spinner';
const AppWrapper = ({ children }: any) => {
  const [mounted, setMounted] = useState(false);

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
      {pathName === '/sign-in' ||
      pathName === '/sign-up' ||
      pathName === '/forgot-password' ||
      pathName === '/reset-password' ? (
        <>{children}</>
      ) : (
        <>
          <Header />
          {children}
          <Footer />
        </>
      )}
      {loader && <Spinner />}
    </>
  );
};

export default AppWrapper;
