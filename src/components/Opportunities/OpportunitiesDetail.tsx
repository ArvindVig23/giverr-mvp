import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import category from '/public/images/category.svg';
import time from '/public/images/one-time.svg';
import volunteer from '/public/images/organizations.svg';
import {
  GoogleMap,
  Libraries,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';

// import dogIcon from '/public/images/dog-icon.svg';
import heart from '/public/images/heart.svg';
import stateFill from '/public/images/state=filled.svg';
import virtual from '/public/images/virtual.svg';
import locationImage from '/public/images/location.svg';
import leftSHape from '/public/images/bottom-left-shapes.svg';
import LongArrow from '/public/images/long-arrow-left.svg';
import arrow from '/public/images/chevron-right.svg';
// import volunteer from '/public/images/volunteer.svg';
import RightSHape from '/public/images/bottom-right-shapes.svg';
import virutalLeft from '/public/images/virtual-left.svg';
import virutalRight from '/public/images/virtual-right.svg';
import Link from 'next/link';
import {
  calculateCenter,
  convertToLocalDateWithDay,
  encodeUrl,
  findCommitment,
  getLocalTimeRangeForDetail,
  pickColor,
  updateSearchParams,
} from '@/services/frontend/commonServices';
import {
  FIRESTORE_IMG_BASE_START_URL,
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  NEXT_PUBLIC_MAP_MARKER_ICON,
  SUPPORT_EMAIL,
} from '@/constants/constants';
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
import { Location, SearchParam } from '@/interface/opportunity';
import { addRemoveWishlistService } from '@/services/frontend/wishlistService';
import { getInitialOfEmail } from '@/services/frontend/userService';
import { provincesOptions } from '@/utils/staticDropdown/dropdownOptions';

const OpportunitiesDetail = ({
  opportunityDetail,
  setOpportunityDetail,
  oppId,
  showEditModal,
  setShowEditModal,
  setUpdateSuccess,
}: any) => {
  const [stepValidationShouldCheck, setStepValidationShouldCheck] =
    useState<number>(0);
  const userOrgDetails = useSelector((state: any) => state.userOrgReducer);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const step = searchParams.get('step') || '1';
  const [successfullContent, setSuccessfullContent] = useState<boolean>(false);

  const [copied, setCopied] = useState(false);
  const handleJoin = async () => {
    if (opportunityDetail?.volunteer?.length === +opportunityDetail?.spots) {
      sweetAlertToast(
        'warning',
        'No more spots are available for the opportunity.',
      );

      return;
    }
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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(opportunityDetail?.virtualLocationLink);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const displayVolunteerName = (name: string) => {
    return name[0].toUpperCase();
  };

  const addRemoveWishlist = async (oppId: string) => {
    try {
      dispatch(setLoader(true));
      await addRemoveWishlistService(oppId);
      const copyOpportunityDetails: any = { ...opportunityDetail };
      copyOpportunityDetails.isWishlist = !opportunityDetail.isWishlist;
      setOpportunityDetail(copyOpportunityDetails);
      dispatch(setLoader(false));
    } catch (error: any) {
      dispatch(setLoader(false));
      const { message } = error.data;
      sweetAlertToast('error', message);
    }
  };

  const isCreatedByUserOrOrg =
    cookies?.userDetails?.id === opportunityDetail?.createdBy ||
    opportunityDetail?.alreadyJoined ||
    userOrgDetails.some((org: any) => org.id === opportunityDetail?.createdBy);

  const mapStyles = {
    height: '400px',
    width: '100%',
  };

  const libraries = useMemo<Libraries>(
    () => ['places', 'marker', 'geometry'],
    [],
  );

  const { isLoaded } = useLoadScript(
    useMemo(
      () => ({
        googleMapsApiKey: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        libraries: libraries,
      }),
      [libraries],
    ),
  );

  const [center, setCenter] = useState({ lat: 48.6300448, lng: 8.034704 });
  useEffect(() => {
    if (opportunityDetail?.physicalLocations) {
      const newCenter = calculateCenter(opportunityDetail.physicalLocations);
      setCenter(newCenter);
      console.log();
    } //eslint-disable-next-line
  }, [opportunityDetail?.physicalLocations?.length]);
  return (
    <div className="relative border-t border-[#E6E3D6]">
      <div className="md:p-5 w-full relative pb-44 md:pb-24 border-b border-[#E6E3D6]">
        <button
          onClick={() => router.back()}
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
        </button>
        <div className="w-full md:max-w-[652px] m-auto">
          <div className="w-full md:bg-white md:rounded-3xl relative overflow-hidden">
            <div className="flex justify-between items-center gap-2 absolute left-5 right-5 top-5">
              <div className="text-sm font-medium hidden md:inline-flex py-[5px] px-3 gap-[5px] border border-[#FFFFFF80] bg-[#FFFFFFE5] rounded-full items-center">
                <span
                  className={` w-2 h-2 rounded-full ${opportunityDetail?.registrationType === 'SHOW_UP' ? 'bg-[#0B9EDE]' : 'bg-[#FFC430]'}`}
                ></span>{' '}
                {opportunityDetail?.registrationType === 'SHOW_UP'
                  ? 'Show Up'
                  : 'Pre-Entry'}
              </div>
              {opportunityDetail?.createdBy === cookies.userDetails?.id ||
              userOrgDetails.some(
                (org: any) => org.id === opportunityDetail?.createdBy,
              ) ? (
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
              ) : (
                <div
                  className="relative cursor-pointer"
                  onClick={() => addRemoveWishlist(opportunityDetail.id)}
                >
                  <Image
                    src={opportunityDetail?.isWishlist ? stateFill : heart}
                    alt="heart"
                  />
                </div>
              )}
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
                    <div
                      className={`w-6 h-6 rounded-full overflow-hidden ${pickColor()} flex justify-center items-center text-xs overflow-hidden`}
                    >
                      {opportunityDetail?.organizationDetails?.avatarLink ? (
                        <Image
                          width={40}
                          height={40}
                          src={`${FIRESTORE_IMG_BASE_START_URL}${encodeUrl(opportunityDetail?.organizationDetails?.avatarLink)}`}
                          alt="avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        getInitialOfEmail(
                          opportunityDetail?.organizationDetails?.name
                            ? opportunityDetail?.organizationDetails?.name
                            : 'O',
                        )
                      )}
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

                <div>
                  {opportunityDetail?.frequency
                    ? `${opportunityDetail?.minHour}-${opportunityDetail?.maxHour}h ${opportunityDetail.frequency} ${opportunityDetail?.commitment ? ` for ${findCommitment(opportunityDetail?.commitment)}` : ''} `
                    : opportunityDetail?.selectedDate &&
                      convertToLocalDateWithDay(
                        opportunityDetail?.selectedDate,
                        cookies,
                      )}
                  {opportunityDetail?.startTime &&
                    opportunityDetail?.endTime && (
                      <p className="text-xs md:text-sm text-[#857E7E]">
                        {getLocalTimeRangeForDetail(
                          opportunityDetail?.startTime,
                          cookies,
                          false, // send true if want the timeZone
                        )}{' '}
                        -{' '}
                        {getLocalTimeRangeForDetail(
                          opportunityDetail?.endTime,
                          cookies,
                          true,
                        )}
                      </p>
                    )}
                </div>
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
              {opportunityDetail?.virtualLocationLink ? (
                <div className="flex gap-2 items-center text-base text-[#24181B]">
                  <div className="w-9 h-9 min-w-9 border border-[#EAE7DC] md:border-[#F5F3EF] flex items-center justify-center rounded-[10px]">
                    <Image
                      width={20}
                      height={20}
                      src={virtual}
                      alt="location"
                    />
                  </div>
                  Virtual
                </div>
              ) : null}
              {opportunityDetail?.physicalLocations &&
              opportunityDetail?.physicalLocations.length > 0
                ? opportunityDetail?.physicalLocations.map(
                    (location: Location) => (
                      <div
                        key={location.id}
                        className="flex gap-2 items-center text-base text-[#24181B]"
                      >
                        <div className="w-9 h-9 min-w-9 border border-[#EAE7DC] md:border-[#F5F3EF] flex items-center justify-center rounded-[10px]">
                          <Image src={locationImage} alt="location" />
                        </div>
                        {`${location.address}, ${location.city}, ${
                          location.province
                            ? `${provincesOptions.find((option) => option.value === location.province)?.label},`
                            : ''
                        } ${location.postalCode}`}
                      </div>
                    ),
                  )
                : null}

              {(opportunityDetail?.createdBy === cookies.userDetails?.id ||
                opportunityDetail?.createdBy === userOrgDetails.id) &&
              opportunityDetail?.registrationType === 'GIVER_PLATFORM' ? (
                <div className="flex gap-2  text-base text-[#24181B]">
                  <div className="flex gap-2 items-center">
                    <div className="w-9 h-9 min-w-9 border border-[#EAE7DC] md:border-[#F5F3EF] flex items-center justify-center rounded-[10px]">
                      <Image
                        width={20}
                        height={20}
                        src={volunteer}
                        alt="location"
                      />
                    </div>
                    {opportunityDetail?.volunteer?.length > 0 ? (
                      <div className="flex">
                        {opportunityDetail?.volunteer?.length > 0 &&
                          opportunityDetail.volunteer.map(
                            (vol: any, index: number) => (
                              <div
                                key={vol.id}
                                className={`w-[26px] h-[26px] min-w-[26px] flex items-center justify-center ${pickColor()} rounded-full text-[10px] text-[#24181B] font-medium border-2 border-[#FFFFFF] ${index !== 0 ? '-ml-3' : ''}`}
                              >
                                {displayVolunteerName(
                                  vol?.username?.length
                                    ? vol?.username
                                    : vol?.fullName?.length
                                      ? vol?.fullName
                                      : vol?.email,
                                )}
                              </div>
                            ),
                          )}
                      </div>
                    ) : null}
                    {opportunityDetail?.volunteer?.length}/
                    {opportunityDetail?.spots ? opportunityDetail?.spots : 0}{' '}
                    volunteers
                  </div>
                </div>
              ) : null}
            </div>
            {opportunityDetail?.physicalLocations.length ? (
              <div className="w-full rounded-xl overflow-hidden my-10">
                {isLoaded && (
                  <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={10}
                    center={center}
                  >
                    {opportunityDetail?.physicalLocations?.map(
                      (location: any, index: number) =>
                        location.lat &&
                        location.long && (
                          <Marker
                            icon={NEXT_PUBLIC_MAP_MARKER_ICON}
                            key={index}
                            position={{ lat: location.lat, lng: location.long }}
                          />
                        ),
                    )}
                  </GoogleMap>
                )}
              </div>
            ) : null}

            {opportunityDetail?.virtualLocationLink &&
            opportunityDetail?.registrationType === 'SHOW_UP' ? (
              <div className="flex justify-between items-center">
                <p>{opportunityDetail?.virtualLocationLink}</p>
                <button
                  disabled={copied}
                  onClick={handleCopyLink}
                  className={` text-base h-[60px] px-4 py-3 inline-flex justify-center items-center border border-[#ff000040] bg-inherit rounded-2xl font-medium text-[#E60054] hover:bg-[#ff000017]  cursor-not-allowed`}
                  type="button"
                >
                  {copied ? 'Copied' : 'Copy'}
                </button>{' '}
              </div>
            ) : opportunityDetail?.registrationType === 'WEBSITE_LINK' ? (
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
            ) : opportunityDetail?.registrationType === 'SHOW_UP' ? (
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <h4 className="text-base text-[#24181B] font-medium">
                    Ready to make a difference?
                  </h4>
                  <p className="text-base text-[#24181B80] mb-1">
                    Join us at our location and help make the world a better
                    place!
                  </p>
                </div>
              </div>
            ) : successfullContent ? (
              opportunityDetail?.virtualLocationLink ? (
                <div className={`flex flex-col gap-5 `}>
                  <div className="flex flex-col gap-1">
                    <div>
                      <h3 className="text-base text-[#24181B] font-medium m-0 leading-[28px]">
                        You are now registered for this event!
                      </h3>
                    </div>
                    <p className="text-base text-[#24181B] mb-2">
                      If you can&apos;t attend, email us at
                      <Link className="text-[#E60054] hover:underline" href="#">
                        {' '}
                        {SUPPORT_EMAIL}.{' '}
                      </Link>
                      so we can offer your spot to another eager volunteer.
                    </p>
                    <p className="text-base text-[#24181B]">
                      Let&apos;s make it a memorable and impactful day together!
                    </p>
                    <div className="flex justify-between items-center">
                      <p>{opportunityDetail?.virtualLocationLink}</p>
                      <button
                        disabled={copied}
                        onClick={handleCopyLink}
                        className={` text-base h-[60px] px-4 py-3 inline-flex justify-center items-center border border-[#ff000040] bg-inherit rounded-2xl font-medium text-[#E60054] hover:bg-[#ff000017] ${copied ? ' cursor-not-allowed' : ''}`}
                        type="button"
                      >
                        {copied ? 'Copied' : 'Copy'}
                      </button>{' '}
                    </div>
                  </div>
                </div>
              ) : (
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
                      If, for any reason, you are unable to attend, kindly send
                      an email to
                      <Link className="text-[#E60054] hover:underline" href="#">
                        {' '}
                        {SUPPORT_EMAIL}.{' '}
                      </Link>
                      This will allow us to open up your spot to another eager
                      volunteer.
                    </p>
                    <p className="text-base text-[#24181B]">
                      Let&apos;s make it a memorable and impactful day together!
                    </p>
                  </div>
                </div>
              )
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
                ) : opportunityDetail?.createdBy ? (
                  <button
                    disabled={
                      cookies?.userDetails
                        ? cookies?.userDetails?.id ===
                            opportunityDetail?.createdBy ||
                          opportunityDetail?.createdBy === userOrgDetails.id ||
                          opportunityDetail?.alreadyJoined
                        : false
                    }
                    onClick={handleJoin}
                    className={`text-base  w-full h-[58px] px-4 py-3 flex justify-center items-center bg-[#E60054] rounded-[20px] font-medium text-white hover:bg-[#C20038] ${isCreatedByUserOrOrg && 'cursor-not-allowed'}`}
                  >
                    {opportunityDetail?.alreadyJoined
                      ? 'Already Joined'
                      : 'Join the event'}
                  </button>
                ) : null}
              </div>
            )}
          </div>
        </div>

        <Image
          className="absolute left-0 bottom-0 h-[120px] lg:h-[229px] !w-auto"
          src={opportunityDetail?.virtualLocationLink ? virutalLeft : leftSHape}
          alt=""
        ></Image>
        <Image
          className="absolute right-0 bottom-0 h-[120px] lg:h-[229px] !w-auto"
          src={
            opportunityDetail?.virtualLocationLink ? virutalRight : RightSHape
          }
          alt=""
        ></Image>
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
          heading={'Update Event'}
          showModal={showEditModal}
          setShowModal={setShowEditModal}
          setStepValidationShouldCheck={setStepValidationShouldCheck}
        >
          {step === '1' ? (
            <CreateEventStep1
              stepValidationShouldCheck={stepValidationShouldCheck}
              setStepValidationShouldCheck={setStepValidationShouldCheck}
            />
          ) : step === '2' ? (
            <CreateEventStep2
              stepValidationShouldCheck={stepValidationShouldCheck}
              setStepValidationShouldCheck={setStepValidationShouldCheck}
            />
          ) : step === '3' ? (
            <CreateEventStep3
              stepValidationShouldCheck={stepValidationShouldCheck}
              setStepValidationShouldCheck={setStepValidationShouldCheck}
            />
          ) : step === '4' ? (
            <CreateEventStep4 setThankYouModal={setUpdateSuccess} />
          ) : null}
        </CreateEventModal>
      )}
    </div>
  );
};

export default OpportunitiesDetail;
