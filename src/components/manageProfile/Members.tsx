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
import { useForm } from 'react-hook-form';
import { MemberProps } from '@/interface/organization';
import {
  getLoggedInOrgFromCookies,
  getTheIndexOfOrg,
} from '@/services/frontend/commonServices';
import { updateSelectedOrgIdForMembers } from '@/app/redux/slices/selectedOrgIdForMembers';

const Members: React.FC<MemberProps> = ({
  inviteMembersModal,
  setInviteMembersModal,
}) => {
  const orgIdWhoseMembersShouldVisible = useSelector(
    (state: any) => state.selectedOrgIdReducer,
  );
  const { register, watch } = useForm();
  const searchMember = watch('searchMember');
  const [showCopiedTooltip, setShowCopiedTooltip] = useState<boolean>(false);
  const userOrgDetails = useSelector((state: any) => state.userOrgReducer);
  const [isRevokeInvite, setIsRevokeInvite] = useState<boolean>(false);
  const [cookies] = useCookies();
  const [showDeleteMemberModal, setShowDeleteMemberModal] =
    useState<boolean>(false);
  const [removeMemberId, setRemoveMemberId] = useState<string>('');

  // state in which we will set the memeber list on the basis of the org id whose members needs to be visible
  const [currentVisibleMembers, setCurrentVisibleMember] = useState<any>();

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
      const response = await removeMemberApi(
        removeMemberId,
        orgIdWhoseMembersShouldVisible,
      );
      const orgDetails = [...userOrgDetails];
      // find the index of the org from the global state
      const indexOfOrg = getTheIndexOfOrg(
        orgIdWhoseMembersShouldVisible,
        userOrgDetails,
      );
      // clone the particular org
      const orgWhoseMemberShouldRemove = { ...orgDetails[indexOfOrg] };
      // find the members of that particular org
      const members = [...orgWhoseMemberShouldRemove.members];
      // find the index for  member that needs to be  removed
      const memberIndex = members.findIndex(
        (member: any) => member.id === removeMemberId,
      );
      if (memberIndex > -1) {
        members.splice(memberIndex, 1);
        orgWhoseMemberShouldRemove.members = members;
        orgDetails[indexOfOrg] = orgWhoseMemberShouldRemove;
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
        orgId: orgIdWhoseMembersShouldVisible,
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

  const [filteredMembers, setFilteredMembers] = useState<any>([]);

  useEffect(() => {
    if (!searchMember) {
      setFilteredMembers(currentVisibleMembers || []);
    } else {
      const filtered = currentVisibleMembers.filter((member: any) => {
        const fullName = member.userDetails?.fullName?.toLowerCase() || '';
        const username = member.userDetails?.username?.toLowerCase() || '';
        const searchTextLower = searchMember.trim().toLowerCase();
        return (
          fullName.includes(searchTextLower) ||
          username.includes(searchTextLower)
        );
      });
      setFilteredMembers(filtered);
    } // eslint-disable-next-line
  }, [searchMember, userOrgDetails]);

  useEffect(() => {
    if (inviteMembersModal) {
      document.body.classList.add('settings-modal-open');
    } else {
      document.body.classList.remove('settings-modal-open');
    }
  }, [inviteMembersModal]);

  useEffect(() => {
    if (cookies.userDetails.loginAsOrg) {
      dispatch(updateSelectedOrgIdForMembers(cookies.userDetails.orgId));
    }
    const findOrg = getLoggedInOrgFromCookies(
      cookies.userDetails.orgId
        ? cookies.userDetails.orgId
        : orgIdWhoseMembersShouldVisible,
      userOrgDetails,
    );

    if (findOrg) {
      setCurrentVisibleMember(findOrg.members);
      setFilteredMembers(findOrg.members);
    } // eslint-disable-next-line
  }, [
    orgIdWhoseMembersShouldVisible,
    cookies.userDetails.orgId,
    userOrgDetails,
  ]);
  return (
    <>
      <h3 className="member-heading text-[20px] md:text-[32px] font-medium mb-5 mt-0 leading-[36px] text-center md:text-left md:hidden block border-b-[0.5px] border-[#E6E3D6] py-4 md:py-0 md:border-none">
        Members
      </h3>
      <div className="flex w-full flex-col gap-4 md:gap-5 relative px-4 md:p-0 member-box">
        <h4 className="w-full text-[#24181B] text-[20px] md:text-2xl font-medium">
          Members
        </h4>
        <div className="flex gap-4 md:gap-5 mt-3 md:mt-0">
          <div className="relative flex-1">
            <input
              autoComplete="off"
              id="searchMember"
              {...register('searchMember')}
              type="text"
              className="w-full h-11 bg-[#EDEBE3] border border-[#E6E3D6] rounded-2xl focus:outline-none px-10"
              placeholder="Invite by name or username"
            />
            <Image
              className="absolute top-3 left-3 pointer-events-none"
              src={lightSearch}
              alt="search"
            />
          </div>

          <button
            onClick={() => setInviteMembersModal(true)}
            className="invite-button text-base h-11 px-4 py-3 inline-flex justify-center items-center bg-[#E60054] rounded-2xl font-medium text-white hover:bg-[#C20038] absolute top-[-6px] md:top-0 right-4 md:right-0  md:relative"
          >
            Invite member
          </button>
        </div>
        <div>
          {filteredMembers?.length > 0 ? (
            filteredMembers.map(
              (member: any, index: number) =>
                member.userDetails && (
                  <div
                    className={`flex px-0 py-3 md:p-3 items-center gap-3 border-[#E6E3D6] ${index !== filteredMembers.length - 1 ? 'border-b' : ''}`}
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
                          <span className="inline-flex  text-[#24181B80] border border-[#E6E3D6] py-1 px-2 text-sm gap-2.5 rounded-full min-w-[60px]">
                            Owner
                          </span>
                        </Tooltip>
                      ) : member.status === 'PENDING' ? (
                        <div className="ml-auto flex gap-2 items-center">
                          <span className="inline-flex  text-[#02088B] border border-[#D5D7FD] bg-[#D5D7FD] py-1 px-2 text-sm gap-2.5 rounded-full min-w-[110px]">
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
                                          copyToClipboard(
                                            member.inviteToken.token,
                                          )
                                        }
                                        className="flex items-center gap-2 text-base px-3	py-[7px] hover:bg-[#F5F3EF] rounded-lg"
                                      >
                                        Copy invite link
                                      </button>
                                    )}
                                  </Menu.Item>

                                  <Menu.Item>
                                    <button
                                      onClick={() =>
                                        revokeInviteModal(member.id)
                                      }
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
        </div>
        {showDeleteMemberModal ? (
          <CommonDeleteModal
            heading={'Remove Member'}
            showModal={showDeleteMemberModal}
            setShowModal={setShowDeleteMemberModal}
          >
            <div>
              <div className="relative p-5 pt-0 flex-auto flex flex-col gap-5 overflow-auto">
                <p className="text-base text-[#24181B] m-0">
                  {isRevokeInvite
                    ? 'Are you sure you want to revoke this invite?'
                    : 'Are you sure you want to remove this member?'}
                </p>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-5  rounded-b gap-2.5">
                <button
                  className="text-base  w-3/6 h-11 px-4 py-3 flex justify-center items-center bg-inherit rounded-2xl font-medium text-[#24181B]  border border-[#E6E3D6] hover:bg-[#EDEBE3]"
                  type="button"
                  onClick={() => setShowDeleteMemberModal(false)}
                >
                  Cancel
                </button>
                <button
                  className={`text-base w-3/6 h-11 py-3 flex justify-center items-center bg-[#E60054] rounded-2xl font-medium text-white hover:bg-[#C20038]`}
                  type="button"
                  onClick={() => removeMember()}
                >
                  {isRevokeInvite ? 'Revoke Invite' : 'Remove'}
                </button>
              </div>
            </div>
          </CommonDeleteModal>
        ) : null}
      </div>
    </>
  );
};

export default Members;
