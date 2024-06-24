import React, { useState } from 'react';
import Image from 'next/image'; // Import Image from next/image
// import dog from '/public/images/dog-walking.jpg';
import dummy from '/public/images/dummy.jpg';
import category from '/public/images/category.svg';
import time from '/public/images/one-time.svg';
// import dogIcon from '/public/images/dog-icon.svg';
import location from '/public/images/location.svg';
import leftSHape from '/public/images/bottom-left-shapes.svg';
import LongArrow from '/public/images/long-arrow-left.svg';
import arrow from '/public/images/chevron-right.svg';
// import volunteer from '/public/images/volunteer.svg';
import RightSHape from '/public/images/bottom-right-shapes.svg';
// import virutalLeft from '/public/images/virtual-left.svg';
// import virutalRight from '/public/images/virtual-right.svg';
import Link from 'next/link';
import {
  encodeUrl,
  getFormattedLocalTime,
  updateSearchParams,
} from '@/services/frontend/commonServices';
import { FIRESTORE_IMG_BASE_START_URL } from '@/constants/constants';
import { useCookies } from 'react-cookie';
import {
  deleteOppApi,
  volunteerOpportunity,
} from '@/services/frontend/opportunityService';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '@/app/redux/slices/loaderSlice';
import CommonDeleteModal from '../common/modal/CommonDeleteModal';
import { sweetAlertToast } from '@/services/frontend/toastServices';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { updateSubmitOppDetails } from '@/app/redux/slices/submitOpportunity';
import CreateEventStep4 from '../common/event/CreateEventStep4';
import CreateEventStep3 from '../common/event/CreateEventStep3';
import CreateEventStep2 from '../common/event/CreateEventStep2';
import CreateEventStep1 from '../common/event/CreateEventStep1';
import CreateEventModal from '../common/modal/CreateEventModal';
import { SearchParam } from '@/interface/opportunity';

