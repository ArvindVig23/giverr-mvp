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

const Header: React.FC = () => {
  const [cookies] = useCookies();
  const pathName = usePathname();

  return (
    <header>
      <nav className=" px-4 md:px-5 py-5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen">
          <div className="flex flex-wrap gap-8">
            <Link href="/" className="items-center inline-block">
              <Image className="h-8 w-auto" src={logo} alt="Logo" />
            </Link>
            <div className="flex flex-wrap gap-2.5 items-center text-base">
              <Link
                href="/"
                className={`px-1  hover:text-[#1E1E 1E] ${pathName === '/' ? 'text-[#1E1E 1E]' : 'text-[#1E1E1E80]'}`}
              >
                Opportunities
              </Link>
              <Link
                href="/organizations"
                className="px-1 text-[#1E1E1E80] hover:text-[#1E1E1E]"
              >
                Organizations
              </Link>
            </div>
          </div>

          <div className="flex w-full max-w-[654px] ">
            <form className="relative items-center flex border border-[#E6E3D6] bg-[#EDEBE3] rounded-xl h-11 w-full">
              <input
                placeholder="Search location"
                className="placeholder-[#24181B80] h-full w-full rounded-xl px-4 pl-10 focus:outline-0 bg-transparent"
              ></input>
              <Image
                className="absolute top-2.5 left-3 pointer-events-none"
                src={lightSearch}
                alt="search"
              />
              {/* <div className="bg-[#D1CFC7] h-6 w-px mr-4"></div>
              <div className="flex-1 daterange">
                <Daterange />
              </div>
              <button className="bg-[#1E1E1E] min-w-9 w-9 h-9 flex items-center justify-center rounded-[10px] mx-1">
                <Image className="h-10" src={search} alt="Search" />
              </button> */}
            </form>
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
                className="text-base  w-auto h-11 px-4 py-3 flex justify-center items-center bg-[#E60054] rounded-xl font-medium text-white hover:bg-[#C20038]"
              >
                Join now
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
