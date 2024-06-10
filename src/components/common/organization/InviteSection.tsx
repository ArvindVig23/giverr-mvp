'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import lightSearch from '/public/images/search-light.svg';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { debounce } from '@/services/frontend/commonServices';
import { getMembersList } from '@/services/frontend/memberService';
import cross from '/public/images/cross.svg';
import MemberOption from './MemberOption';
import { useCookies } from 'react-cookie';

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
      <h4 className="w-full text-[#24181B] text-2xl font-medium">Members</h4>
      <div className="relative flex gap-5">
        <div className="relative flex-1">
          <input
            id="searchMember"
            {...register('searchMember')}
            type="text"
            className="w-full h-11 bg-[#EDEBE3] border border-[#E6E3D6] rounded-xl focus:outline-none px-10"
            placeholder="Invite by name or username"
            onFocus={() => setIsDropdownOpen(true)}
          />
          <Image
            className="absolute top-3 left-3 pointer-events-none"
            src={lightSearch}
            alt="search"
          />
          {isDropdownOpen && searchResults.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto">
              {searchResults.map((result, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    addMember(result);
                  }}
                >
                  {result.fullName || result.email}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {memberList.map((member: any, index: number) => (
        <div className="w-full" key={index}>
          <div className="flex p-3 items-center gap-3 border border-[#E6E3D6] rounded-xl">
            <MemberOption member={member} />

            <div className="ml-auto flex gap-2 items-center">
              {cookies.userDetails.id === member.id ? (
                <span className="inline-flex  text-[#24181B80] border border-[#E6E3D6] py-1 px-2 text-sm gap-2.5 rounded-full">
                  Owner
                </span>
              ) : (
                <button
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
        </div>
      ))}
    </div>
  );
};

export default InviteSection;
