'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import lightSearch from '/public/images/search-light.svg';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { debounce, encodeUrl } from '@/services/frontend/commonServices';
import { getMembersList } from '@/services/frontend/memberService';
import cross from '/public/images/cross.svg';
import MemberOption from './MemberOption';
import { useCookies } from 'react-cookie';
import { FIRESTORE_IMG_BASE_START_URL } from '@/constants/constants';
import { getInitialOfEmail } from '@/services/frontend/userService';

const InviteSection = ({ memberList, setMemberList }: any) => {
  const [cookies] = useCookies();
  const { register, watch } = useForm();
  const searchValue = watch('searchMember');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchMembers = async (query: string) => {
    try {
      const response = await getMembersList(query);
      setSearchResults(response);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };
  //eslint-disable-next-line
  const debouncedFetchMembers = useCallback(debounce(fetchMembers, 500), []);

  useEffect(() => {
    debouncedFetchMembers(searchValue || '');
  }, [searchValue, debouncedFetchMembers]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // add member in the list
  const addMember = (member: any) => {
    setMemberList((prev: any) => {
      // Check if the member is already in the list
      if (prev.some((m: any) => m.email === member.email)) {
        return prev;
      }
      return [...prev, member];
    });
    setIsDropdownOpen(false);
  };

  // remove member from the list
  const handleRemoveMember = (index: number) => {
    const members = [...memberList];
    members.splice(index, 1);
    setMemberList(members);
  };
  return (
    <div className="flex w-full flex-col gap-5 mt-5" ref={dropdownRef}>
      <div>
        <h4 className="w-full text-[#24181B] text-2xl font-medium">Members</h4>
        <span>All new members will be invited with no permissions.</span>
      </div>
      <div className="relative flex gap-5">
        <div className="relative flex-1">
          <input
            autoComplete="off"
            id="searchMember"
            {...register('searchMember')}
            type="text"
            className="w-full h-11 bg-[#EDEBE3] border border-[#E6E3D6] rounded-xl focus:outline-none px-10 placeholder-[#24181B80]"
            placeholder="Invite by name or username"
            onFocus={() => setIsDropdownOpen(true)}
          />
          <Image
            className="absolute top-3 left-3 pointer-events-none"
            src={lightSearch}
            alt="search"
          />
          {isDropdownOpen && searchResults.length > 0 && (
            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-xl mt-1  overflow-hidden ">
              <ul className="overflow-auto max-h-60 p-1">
                {searchResults.length > 0 ? (
                  searchResults.map((result: any, index) => (
                    <li
                      key={index}
                      className="px-3 py-2.5 flex gap-2.5 hover:bg-[#F5F3EF] rounded-xl cursor-pointer items-center text-[#24181B] text-base"
                      onClick={() => {
                        addMember(result);
                      }}
                    >
                      <div className="w-6 min-w-6 h-6 overflow-hidden flex items-center justify-center bg-[#B0BA88] rounded-full uppercase text-[10px] font-medium">
                        {result.profileUrl ? (
                          <Image
                            width={20}
                            height={20}
                            src={`${FIRESTORE_IMG_BASE_START_URL}${encodeUrl(result.profileUrl)}`}
                            alt="profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          getInitialOfEmail(result.fullName || result.email)
                        )}
                      </div>
                      {result.fullName || result.email}
                      {result.username ? (
                        <span className="text-[#24181B80] text-base">
                          @{result.username}
                        </span>
                      ) : null}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500 cursor-default">
                    No options
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="w-full">
        <div className="flex items-center  p-1 border border-[#E6E3D6] rounded-xl flex-col">
          {memberList.map((member: any, index: number) => (
            <div
              className="flex w-full  p-3 hover:bg-[#EDEBE3] rounded-xl"
              key={index}
            >
              <MemberOption member={member} />

              <div className="ml-auto flex gap-2 items-center">
                {cookies.userDetails.id === member.id ? (
                  <span className="inline-flex  text-[#24181B80] border border-[#E6E3D6] py-1 px-2 text-sm gap-2.5 rounded-full">
                    Owner
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleRemoveMember(index)}
                    className="group w-[20px] h-[20px] ml-auto  hover:bg-[#24181B] border-0 text-white rounded-full flex items-center justify-center float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  >
                    <Image
                      className="brightness-0 group-hover:brightness-0 group-hover:invert"
                      src={cross}
                      alt="close"
                    />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InviteSection;
