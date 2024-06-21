'use client';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image'; // Import Image from next/image
import logo from '/public/images/logo.svg';
import lightSearch from '/public/images/search-light.svg';
import ProfileDropdown from './ProfileDropdown';
// import Daterange from './Daterange';
import { useCookies } from 'react-cookie';
import SubmitEvents from '../../manageProfile/SubmitEvents';
import { usePathname } from 'next/navigation';

const MobileHeader: React.FC = () => {
  const [cookies] = useCookies();
  const pathName = usePathname();

  return (
    <header className="md:hidden block">
      <nav className=" px-4 md:px-5 py-5 border-b-[0.5px] border-[#E6E3D6]">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen gap-4">
          <div className="flex flex-wrap gap-2 lg:gap-8">
            <Link href="/" className="items-center inline-block">
              <Image className="h-6 md:h-8  w-auto" src={logo} alt="Logo" />
            </Link>
          </div>

          <div className="flex items-center gap-2.5">
            {cookies.userToken ? (
              <>
                <SubmitEvents />
                <ProfileDropdown />
              </>
            ) : (
              <Link
                href={'/sign-in'}
                className="text-base  w-auto h-11 px-4 py-3 flex justify-center items-center bg-[#E60054] rounded-2xl font-medium text-white hover:bg-[#C20038]"
              >
                Join now
              </Link>
            )}
          </div>
          <div className="flex w-full max-w-full absolute left-0 right-0 m-auto search-bar">
            <form className="relative items-center flex border border-[#E6E3D6] bg-[#EDEBE3] rounded-2xl h-11 w-full">
              <input
                placeholder={
                  pathName === '/organizations'
                    ? 'Search Organization'
                    : 'Search location'
                }
                className="placeholder-[#24181B80] h-full w-full rounded-xl px-4 pl-10 focus:outline-0 bg-transparent"
              ></input>
              <Image
                className="absolute top-2.5 left-3 pointer-events-none"
                src={lightSearch}
                alt="search"
              />
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default MobileHeader;
