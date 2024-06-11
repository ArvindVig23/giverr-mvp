'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import lightSearch from '/public/images/search-light.svg';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { debounce } from '@/services/frontend/commonServices';
import { getMembersList, sendInvite } from '@/services/frontend/memberService';
import cross from '/public/images/cross.svg';
import MemberOption from './MemberOption';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { sweetAlertToast } from '@/services/frontend/toastServices';
import { setLoader } from '@/app/redux/slices/loaderSlice';
import { updateOrgDetails } from '@/app/redux/slices/userOrgDetails';

const ModalInvite = ({ setShowModal }: any) => {
  const [memberList, setMemberList] = useState<any[]>([]);
  const userOrgDetails = useSelector((state: any) => state.userOrgReducer);
  const [cookies] = useCookies();
  const { register, watch } = useForm();
  const searchValue = watch('searchMember');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchMembers = async (query: string) => {
    try {
      const response = await getMembersList(query);
      const memberIds = userOrgDetails.members.map(
        (member: any) => member.userId,
      );

      // Filter the response to exclude members whose id is in memberIds
      const filteredResponse = response.filter(
        (member: any) => !memberIds.includes(member.id),
      );

      setSearchResults(filteredResponse);
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

  const dispatch = useDispatch();
  const handleSendInvite = async () => {
    if (memberList.length > 0) {
      dispatch(setLoader(true));
      const membersData: any = {
        orgId: userOrgDetails.id,
      };
      const filteredIds = memberList.map((member) => member.id);
      membersData.members = filteredIds;
      try {
        const response = await sendInvite(membersData);
        const { message, data } = response;
        sweetAlertToast('success', message);
        setShowModal(false);
        const updatedOrgData = { ...userOrgDetails, members: data.members };
        dispatch(updateOrgDetails(updatedOrgData));
        dispatch(setLoader(false));
      } catch (error: any) {
        dispatch(setLoader(false));
        const { message } = error;
        sweetAlertToast('error', message);
      }
    }
  };
  return (
    <div className="flex w- flex-col p-2 gap-5" ref={dropdownRef}>
      <div className="relative flex gap-5">
        <div className="relative flex-1">
          <input
            id="searchMember"
            {...register('searchMember')}
            type="text"
            className="w-full h-11 bg-[#EDEBE3] border border-[#E6E3D6] rounded-xl focus:outline-none px-10"
            placeholder="Search Members"
            onFocus={() => setIsDropdownOpen(true)}
          />
          <Image
            className="absolute top-3 left-3 pointer-events-none"
            src={lightSearch}
            alt="search"
          />
          {isDropdownOpen && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto">
              {searchResults.length > 0 ? (
                searchResults.map((result: any, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      addMember(result);
                    }}
                  >
                    {result.fullName || result.email}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500 cursor-default">
                  No options
                </li>
              )}
            </ul>
          )}
          <span className="text-gray-400">
            All new members will be invited with no permissions.
          </span>
        </div>
      </div>
      {memberList.map((member: any, index: number) => (
        <div className="w-full" key={index}>
          <div className="flex p-3 items-center gap-3 border border-[#E6E3D6] rounded-xl hover:cursor-pointer hover:bg-[#EDEBE3]">
            {<MemberOption member={member} />}

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
      <div className="flex items-center justify-end p-6 border-t border-solid border-[#1E1E1E0D] rounded-b">
        <button
          onClick={handleSendInvite}
          disabled={memberList.length === 0}
          className={`text-base  w-full h-[60px] py-3 flex justify-center items-center bg-[#E60054] rounded-xl font-medium text-white hover:bg-[#C20038] ${memberList.length === 0 ? 'cursor-not-allowed' : ''}`}
        >
          Send Invites
        </button>
      </div>
    </div>
  );
};

export default ModalInvite;
