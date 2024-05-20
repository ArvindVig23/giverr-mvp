'use client';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image'; // Import Image from next/image
import logo from '../../../public/images/logo.svg';
import search from '../../../public/images/search.svg';
import ProfileDropdown from './ProfileDropdown';
import Daterange from './Daterange';
import { useCookies } from 'react-cookie';
import SubmitEvents from '../../manageProfile/SubmitEvents';

const Header: React.FC = () => {
  const [cookies] = useCookies();
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
                href="#"
                className="px-1 text-[#1E1E1E80] hover:text-[#1E1E1E]"
              >
                Opportunities
              </Link>
              <Link
                href="#"
                className="px-1 text-[#1E1E1E80] hover:text-[#1E1E1E]"
              >
                Organizations
              </Link>
            </div>
          </div>

          <div className="flex w-full max-w-[654px] ">
            <form className="relative items-center flex border border-[#D1CFC7] rounded-xl h-11 w-full">
              <input
                placeholder="Search location"
                className="placeholder-[#1E1E1E80] h-full rounded-xl px-4 focus:outline-0 bg-transparent"
              ></input>
              <div className="bg-[#D1CFC7] h-6 w-px mr-4"></div>
              <div className="flex-1 daterange">
                <Daterange />
              </div>
              <button className="bg-[#1E1E1E] min-w-9 w-9 h-9 flex items-center justify-center rounded-[10px] mx-1">
                <Image className="h-10" src={search} alt="Search" />
              </button>
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
