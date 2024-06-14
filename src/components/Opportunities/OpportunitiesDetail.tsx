import React, { useState } from 'react';
import Image from 'next/image'; // Import Image from next/image
// import dog from '/public/images/dog-walking.jpg';
import dummy from '/public/images/dummy.jpg';
import time from '/public/images/one-time.svg';
// import dogIcon from '/public/images/dog-icon.svg';
import location from '/public/images/location.svg';
import Link from 'next/link';
// import Delete from '../manageProfile/detete';
import { OpportunityDetail } from '@/interface/opportunity';
import {
  encodeUrl,
  getFormattedLocalTime,
} from '@/services/frontend/commonServices';
import { FIRESTORE_IMG_BASE_START_URL } from '@/constants/constants';
import { useCookies } from 'react-cookie';
import { volunteerOpportunity } from '@/services/frontend/opportunityService';
import { useDispatch } from 'react-redux';
import { setLoader } from '@/app/redux/slices/loaderSlice';

const OpportunitiesDetail: React.FC<OpportunityDetail> = ({
  opportunityDetail,
}) => {
  const dispatch = useDispatch();
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
  return (
    <div className="relative border-t border-[#E6E3D6]">
      <div className="p-5 w-full relative pb-24">
        <div className="w-full max-w-[652px] m-auto">
          <div className="w-full bg-white rounded-3xl relative overflow-hidden">
            <div className="flex justify-between items-center gap-2 absolute left-5 right-5 top-5">
              <div className="text-sm font-medium inline-flex py-[5px] px-3 gap-[5px] border border-[#FFFFFF80] bg-[#FFFFFFE5] rounded-full items-center">
                <span className="bg-[#FFC430] w-2 h-2 rounded-full"></span>{' '}
                Pre-Entry
              </div>
              {/* <div className="relative cursor-pointer">
                <button className="relative text-[#24181B] text-base font-medium bg-white px-4 py-2 rounded-s-xl	after:h-6 after:w-px after:absolute after:bg-[#E6E3D6] after:right-0">
                  Edit
                </button>
                <Delete />
              </div> */}
            </div>
            <div className="realtive rounded-3xl">
              {opportunityDetail?.imageLink && (
                <Image
                  width={652}
                  height={408}
                  src={`${FIRESTORE_IMG_BASE_START_URL}${encodeUrl(opportunityDetail?.imageLink)}`}
                  alt="detail"
                />
              )}
            </div>

            <div className="p-5">
              <div className="flex gap-2.5 flex-wrap mb-5">
                <h2 className="m-0 text-[#24181B] font-medium text-[32px] leading-[36px] w-full">
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

              <div className="mt-10 flex flex-col gap-8">
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

          <div className="w-full bg-white rounded-3xl relative overflow-hidden mt-10 p-5 ">
            <h2 className="m-0 text-[#24181B] font-medium text-[32px] leading-[36px] w-full mb-5">
              Where it&apos;ll be
            </h2>
            <div className="flex flex-col gap-2.5">
              <div className="flex gap-1 text-base text-[#24181B]">
                <Image src={time} alt="time" />
                {opportunityDetail?.eventDate &&
                  getFormattedLocalTime(
                    opportunityDetail?.eventDate,
                    cookies.userDetails.timeZoneSettings,
                  )}
              </div>

              {opportunityDetail?.opportunityData && (
                <div className="flex gap-1 text-base text-[#24181B]">
                  <Image
                    className="brightness-0"
                    width={20}
                    height={20}
                    src={`${FIRESTORE_IMG_BASE_START_URL}${encodeUrl(opportunityDetail?.opportunityData.icon)}`}
                    alt="dog"
                  />
                  {opportunityDetail?.opportunityData?.name}
                </div>
              )}

              {opportunityDetail?.location && (
                <div className="flex gap-1 text-base text-[#24181B]">
                  <Image src={location} alt="location" />
                  {opportunityDetail?.location && opportunityDetail?.location}
                </div>
              )}
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
                    className="text-base  w-full h-[58px] px-4 py-3 flex justify-center items-center bg-[#E60054] rounded-xl font-medium text-white hover:bg-[#C20038]"
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
              <div className={`flex flex-col gap-5`}>
                <div className="flex flex-col gap-1">
                  <h4 className="text-base text-[#24181B] font-medium">
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
                      'text-base  w-full h-[58px] px-4 py-3 flex justify-center items-center bg-[#E60054] rounded-xl font-medium text-white hover:bg-[#C20038]'
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
                      className={`text-base  w-full h-[58px] px-4 py-3 flex justify-center items-center bg-[#E60054] rounded-xl font-medium text-white hover:bg-[#C20038] ${(cookies?.userDetails?.id === opportunityDetail?.createdBy || opportunityDetail?.alreadyJoined) && 'cursor-not-allowed'}`}
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
      </div>
    </div>
  );
};

export default OpportunitiesDetail;