const OpportunitiesDetail = ({
  opportunityDetail,
  oppId,
  showEditModal,
  setShowEditModal,
  setUpdateSuccess,
}: any) => {
  const userOrgDetails = useSelector((state: any) => state.userOrgReducer);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const step = searchParams.get('step') || '1';
  const [successfullContent, setSuccessfullContent] = useState<boolean>(false);

  const handleJoin = async () => {
    try {
      dispatch(setLoader(true));
      await volunteerOpportunity(opportunityDetail.id);
      setSuccessfullContent(true);
      dispatch(setLoader(false));
    } catch (error: any) {
      dispatch(setLoader(false));
    }
  };
  const [cookies] = useCookies();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const router = useRouter();
  const deleteOpportunity = async () => {
    try {
      dispatch(setLoader(true));
      const response = await deleteOppApi(oppId);
      const { message } = response;
      sweetAlertToast('success', message, 1000);
      dispatch(setLoader(false));
      setShowDeleteModal(false);
      router.push('/');
    } catch (error: any) {
      dispatch(setLoader(false));
      const { message } = error.data;
      sweetAlertToast('error', message);
    }
  };

  const openEditOppModal = () => {
    setShowEditModal(true);
    const updateOppDetails = {
      ...opportunityDetail,
    };
    dispatch(updateSubmitOppDetails(updateOppDetails));
    const params: SearchParam[] = [
      {
        key: 'submit-event',
        value: 'true',
      },
      {
        key: 'step',
        value: '1',
      },
    ];
    updateSearchParams(searchParams, pathname, router, params);
  };
  return (
    <div className="relative border-t border-[#E6E3D6]">
      <div className="md:p-5 w-full relative pb-44 md:pb-24 border-b border-[#E6E3D6]">
        <Link
          href="/"
          className="absolute top-5 z-10 left-5 w-[30px] h-[30px] md:w-11 md:h-11 md:min-w-11 border border-[#24181B] md:border-[#E6E3D6] rounded-xl flex justify-center items-center hover:!bg-[#24181B] bg-[#24181B] md:bg-transparent md:hover:!bg-[#EDEBE3]"
        >
          <Image
            className="md:block hidden"
            src={LongArrow}
            alt="arrow"
          ></Image>
          <Image
            className="md:hidden block rotate-180	"
            src={arrow}
            alt="arrow"
          ></Image>
        </Link>
        <div className="w-full md:max-w-[652px] m-auto">
          <div className="w-full md:bg-white md:rounded-3xl relative overflow-hidden">
            <div className="flex justify-between items-center gap-2 absolute left-5 right-5 top-5">
              <div className="text-sm font-medium hidden md:inline-flex py-[5px] px-3 gap-[5px] border border-[#FFFFFF80] bg-[#FFFFFFE5] rounded-full items-center">
                <span className="bg-[#FFC430] w-2 h-2 rounded-full"></span>{' '}
                Pre-Entry
              </div>
              {opportunityDetail?.createdBy === cookies.userDetails?.id ||
              opportunityDetail?.createdBy === userOrgDetails.id ? (
                <div className="relative cursor-pointer ml-auto">
                  <button
                    onClick={openEditOppModal}
                    className="relative text-[#24181B] text-base font-medium bg-white px-4 py-2 rounded-s-xl	after:h-6 after:w-px after:absolute after:bg-[#E6E3D6] after:right-0"
                  >
                    Edit
                  </button>
                  <button
                    className="text-[#24181B] text-base font-medium bg-white px-4 py-2 rounded-e-xl	"
                    type="button"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    Delete
                  </button>
                </div>
              ) : null}
            </div>
            <div className="realtive md:rounded-3xl overflow-hidden">
              {opportunityDetail?.imageLink && (
                <Image
                  width={652}
                  height={408}
                  src={`${FIRESTORE_IMG_BASE_START_URL}${encodeUrl(opportunityDetail?.imageLink)}`}
                  alt="detail"
                  className="w-full"
                />
              )}
            </div>

            <div className="p-5">
              <div className="flex gap-2.5 flex-wrap mb-10 md:mb-5">
                <div className="text-sm font-medium  md:hidden inline-flex py-[5px] px-3 gap-[5px] border border-[#FFFFFF80] bg-[#FFFFFFE5] rounded-full items-center">
                  <span className="bg-[#FFC430] w-2 h-2 rounded-full"></span>{' '}
                  Pre-Entry
                </div>
                <h2 className="m-0 text-[#1E1E1E] font-medium text-2xl md:text-[32px] leading-[36px] w-full">
                  {opportunityDetail?.name}
                </h2>

                {opportunityDetail?.organizationDetails && (
                  <div className="flex gap-2 items-center">
                    <div className="w-6 h-6 overflow-hidden rounded-full text-[#24181B]">
                      <Image
                        className="w-full h-full object-cover"
                        src={dummy}
                        alt="dummy"
                      />
                    </div>
                    {opportunityDetail?.organizationDetails?.name}
                  </div>
                )}
              </div>

              <div className="mt-5 flex flex-col gap-8">
                <div className="">
                  <h6 className="text-base m-0 text-[#1E1E1E] mb-3 font-medium w-full">
                    Description
                  </h6>
                  <p className="m-0 text-[#24181B80]">
                    {opportunityDetail?.description}
                  </p>
                </div>

                {opportunityDetail?.activities && (
                  <div>
                    <h6 className="text-base m-0 text-[#1E1E1E] mb-3 font-medium w-full">
                      Activities
                    </h6>
                    <p className="m-0 text-[#24181B80]">
                      {opportunityDetail?.activities}
                    </p>
                    {/* <ul className="list-disc pl-5">
                    <li className="text-[#24181B80] mb-1">
                      Guided dog walks around the scenic neighborhood
                    </li>
                    <li className="text-[#24181B80] mb-1">
                      Interactive play sessions with shelter pups
                    </li>
                    <li className="text-[#24181B80] mb-1">
                      Training demonstrations and tips from local experts
                    </li>
                    <li className="text-[#24181B80] mb-1">
                      Snacks and refreshments for volunteers
                    </li>
                  </ul> */}
                  </div>
                )}

                {opportunityDetail?.volunteerRequirements && (
                  <div>
                    <h6 className="text-base m-0 text-[#1E1E1E] mb-3 font-medium w-full">
                      Volunteer requirements
                    </h6>
                    <p className="m-0 text-[#24181B80]">
                      {opportunityDetail?.volunteerRequirements}
                    </p>
                    {/* <ul className="list-disc pl-5">
                    <li className="text-[#24181B80] mb-1">
                      All ages welcome (under 18 must be accompanied by an
                      adult)
                    </li>
                    <li className="text-[#24181B80] mb-1">
                      Comfortable walking shoes and weather-appropriate attire
                      recommended
                    </li>
                    <li className="text-[#24181B80] mb-1">
                      Please bring your own water bottle
                    </li>
                  </ul> */}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-full md:bg-white rounded-3xl relative overflow-hidden md:mt-10 p-5 ">
            <hr className="mb-10 md:hidden block border-[#D1CFC7]"></hr>
            <h2 className="m-0 text-[#24181B] font-medium text-2xl md:text-[32px] leading-[36px] w-full mb-5">
              Where it&apos;ll be
            </h2>
            <div className="flex flex-col gap-2.5">
              <div className="flex gap-2 items-center text-base text-[#24181B]">
                <div className="w-9 h-9 min-w-9 border border-[#EAE7DC] md:border-[#F5F3EF] flex items-center justify-center rounded-[10px]">
                  <Image src={time} alt="time" />
                </div>
                {opportunityDetail?.eventDate &&
                  getFormattedLocalTime(opportunityDetail?.eventDate, cookies)}
              </div>

              {opportunityDetail?.opportunityData && (
                <div className="flex gap-2 items-center text-base text-[#24181B]">
                  <div className="w-9 h-9 min-w-9 border border-[#EAE7DC] md:border-[#F5F3EF] flex items-center justify-center rounded-[10px]">
                    <Image
                      className="brightness-0"
                      width={20}
                      height={20}
                      // src={`${FIRESTORE_IMG_BASE_START_URL}${encodeUrl(opportunityDetail?.opportunityData.icon)}`}
                      src={category}
                      alt="dog"
                    />
                  </div>
                  {opportunityDetail?.opportunityData?.name}
                </div>
              )}

              {opportunityDetail?.location && (
                <div className="flex gap-2 items-center text-base text-[#24181B]">
                  <div className="w-9 h-9 min-w-9 border border-[#EAE7DC] md:border-[#F5F3EF] flex items-center justify-center rounded-[10px]">
                    <Image src={location} alt="location" />
                  </div>
                  {opportunityDetail?.location && opportunityDetail?.location}
                </div>
              )}

              {/* <div className="flex gap-2 items-center text-base text-[#24181B]">
                <div className="w-9 h-9 min-w-9 border border-[#EAE7DC] md:border-[#F5F3EF] flex items-center justify-center rounded-[10px]">
                  <Image src={volunteer} alt="volunteer" />
                </div>
                <div className='flex gap-2'>
                  <div className='flex'>
                    <div className='w-[26px] h-[26px] min-w-[26px] flex items-center justify-center bg-[#FF97B5] rounded-full text-[10px] text-[#24181B] font-medium border-2 border-[#FFFFFF]'>A</div>
                    <div className='-ml-3 w-[26px] h-[26px] min-w-[26px] flex items-center justify-center bg-[#0B9EDE] rounded-full text-[10px] text-[#24181B] font-medium border-2 border-[#FFFFFF]'>A</div>
                    <div className='-ml-3 w-[26px] h-[26px] min-w-[26px] flex items-center justify-center bg-[#0B9EDE] rounded-full text-[10px] text-[#24181B] font-medium border-2 border-[#FFFFFF]'>A</div>
                    <div className='-ml-3 w-[26px] h-[26px] min-w-[26px] flex items-center justify-center bg-[#FF532D] rounded-full text-[10px] text-[#24181B] font-medium border-2 border-[#FFFFFF]'>A</div>
                    <div className='-ml-3 w-[26px] h-[26px] min-w-[26px] flex items-center justify-center bg-[#FFC430] rounded-full text-[10px] text-[#24181B] font-medium border-2 border-[#FFFFFF]'>A</div>
                    <div className='-ml-3 w-[26px] h-[26px] min-w-[26px] flex items-center justify-center bg-[#7FE548] rounded-full text-[10px] text-[#24181B] font-medium border-2 border-[#FFFFFF]'>A</div>
                  </div>
                15/20 volunteers
                </div>
              </div> */}
            </div>

            <div className="w-full rounded-xl overflow-hidden my-10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114964.39567879181!2d-80.31185925136802!3d25.782538872180993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b0a20ec8c111%3A0xff96f271ddad4f65!2sMiami%2C%20FL%2C%20USA!5e0!3m2!1sen!2sin!4v1715846922507!5m2!1sen!2sin"
                width="100%"
                height="450"
                loading="lazy"
              ></iframe>
            </div>

            {opportunityDetail?.registrationType === '3' ? (
              <div className={`flex flex-col gap-5  `}>
                <div className="flex flex-col gap-1">
                  <h4 className="text-base text-[#24181B] font-medium">
                    Ready to make a difference?
                  </h4>
                  <p className="text-base text-[#24181B80] mb-1">
                    Simply click the link below to be directed to the
                    organization&apos;s website for more details and to get
                    involved.
                  </p>
                  <p className="text-base text-[#24181B80]">
                    Simply click the link below to be directed to the
                    organization&apos;s website for more details and to get
                    involved.
                  </p>
                </div>
                {opportunityDetail?.registrationWebsiteLink && (
                  <Link
                    target="_blank"
                    href={opportunityDetail?.registrationWebsiteLink}
                    className="text-base  w-full h-[58px] px-4 py-3 flex justify-center items-center bg-[#E60054] rounded-[20px] font-medium text-white hover:bg-[#C20038]"
                  >
                    Visit website to join
                  </Link>
                )}
              </div>
            ) : successfullContent ? (
              <div className={`flex flex-col gap-5 `}>
                <div className="flex flex-col gap-1">
                  <div>
                    <h3 className="text-base text-[#24181B] font-medium m-0 leading-[28px]">
                      Congratulations!
                    </h3>
                    <h4 className="text-base text-[#24181B] font-medium m-0 leading-[28px]">
                      You are now a volunteer on this event!
                    </h4>
                  </div>
                  <p className="text-base text-[#24181B] mb-2">
                    We&apos;re thrilled to have you on board for our upcoming
                    event! To ensure everything runs smoothly, please plan to
                    arrive 15 minutes before the start time. Your punctuality
                    will greatly assist with our organization efforts.
                  </p>
                  <p className="text-base text-[#24181B] mb-2">
                    If, for any reason, you are unable to attend, kindly send an
                    email to
                    <Link className="text-[#E60054] hover:underline" href="#">
                      {' '}
                      events@giverr.com.
                    </Link>
                    This will allow us to open up your spot to another eager
                    volunteer.
                  </p>
                  <p className="text-base text-[#24181B]">
                    Let&apos;s make it a memorable and impactful day together!
                  </p>
                </div>
              </div>
            ) : (
              <div
                className={`flex flex-col p-6 rounded-2xl md:rounded-none bg-white md:bg-transparent md:p-0 gap-5`}
              >
                <div className="flex flex-col gap-1">
                  <h4 className="text-lg text-[#24181B] font-medium">
                    Become a volunteer
                  </h4>
                  <p className="text-base text-[#24181B80]">
                    Space is limited, so be sure to sign up early to secure your
                    spot!{' '}
                  </p>
                </div>
                {!cookies?.userDetails ? (
                  <Link
                    className={
                      'text-base  w-full h-[58px] px-4 py-3 flex justify-center items-center bg-[#E60054] rounded-[20px] font-medium text-white hover:bg-[#C20038]'
                    }
                    href={'/sign-in'}
                  >
                    Login to Join
                  </Link>
                ) : (
                  opportunityDetail?.createdBy && (
                    <button
                      disabled={
                        cookies?.userDetails
                          ? cookies?.userDetails?.id ===
                              opportunityDetail?.createdBy ||
                            opportunityDetail?.alreadyJoined
                          : false
                      }
                      onClick={handleJoin}
                      className={`text-base  w-full h-[58px] px-4 py-3 flex justify-center items-center bg-[#E60054] rounded-[20px] font-medium text-white hover:bg-[#C20038] ${(cookies?.userDetails?.id === opportunityDetail?.createdBy || opportunityDetail?.alreadyJoined) && 'cursor-not-allowed'}`}
                    >
                      {opportunityDetail?.alreadyJoined
                        ? 'Already Joined'
                        : 'Join the event'}
                    </button>
                  )
                )}
              </div>
            )}

            <div className="flex flex-col gap-5 hidden">
              <div className="flex flex-col gap-1">
                <h4 className="text-base text-[#24181B] font-medium">
                  Ready to make a difference?
                </h4>
                <p className="text-base text-[#24181B80] mb-1">
                  Come join us at the location and be part of the team of
                  volunteers making the world a better place.
                </p>
                <p className="text-base text-[#24181B80]">
                  Together, let&apos;s create positive change and spread joy in
                  our community. Every helping hand counts!
                </p>
              </div>
            </div>
          </div>
        </div>
        <Image
          className="absolute left-0 bottom-0 h-[141px] w-auto lg:h-auto"
          src={leftSHape}
          alt=""
        ></Image>
        <Image
          className="absolute right-0 bottom-0 h-[149px]  w-auto lg:h-auto"
          src={RightSHape}
          alt=""
        ></Image>

        {/* <Image
          className="absolute left-0 bottom-0"
          src={virutalLeft}
          alt=""
        ></Image>
        <Image
          className="absolute right-0 bottom-0"
          src={virutalRight}
          alt=""
        ></Image> */}
      </div>
      {showDeleteModal && (
        <CommonDeleteModal
          heading={'Delete event opportunity'}
          showModal={showDeleteModal}
          setShowModal={setShowDeleteModal}
        >
          <div>
            <div className="relative p-5 flex-auto flex flex-col gap-5 overflow-auto">
              <p className="text-base text-[#24181B] m-0">
                Are you sure you want to delete opportunity?
              </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-[#1E1E1E0D] rounded-b gap-2.5">
              <button
                className="text-base  w-3/6 h-11 px-4 py-3 flex justify-center items-center bg-inherit rounded-xl font-medium text-[#E60054]  border border-[#E6005433] hover:bg-[#E600540D]"
                type="button"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className={`text-base w-3/6 h-11 py-3 flex justify-center items-center bg-[#E60054] rounded-xl font-medium text-white hover:bg-[#C20038]`}
                type="button"
                onClick={() => deleteOpportunity()}
              >
                Delete
              </button>
            </div>
          </div>
        </CommonDeleteModal>
      )}
      {showEditModal && (
        <CreateEventModal
          heading={'Update event'}
          showModal={showEditModal}
          setShowModal={setShowEditModal}
        >
          {step === '1' ? (
            <CreateEventStep1 />
          ) : step === '2' ? (
            <CreateEventStep2 />
          ) : step === '3' ? (
            <CreateEventStep3 />
          ) : step === '4' ? (
            <CreateEventStep4 setThankYouModal={setUpdateSuccess} />
          ) : null}
        </CreateEventModal>
      )}
    </div>
  );
};

export default OpportunitiesDetail;
