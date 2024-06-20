'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import CommonModal from '../common/modal/CommonModal';
import OrganizationForm from '../common/organization/OrganizationForm';
import { encodeUrl } from '@/services/frontend/commonServices';
import { FIRESTORE_IMG_BASE_START_URL } from '@/constants/constants';
import { getInitialOfEmail } from '@/services/frontend/userService';
import { getOrgDetail } from '@/services/frontend/organization';
import { updateOrgDetails } from '@/app/redux/slices/userOrgDetails';
import CommonDeleteModal from '../common/modal/CommonDeleteModal';
import DeleteModalContent from '../common/organization/DeleteModalContent';
import { defaultUserOrgDetail } from '@/utils/initialStates/userInitialStates';
import Members from './Members';
import { setLoader } from '@/app/redux/slices/loaderSlice';
const Myorganization: React.FC = () => {
  const [showModal, setShowModal] = React.useState(false);
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
  const showOrganization =
    userOrgDetails.id && userOrgDetails.status === 'APPROVED';
  return (
    <div className="w-full">
      <h3 className="text-[32px] font-medium mb-5 mt-0 leading-[36px]">
        My Organization
      </h3>
      <div className="flex w-full justify-between gap-3 items-center">
        {showOrganization ? (
          <>
            <div className="inline-flex w-full items-center gap-4 justify-between">
              <div className="inline-flex gap-4 items-center">
                <div className="w-11 h-11 flex items-center justify-center font-medium overflow-hidden rounded-full bg-[#88AEBA] text-[#24181B]">
                  {userOrgDetails.avatarLink ? (
                    <Image
                      width={40}
                      height={40}
                      src={`${FIRESTORE_IMG_BASE_START_URL}${encodeUrl(userOrgDetails.avatarLink)}`}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    getInitialOfEmail(
                      userOrgDetails.name ? userOrgDetails.name : 'O',
                    )
                  )}
                </div>
                <div>
                  {/* <span className="text-[#24181B] w-full">
                    {userOrgDetails.name}
                  </span> */}
                  <p className="m-0 text-[#24181B80]">
                    You are the owner of this organization
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowModal(true)}
              type="button"
              className="text-base  h-11 px-4 py-3 flex justify-center items-center bg-inherit rounded-2xl font-medium text-[#E60054]  border border-[#ff000040] hover:bg-[#ff000017]"
            >
              Edit
            </button>
          </>
        ) : userOrgDetails.status === 'PENDING' ? (
          <>
            <div>
              <span className="text-[#24181B] text-base">
                Your request for organization is being reviewed by admin.
              </span>
              <p className="text-[#24181B80] text-base m-0">
                It&apos;ll be soon approved, if everything went okay.
              </p>
            </div>
          </>
        ) : (
          <>
            <div>
              <span className="text-[#24181B] text-base">No organizations</span>
              <p className="text-[#24181B80] text-base m-0">
                You are the owner.
              </p>
            </div>
            <button
              className="cursro-pointer text-base h-11 px-4 py-3 inline-flex justify-center items-center border border-[#ff000040] bg-inherit rounded-2xl font-medium text-[#E60054]  hover:bg-[#ff000017]"
              type="button"
              onClick={() => setShowModal(true)}
            >
              New
            </button>
          </>
        )}
      </div>
      {/* No organization section end */}

      {showOrganization ? (
        <>
          <hr className="my-[60px] border-[#E6E3D6]"></hr>
          <Members />
        </>
      ) : null}
      <hr className="my-[60px]"></hr>
      {showOrganization ? (
        <div className="inline-flex w-full items-center gap-4 justify-between">
          <div className="inline-flex w-full items-center gap-4">
            <h2 className="flex-grow font-medium text-2xl">Danger Zone</h2>{' '}
            <button
              onClick={() => setShowDeleteModal(true)}
              type="button"
              className="text-base  h-11 px-4 py-3 justify-end flex items-center bg-inherit rounded-xl font-medium text-[#E60054]  border border-[#E6005433] hover:bg-[#E600540D]"
            >
              Delete Organization
            </button>
          </div>
        </div>
      ) : null}
      {showModal && (
        <CommonModal
          heading={
            userOrgDetails.id && userOrgDetails.status !== 'PENDING'
              ? 'Update organization'
              : 'Create organization'
          }
          showModal={showModal}
          setShowModal={setShowModal}
        >
          <OrganizationForm setShowModal={setShowModal} />
        </CommonModal>
      )}
      {showDeleteModal && (
        <CommonDeleteModal
          heading={'Permanently delete organization'}
          showModal={showDeleteModal}
          setShowModal={setShowDeleteModal}
        >
          <DeleteModalContent setShowModal={setShowDeleteModal} />
        </CommonDeleteModal>
      )}
    </div>
  );
};

export default Myorganization;
