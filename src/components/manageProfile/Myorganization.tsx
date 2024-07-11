'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { encodeUrl, pickColor } from '@/services/frontend/commonServices';
import { FIRESTORE_IMG_BASE_START_URL } from '@/constants/constants';
import { getInitialOfEmail } from '@/services/frontend/userService';
import { getOrgDetail } from '@/services/frontend/organization';
import { updateOrgDetails } from '@/app/redux/slices/userOrgDetails';
import CommonDeleteModal from '../common/modal/CommonDeleteModal';
import DeleteModalContent from '../common/organization/DeleteModalContent';
import { defaultUserOrgDetail } from '@/utils/initialStates/userInitialStates';
import Members from './Members';
import { setLoader } from '@/app/redux/slices/loaderSlice';
import { MyorganizationProps, OrgDetails } from '@/interface/organization';
import deleteIcon from '/public/images/delete.svg';
import editIcon from '/public/images/edit-icon.svg';

const Myorganization: React.FC<MyorganizationProps> = ({
  showModal,
  setShowModal,
  inviteMembersModal,
  setInviteMembersModal,
  editClick,
}: any) => {
  const [orgIdWhoseMembersShouldVisible, setOrgIdWhoseMembersShouldVisible] =
    useState<any>('');
  const [deleteOrgIndex, setDeleteOrgIndex] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const userOrgDetails = useSelector((state: any) => state.userOrgReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        dispatch(setLoader(true));
        const getDetails = await getOrgDetail();
        if (getDetails) {
          if (getDetails.status === 'REJECTED') {
            const user = {
              ...defaultUserOrgDetail,
              status: getDetails.status,
            };
            dispatch(updateOrgDetails(user));
            dispatch(setLoader(false));
            return;
          }
          dispatch(updateOrgDetails(getDetails));
        }
        dispatch(setLoader(false));
      } catch (error: any) {
        dispatch(setLoader(false));
        console.log(error, 'error in getting the org');
      }
    })();
    // eslint-disable-next-line
  }, []);
  const showOrganization = userOrgDetails.length;

  useEffect(() => {
    if (showDeleteModal) {
      document.body.classList.add('delete-modal-open');
    } else {
      document.body.classList.remove('delete-modal-open');
    }
  }, [showDeleteModal]);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add('settings-modal-open');
    } else {
      document.body.classList.remove('settings-modal-open');
    }
  }, [showModal]);

  const handleDeleteOrg = (index: number) => {
    setShowDeleteModal(true);
    setDeleteOrgIndex(index);
  };
  return (
    <div className="w-full">
      <div className="flex justify-between items-center border-b-[0.5px] border-[#E6E3D6] py-4 md:py-0 md:border-none">
        <h3 className="text-[20px] md:text-[32px] font-medium leading-[36px] text-left">
          My Organization
        </h3>
        <button
          className="cursor-pointer text-base h-11 px-4 py-3 inline-flex justify-center items-center border border-[#ff000040] bg-inherit rounded-2xl font-medium text-[#E60054] hover:bg-[#ff000017]"
          type="button"
          onClick={() => setShowModal(true)}
        >
          New
        </button>
      </div>
      <div className="px-4 md:p-0">
        <div className=" w-full justify-between gap-3 items-center mt-5">
          {showOrganization ? (
            <>
              {userOrgDetails.map((org: OrgDetails, index: number) => (
                <div
                  onClick={() => setOrgIdWhoseMembersShouldVisible(org.id)}
                  key={org.id}
                  className="flex w-full items-center gap-4 justify-between mb-3"
                >
                  <div className="flex gap-4 items-center flex-grow">
                    <div
                      className={`w-11 h-11 min-w-11 flex items-center justify-center font-medium overflow-hidden rounded-full ${!org.avatarLink ? pickColor() : ''} text-[#24181B]`}
                    >
                      {org.avatarLink ? (
                        <Image
                          width={40}
                          height={40}
                          src={`${FIRESTORE_IMG_BASE_START_URL}${encodeUrl(org.avatarLink)}`}
                          alt="avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        getInitialOfEmail(org.name ? org.name : 'O')
                      )}
                    </div>
                    <div>
                      <p className="m-0 text-[#24181B80]">
                        You are the owner of this organization
                      </p>
                      {typeof org?.status === 'string' &&
                        org.status === 'PENDING' && (
                          <span className="text-[#e40054] text-sm">
                            Pending for approval
                          </span>
                        )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => editClick(index)}
                      className=" w-[20px] h-[20px] ml-auto border-0 text-white rounded-full flex items-center justify-center float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    >
                      <Image
                        className="brightness-0 group-hover:brightness-0 "
                        src={editIcon}
                        alt="delete"
                      />
                    </button>
                    <button
                      onClick={() => handleDeleteOrg(index)}
                      type="button"
                      className=" w-[20px] h-[20px] ml-auto border-0 text-white rounded-full flex items-center justify-center float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    >
                      <Image
                        className="brightness-0 group-hover:brightness-0 "
                        src={deleteIcon}
                        alt="delete"
                      />
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : userOrgDetails.status === 'PENDING' ? (
            <>
              <div className="fit-screen flex w-full justify-between gap-3 items-center md:text-left text-center">
                <div>
                  <span className="text-[#24181B] text-base">
                    Your request for organization is being reviewed by admin.
                  </span>
                  <p className="text-[#24181B80] text-base m-0">
                    It&apos;ll be soon approved, if everything went okay.
                  </p>
                </div>
              </div>
            </>
          ) : null}
        </div>
        {/* No organization section end */}

        {showOrganization ? (
          <>
            <hr className="my-[40px] md:my-[60px] border-[#E6E3D6]"></hr>
            <div className="organization-member">
              <Members
                orgIdWhoseMembersShouldVisible={orgIdWhoseMembersShouldVisible}
                inviteMembersModal={inviteMembersModal}
                setInviteMembersModal={setInviteMembersModal}
              />
            </div>
          </>
        ) : null}
        <hr className="my-[40px] md:my-[60px] "></hr>
      </div>
      {showDeleteModal && (
        <CommonDeleteModal
          heading={'Permanently delete organization'}
          showModal={showDeleteModal}
          setShowModal={setShowDeleteModal}
        >
          <DeleteModalContent
            setShowModal={setShowDeleteModal}
            index={deleteOrgIndex}
          />
        </CommonDeleteModal>
      )}
    </div>
  );
};

export default Myorganization;
