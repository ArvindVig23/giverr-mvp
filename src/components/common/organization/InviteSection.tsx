'use client';
import React, { useState } from 'react';
import lightSearch from '/public/images/search-light.svg';
import Image from 'next/image';
import { useCookies } from 'react-cookie';
import MemberOption from './MemberOption';

const InviteSection = () => {
  const [cookies]: any = useCookies();
  const defaultOwner = {
    id: cookies?.userDetails?.id,
    email: cookies?.userDetails?.email,
    username: cookies?.userDetails?.username,
    fullName: cookies?.userDetails?.fullName,
  }; //eslint-disable-next-line
  const [memberList, setMemberList] = useState<any[]>([defaultOwner]);
  return (
    <div className="flex w-full flex-col gap-5 mt-5">
      <h4 className="w-full text-[#24181B] text-2xl font-medium">Members</h4>
      <div className="flex gap-5">
        <div className="relative flex-1">
          <input
            type="text"
            className="w-full h-11 bg-[#EDEBE3] border border-[#E6E3D6] rounded-xl focus:outline-none px-10"
            placeholder="Search Members"
          ></input>
          <Image
            className="absolute top-3 left-3 pointer-events-none"
            src={lightSearch}
            alt="search"
          />
        </div>
      </div>
      {memberList.map((member, index) => (
        <MemberOption member={member} key={index} />
      ))}

      <div className="flex py-3 items-center gap-3 border-b border-[#E6E3D6]">
        <div className="flex gap-2.5 items-center">
          <div className="w-8 h-8 flex items-center justify-center font-medium overflow-hidden text-xs rounded-full bg-[#D3D496] text-[#24181B]">
            T
          </div>

          <div className="text-base">Terry Gouse Bator</div>
          <span className="text-[#24181B80]">@terry.bator</span>
        </div>

        <div className="ml-auto flex gap-2 items-center">
          <span className="inline-flex  text-[#24181B80] border border-[#E6E3D6] py-1 px-2 text-sm gap-2.5 rounded-full">
            Owner
          </span>
        </div>
      </div>

      <div className="flex py-3 items-center gap-3 border-b border-[#E6E3D6]">
        <div className="flex gap-2.5 items-center">
          <div className="w-8 h-8 flex items-center justify-center font-medium overflow-hidden text-xs rounded-full bg-[#D3D496] text-[#24181B]">
            T
          </div>

          <div className="text-base">Terry Gouse Bator</div>
          <span className="text-[#24181B80]">@terry.bator</span>
        </div>

        <div className="ml-auto flex gap-2 items-center">
          <span className="inline-flex  text-[#24181B80] border border-[#E6E3D6] py-1 px-2 text-sm gap-2.5 rounded-full">
            Owner
          </span>
        </div>
      </div>

      <div className="flex py-3 items-center gap-3 border-b border-[#E6E3D6]">
        <div className="flex gap-2.5 items-center opacity-50">
          <div className="w-8 h-8 flex items-center justify-center font-medium overflow-hidden text-xs rounded-full bg-[#D3D496] text-[#24181B]">
            T
          </div>

          <div className="text-base">Terry Gouse Bator</div>
          <span className="text-[#24181B80]">@terry.bator</span>
        </div>

        <div className="ml-auto flex gap-2 items-center">
          <span className="inline-flex  text-[#02088B] border border-[#D5D7FD] bg-[#D5D7FD] py-1 px-2 text-sm gap-2.5 rounded-full">
            Invite pending
          </span>
        </div>
      </div>
    </div>
  );
};

export default InviteSection;
