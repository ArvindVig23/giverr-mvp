import React, { useEffect, useState } from 'react';
import lightSearch from '/public/images/search-light.svg';
import more from '/public/images/more.svg';
import deleteIcon from '/public/images/delete.svg';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import MemberOption from '../common/organization/MemberOption';
import { useCookies } from 'react-cookie';
import CommonDeleteModal from '../common/modal/CommonDeleteModal';
import { setLoader } from '@/app/redux/slices/loaderSlice';
import {
  removeMemberApi,
  resendInviteEmail,
} from '@/services/frontend/memberService';
import { sweetAlertToast } from '@/services/frontend/toastServices';
import { updateOrgDetails } from '@/app/redux/slices/userOrgDetails';
import { Tooltip } from '@material-tailwind/react';
import { DOMAIN_URL } from '@/constants/constants';
import CommonModal from '../common/modal/CommonModal';
import ModalInvite from '../common/organization/ModalInvite';
import { useForm } from 'react-hook-form';
const Members = () => {
  const { register, watch } = useForm();
  const searchMember = watch('searchMember');
  const [inviteMembersModal, setInviteMembersModal] = useState<boolean>(false);
  const [showCopiedTooltip, setShowCopiedTooltip] = useState<boolean>(false);
  const userOrgDetails = useSelector((state: any) => state.userOrgReducer);
  const [isRevokeInvite, setIsRevokeInvite] = useState<boolean>(false);
  const [cookies] = useCookies();
  const [showDeleteMemberModal, setShowDeleteMemberModal] =
    useState<boolean>(false);
  const [removeMemberId, setRemoveMemberId] = useState<string>('');

  const openDeleteModal = (id: string) => {
    setShowDeleteMemberModal(true);
    setRemoveMemberId(id);
  };

  const revokeInviteModal = (id: string) => {
    setShowDeleteMemberModal(true);
    setRemoveMemberId(id);
    setIsRevokeInvite(true);
  };

  const dispatch = useDispatch();
  const removeMember = async () => {
    try {
      dispatch(setLoader(true));
      const response = await removeMemberApi(removeMemberId, userOrgDetails.id);
      const orgDetails = { ...userOrgDetails };
      const members = [...orgDetails.members];
      const memberIndex = members.findIndex(
        (member: any) => member.id === removeMemberId,
      );
      if (memberIndex > -1) {
        members.splice(memberIndex, 1);
        orgDetails.members = members;
        dispatch(updateOrgDetails(orgDetails));
      }
      const { message } = response;
      sweetAlertToast(
        'success',
        isRevokeInvite ? 'Invite revoked successfully' : message,
        1500,
      );
      setShowDeleteMemberModal(false);
      dispatch(setLoader(false));
      setIsRevokeInvite(false);
    } catch (error: any) {
      dispatch(setLoader(false));
      const { message } = error;
      sweetAlertToast('error', message);
    }
  };

  const copyToClipboard = (token: string) => {
    const inviteLink = `${DOMAIN_URL}/api/member-approval?token=${token}&status=APPROVED`;
    navigator.clipboard.writeText(inviteLink);
    setShowCopiedTooltip(true);
    setTimeout(() => {
      setShowCopiedTooltip(false);
    }, 5500);
  };

  const resendInvite = async (memId: string, userId: string) => {
    try {
      dispatch(setLoader(true));
      const data = {
        memId,
        userId,
        orgId: userOrgDetails.id,
      };
      const resend = await resendInviteEmail(data);
      const { message } = resend;
      sweetAlertToast('success', message, 1500);
      dispatch(setLoader(false));
    } catch (error: any) {
      dispatch(setLoader(false));
      const { message } = error;
      sweetAlertToast('error', message);
    }
  };

  const [filteredMembers, setFilteredMembers] = useState(
    userOrgDetails?.members || [],
  );

  useEffect(() => {
    if (searchMember === '' || !searchMember) {
      setFilteredMembers(userOrgDetails?.members || []);
    } else {
      const filtered = userOrgDetails.members.filter((member: any) => {
        const fullName = member.userDetails?.fullName?.toLowerCase() || '';
        const username = member.userDetails?.username?.toLowerCase() || '';
        const searchTextLower = searchMember.trim().toLowerCase();
        return (
          fullName.includes(searchTextLower) ||
          username.includes(searchTextLower)
        );
      });
      setFilteredMembers(filtered);
    }
  }, [searchMember, userOrgDetails]);
  return (
    <div className="flex w-full flex-col gap-5">
      <h4 className="w-full text-[#24181B] text-2xl font-medium">Members</h4>
      <span>All new members will be invited with no permissions.</span>
      <div className="flex gap-5">
        <div className="relative flex-1">
          <input
            id="searchMember"
            {...register('searchMember')}
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

        <button
          onClick={() => setInviteMembersModal(true)}
          className="text-base h-11 px-4 py-3 inline-flex justify-center items-center bg-[#E60054] rounded-xl font-medium text-white hover:bg-[#C20038]"
        >
          Invite member
        </button>
      </div>
      {filteredMembers?.length > 0 ? (
        filteredMembers.map(
          (member: any, index: number) =>
            member.userDetails && (
              <div
                className="flex p-3 items-center gap-3 border-b border-[#E6E3D6]"
                key={index}
              >
                <MemberOption member={member.userDetails} />
                <div className="ml-auto flex gap-2 items-center">
                  {cookies.userDetails.id === member.userId ? (
                    <Tooltip
                      content={
                        'Owners can manage events and member permissions.'
                      }
                    >
                      <span className="inline-flex  text-[#24181B80] border border-[#E6E3D6] py-1 px-2 text-sm gap-2.5 rounded-full">
                        Owner
                      </span>
                    </Tooltip>
                  ) : member.status === 'PENDING' ? (
                    <div className="ml-auto flex gap-2 items-center">
                      <span className="inline-flex  text-[#02088B] border border-[#D5D7FD] bg-[#D5D7FD] py-1 px-2 text-sm gap-2.5 rounded-full">
                        Invite pending
                      </span>
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div>
                          <Menu.Button className="inline-flex justify-center gap-x-1.5 rounded-[10px] hover:bg-[#1E1E1E1A] min-w-[30px] w-[30px] h-[30px] items-center text-base font-medium ">
                            <Image src={more} alt="more" />
                          </Menu.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right !rounded-xl border !border-[#E6E3D6] !ring-0 bg-white !shadow-none">
                            <div className="p-1.5 flex flex-col gap-0.5">
                              <Menu.Item>
                                <button
                                  onClick={() =>
                                    resendInvite(member.id, member.userId)
                                  }
                                  className="flex items-center gap-2 text-base px-3	py-[7px] hover:bg-[#F5F3EF] rounded-lg"
                                >
                                  Resend invite
                                </button>
                              </Menu.Item>

                              <Menu.Item>
                                {showCopiedTooltip ? (
                                  <Tooltip content={'copied'}>
                                    <button
                                      onClick={() =>
                                        copyToClipboard(
                                          member.inviteToken.token,
                                        )
                                      }
                                      className="flex items-center gap-2 text-base px-3	py-[7px] hover:bg-[#F5F3EF] rounded-lg"
                                    >
                                      Copy invite link
                                    </button>
                                  </Tooltip>
                                ) : (
                                  <button
                                    onClick={() =>
                                      copyToClipboard(member.inviteToken.token)
                                    }
                                    className="flex items-center gap-2 text-base px-3	py-[7px] hover:bg-[#F5F3EF] rounded-lg"
                                  >
                                    Copy invite link
                                  </button>
                                )}
                              </Menu.Item>

                              <Menu.Item>
                                <button
                                  onClick={() => revokeInviteModal(member.id)}
                                  className="flex items-center gap-2 text-base px-3	py-[7px] hover:bg-[#F5F3EF] rounded-lg text-[#F93742]"
                                >
                                  Revoke invite
                                </button>
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  ) : member.status === 'APPROVED' ? (
                    <div className="ml-auto flex gap-2 items-center">
                      <Tooltip
                        content={'Members currently have no permissions.'}
                      >
                        <span className="inline-flex  text-[#24181B80] border border-[#E6E3D6] py-1 px-2 text-sm gap-2.5 rounded-full">
                          Member
                        </span>
                      </Tooltip>
                      <button
                        onClick={() => openDeleteModal(member.id)}
                        className=" w-[20px] h-[20px] ml-auto border-0 text-white rounded-full flex items-center justify-center float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      >
                        <Image
                          className="brightness-0 group-hover:brightness-0 "
                          src={deleteIcon}
                          alt="delete"
                        />
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            ),
        )
      ) : (
        <span>No Members found</span>
      )}
      {showDeleteMemberModal ? (
        <CommonDeleteModal
          heading={'Remove Member'}
          showModal={showDeleteMemberModal}
          setShowModal={setShowDeleteMemberModal}
        >
          <div>
            <div className="relative p-5 flex-auto flex flex-col gap-5 max-h-modal overflow-auto">
              <p className="text-base text-[#24181B] m-0">
                {isRevokeInvite
                  ? 'Are you sure you want to revoke this invite?'
                  : 'Are you sure you want to remove this member?'}
              </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-[#1E1E1E0D] rounded-b gap-2.5">
              <button
                className="text-base  w-3/6 h-11 px-4 py-3 flex justify-center items-center bg-inherit rounded-xl font-medium text-[#E60054]  border border-[#E6005433] hover:bg-[#E600540D]"
                type="button"
                onClick={() => setShowDeleteMemberModal(false)}
              >
                Cancel
              </button>
              <button
                className={`text-base w-3/6 h-11 py-3 flex justify-center items-center bg-[#E60054] rounded-xl font-medium text-white hover:bg-[#C20038]`}
                type="button"
                onClick={() => removeMember()}
              >
                {isRevokeInvite ? 'Revoke Invite' : 'Delete'}
              </button>
            </div>
          </div>
        </CommonDeleteModal>
      ) : null}
      {inviteMembersModal ? (
        <CommonModal
          heading={'Invite Members'}
          subHeading={'Send Invite to'}
          showModal={inviteMembersModal}
          setShowModal={setInviteMembersModal}
        >
          <ModalInvite setShowModal={setInviteMembersModal} />
        </CommonModal>
      ) : null}
    </div>
  );
};

export default Members;
