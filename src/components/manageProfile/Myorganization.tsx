'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import lightSearch from '/public/images/search-light.svg';
import more from '/public/images/more.svg';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
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
const Myorganization: React.FC = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const userOrgDetails = useSelector((state: any) => state.userOrgReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userOrgDetails.id) {
      (async () => {
        try {
          const getDetails = await getOrgDetail();
          if (getDetails) {
            if (getDetails.status === 'REJECTED') {
              const user = {
                ...defaultUserOrgDetail,
                status: getDetails.status,
              };
              dispatch(updateOrgDetails(user));
              return;
            }
            dispatch(updateOrgDetails(getDetails));
          }
        } catch (error: any) {
          console.log(error, 'error in getting the org');
        }
      })();
    } // eslint-disable-next-line
  }, []);
  const showOrganization =
    userOrgDetails.id && userOrgDetails.status === 'APPROVED';
  return (
    <div className="w-full">
      <h3 className="text-[32px] font-medium mb-5 mt-0 leading-[36px]">
        My Organization
      </h3>

      {/* No organization section Start */}

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
                  <span className="text-[#24181B] w-full">
                    {userOrgDetails.name}
                  </span>
                  <p className="m-0 text-[#24181B80]">
                    You are the owner of this organization
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowModal(true)}
              type="button"
              className="text-base  h-11 px-4 py-3 flex justify-center items-center bg-inherit rounded-xl font-medium text-[#E60054]  border border-[#E6005433] hover:bg-[#E600540D]"
            >
              Edit
            </button>
          </>
        ) : userOrgDetails.status === 'PENDING' ? (
          <>
            <div>
              <span className="text-[#24181B] text-base">
                Your request for organiztion is being reviewed by admin.
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
              className="cursro-pointer text-base h-11 px-4 py-3 inline-flex justify-center items-center border border-[#E60054] bg-inherit rounded-xl font-medium text-[#E60054] hover:text-white hover:bg-[#E60054]"
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
          <div className="flex w-full flex-col gap-5">
            <h4 className="w-full text-[#24181B] text-2xl font-medium">
              Members
            </h4>
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

              <button className="text-base h-11 px-4 py-3 inline-flex justify-center items-center bg-[#E60054] rounded-xl font-medium text-white hover:bg-[#C20038]">
                Invite members
              </button>
            </div>

            <div className="w-full">
              <div className="flex py-3 items-center gap-3 border-b border-[#E6E3D6]">
                <div className="flex gap-2.5 items-center">
                  <div className="w-8 h-8 flex items-center justify-center font-medium overflow-hidden rounded-full text-xs bg-[#BAA388] text-[#24181B]">
                    A
                  </div>

                  <div className="text-base">Anna Danielle Smith</div>
                  <span className="text-[#24181B80]">@anna.smith</span>
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
                  <Menu as="div" className="relative inline-block text-left">
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
                            <Link
                              href="#"
                              className="flex items-center gap-2 text-base px-3	py-[7px] hover:bg-[#F5F3EF] rounded-lg"
                            >
                              Edit
                            </Link>
                          </Menu.Item>

                          <Menu.Item>
                            <Link
                              href="#"
                              className="flex items-center gap-2 text-base px-3	py-[7px] hover:bg-[#F5F3EF] rounded-lg"
                            >
                              Remove
                            </Link>
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
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
                  <Menu as="div" className="relative inline-block text-left">
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
                            <Link
                              href="#"
                              className="flex items-center gap-2 text-base px-3	py-[7px] hover:bg-[#F5F3EF] rounded-lg"
                            >
                              Edit
                            </Link>
                          </Menu.Item>

                          <Menu.Item>
                            <Link
                              href="#"
                              className="flex items-center gap-2 text-base px-3	py-[7px] hover:bg-[#F5F3EF] rounded-lg"
                            >
                              Remove
                            </Link>
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
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
                  <Menu as="div" className="relative inline-block text-left">
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
                            <Link
                              href="#"
                              className="flex items-center gap-2 text-base px-3	py-[7px] hover:bg-[#F5F3EF] rounded-lg"
                            >
                              Resend invite
                            </Link>
                          </Menu.Item>

                          <Menu.Item>
                            <Link
                              href="#"
                              className="flex items-center gap-2 text-base px-3	py-[7px] hover:bg-[#F5F3EF] rounded-lg"
                            >
                              Copy invite link
                            </Link>
                          </Menu.Item>

                          <Menu.Item>
                            <Link
                              href="#"
                              className="flex items-center gap-2 text-base px-3	py-[7px] hover:bg-[#F5F3EF] rounded-lg text-[#F93742]"
                            >
                              Revoke invite
                            </Link>
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      <hr className="my-[60px] border-[#E6E3D6]"></hr>
      {showOrganization ? (
        <div className="inline-flex w-full items-center gap-4 justify-between m-5">
          <div className="inline-flex w-full items-center gap-4">
            <h2 className="flex-grow">Danger Zone</h2>{' '}
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
            userOrgDetails.id ? 'Update organization' : 'Create organization'
          }
          subHeading={'Details'}
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
