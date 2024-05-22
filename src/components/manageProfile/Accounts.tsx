import React from 'react';
import Image from 'next/image'; // Import Image from next/image
import chevronDown from '/public/images/chevron-down.svg';

const OpportunitiesBanner: React.FC = () => {
  return (
    <div className="w-full">
      <h3 className="text-[32px] font-medium mb-5 mt-0 leading-[36px]">
        Account
      </h3>
      <div className="inline-flex w-full rounded-xl bg-[#EDEBE3] p-5 border border-[#E6E3D6] gap-5 mb-5">
        <div className="w-20 h-20 rounded-full bg-[#BAA388] flex items-center justify-center text-3xl text-[#24181B] overflow-hidden">
          A
          {/* <Image
            src={bannerBg}
            alt="profile"
            className="w-full h-full object-cover"
          /> */}
        </div>
        <div className="flex-1 inline-flex gap-2.5 flex-wrap">
          <label className="cursro-pointer text-base h-11 px-4 py-3 inline-flex justify-center items-center border border-[#E60054] bg-inherit rounded-xl font-medium text-[#E60054] hover:text-white hover:bg-[#E60054]">
            Upload image <input className="hidden" type="file"></input>
          </label>
          <p className="text-[#24181B80] text-xs w-full">
            We support PNGs and JPGs under 10MB
          </p>
        </div>
      </div>

      <form className="flex gap-5 w-full flex-col">
        <div className="relative w-full">
          <input
            type="text"
            id="floating_filled"
            className="block rounded-xl px-5 pb-3 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
            placeholder=" "
          />
          <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[18px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
            Full Name
          </label>
        </div>

        <div className="relative w-full">
          <input
            type="email"
            id="floating_filled"
            className="block rounded-xl px-5 pb-3 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
            placeholder=" "
          />
          <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[18px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
            Email
          </label>
        </div>

        <div className="relative w-full">
          <input
            type="text"
            id="floating_filled"
            className="block rounded-xl px-5 pb-3 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
            placeholder=" "
          />
          <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[18px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
            Password
          </label>
        </div>

        <div className="relative w-full">
          <input
            type="text"
            id="floating_filled"
            className="block rounded-xl px-5 pb-3 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
            placeholder=" "
          />
          <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[18px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
            Username
          </label>

          <p className="mt-2 mb-0 text-[#24181B80] text-xs">
            Your Giverr URL: https://giverr.com/anna.smith
          </p>
        </div>

        <div className="relative w-full">
          <select className="block rounded-xl px-5 pb-4 pt-4 w-full text-base text-[#24181B80] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer">
            <option>Select location (optional)</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <Image
            src={chevronDown}
            alt="arrow"
            className="absolute top-[17px] right-4 pointer-events-none"
          />
        </div>
      </form>
    </div>
  );
};

export default OpportunitiesBanner;
