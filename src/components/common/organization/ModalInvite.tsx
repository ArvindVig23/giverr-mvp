'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import lightSearch from '/public/images/search-light.svg';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import {
  debounce,
  encodeUrl,
  getTheIndexOfOrg,
} from '@/services/frontend/commonServices';
import { getMembersList, sendInvite } from '@/services/frontend/memberService';
import cross from '/public/images/cross.svg';
import MemberOption from './MemberOption';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { sweetAlertToast } from '@/services/frontend/toastServices';
import { setLoader } from '@/app/redux/slices/loaderSlice';
import { updateOrgDetails } from '@/app/redux/slices/userOrgDetails';
import { getInitialOfEmail } from '@/services/frontend/userService';
import { FIRESTORE_IMG_BASE_START_URL } from '@/constants/constants';

const ModalInvite = ({ setShowModal }: any) => {
  const orgIdWhoseMembersShouldVisible = useSelector(
    (state: any) => state.selectedOrgIdReducer,
  );
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
      const index = userOrgDetails.findIndex(
        (org: any) => org.id === orgIdWhoseMembersShouldVisible,
      );
      const memberIds = userOrgDetails[index].members.map(
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
        orgId: orgIdWhoseMembersShouldVisible,
      };
      const filteredIds = memberList.map((member) => member.id);
      membersData.members = filteredIds;
      try {
        const response = await sendInvite(membersData);
        const { message, data } = response;
        sweetAlertToast('success', message, 1000);
        setShowModal(false);
        const updatedOrg = [...userOrgDetails];
        const index = getTheIndexOfOrg(
          orgIdWhoseMembersShouldVisible,
          userOrgDetails,
        );
        updatedOrg[index] = { ...updatedOrg[index], members: data.members };
        dispatch(updateOrgDetails(updatedOrg));
        dispatch(setLoader(false));
      } catch (error: any) {
        dispatch(setLoader(false));
        const { message } = error;
        sweetAlertToast('error', message);
      }
    }
  };
  console.log(searchResults, 'searchResults');

  return (
    <div className="flex w- flex-col" ref={dropdownRef}>
      <div className="px-5 py-5 max-h-modal overflow-auto">
        <h4 className="text-[#24181B] text-2xl font-medium mb-5">
          Send Invite to
        </h4>
        <div className="relative flex-1 mb-5">
          <input
            autoComplete="off"
            id="searchMember"
            {...register('searchMember')}
            type="text"
            className="w-full h-11 bg-[#EDEBE3] border border-[#E6E3D6] rounded-xl focus:outline-none px-10"
            placeholder="Name or username"
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
                          getInitialOfEmail(result.email)
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
          <span className="text-[#24181B80] text-xs">
            All new members will be invited with no permissions.
          </span>
        </div>
        <div className="relative flex gap-2 flex-col">
          {memberList.map((member: any, index: number) => (
            <div className="w-full" key={index}>
              <div className="group flex p-1 items-center gap-3 border border-[#E6E3D6] rounded-xl hover:cursor-pointer">
                <div className="px-3 py-2.5 flex gap-3 w-full items-center rounded-xl group-hover:bg-[#EDEBE3]">
                  {<MemberOption member={member} />}

                  <div className="ml-auto flex gap-2 items-center">
                    {cookies.userDetails.id === member.id ? (
                      <span className="inline-flex  text-[#24181B80] border border-[#E6E3D6] py-1 px-2 text-sm gap-2.5 rounded-full">
                        Owner
                      </span>
                    ) : (
                      <button
                        onClick={() => handleRemoveMember(index)}
                        className="group w-[20px] h-[20px] ml-auto  border-0 text-white rounded-full flex items-center justify-center float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      >
                        <Image
                          className="hidden brightness-0  group-hover:block"
                          src={cross}
                          alt="close"
                        />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
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
