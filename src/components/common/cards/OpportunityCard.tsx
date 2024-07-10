import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import heart from '/public/images/heart.svg';
import stateFill from '/public/images/state=filled.svg';
import { OpportunityCardProps } from '@/interface/opportunity';
import {
  encodeUrl,
  eventCardDateTime,
  pickColor,
} from '@/services/frontend/commonServices';
import { FIRESTORE_IMG_BASE_START_URL } from '@/constants/constants';
import { Tooltip } from '@material-tailwind/react';
import { useCookies } from 'react-cookie';
import { usePathname, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { getInitialOfEmail } from '@/services/frontend/userService';
const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  addRemoveWishlist,
}: any) => {
  const searchParams = useSearchParams();
  const eventsTab = searchParams.get('events');
  const [cookies] = useCookies();
  const pathname = usePathname();
  const displayVolunteerName = (name: string) => {
    return name[0].toUpperCase();
  };
  // const timeZoneCookie = cookies?.userDetails?.timeZoneSettings;
  const statusIsPending = opportunity.status === 'PENDING';
  const statusIsRejected = opportunity.status === 'REJECTED';

  const userNotFound = !cookies.userToken;
  const organizationDetails = useSelector((state: any) => state.userOrgReducer);
  const sameUserOpp =
    cookies?.userDetails?.id === opportunity.createdBy ||
    opportunity?.createdBy === organizationDetails?.id;
  return (
    <>
      <div className="flex justify-between items-center gap-2 absolute left-2.5 right-2.5 top-2.5 ">
        {statusIsPending || statusIsRejected ? (
          <div
            className={`text-sm font-medium inline-flex py-[5px] px-3 gap-[5px] border border-[#D5D7FD80]  rounded-full items-center ${statusIsRejected ? 'bg-[#ff0000bf] text-[#fff]' : 'bg-[#D5D7FDE5] text-[#02088B]'}`}
          >
            {statusIsRejected ? 'Rejected' : 'Approval pending'}
          </div>
        ) : (
          <div className="text-sm font-medium inline-flex py-[5px] px-3 gap-[5px] border border-[#FFFFFF80] bg-[#FFFFFFE5] rounded-full items-center">
            <span
              className={`${opportunity?.registrationType === 'SHOW_UP' ? 'bg-[#0B9EDE]' : 'bg-[#FFC430]'} w-2 h-2 rounded-full`}
            ></span>{' '}
            {opportunity?.registrationType === 'SHOW_UP'
              ? 'Show Up'
              : 'Pre-Entry'}
          </div>
        )}
        {!statusIsPending && !statusIsRejected ? (
          userNotFound || sameUserOpp ? (
            <Tooltip
              content={
                userNotFound
                  ? 'Log in to update wishlist.'
                  : 'You can not add your opportunity in wishlist '
              }
            >
              <div className="relative cursor-not-allowed">
                <Image src={heart} alt="heart" />
              </div>
            </Tooltip>
          ) : (
            <div
              className="relative cursor-pointer"
              onClick={() => addRemoveWishlist(opportunity.id)}
            >
              <Image
                src={opportunity?.isWishlist ? stateFill : heart}
                alt="heart"
              />
            </div>
          )
        ) : null}
      </div>
      <Link
        href={`/opportunity/${opportunity.id}`}
        className="bg-white border border-white overflow-hidden rounded-2xl group-hover:border-[#E6E3D6] group-hover:bg-white inline-block w-full h-full card-shadow"
      >
        <div className="overflow-hidden rounded-2xl h-[198px]">
          {opportunity?.imageLink && (
            <Image
              className="w-full h-full object-cover rounded-2xl"
              width={652}
              height={408}
              src={`${FIRESTORE_IMG_BASE_START_URL}${encodeUrl(opportunity.imageLink)}`}
              alt="dummy"
            />
          )}
        </div>
        <div className="flex flex-col p-5">
          {opportunity.name.length > 30 ? (
            <Tooltip content={opportunity.name}>
              <h4 className="font-medium text-lg overflow-hidden text-ellipsis whitespace-nowrap text-[#24181B]">
                {opportunity.name.slice(0, 30)}{' '}
                {opportunity.name.length > 30 && '...'}
              </h4>
            </Tooltip>
          ) : (
            <h4 className="font-medium text-lg overflow-hidden text-ellipsis whitespace-nowrap text-[#24181B]">
              {opportunity.name}
            </h4>
          )}
          <span className="text-base">
            {eventCardDateTime(
              opportunity.commitment[0].selectedDate,
              opportunity.commitment[0].startTime,
              cookies,
            )}
          </span>
          <div className="text-[#24181B80] truncate text-base">
            {opportunity?.location.length
              ? opportunity?.location[0]?.address
              : ''}
          </div>

          {opportunity?.organization?.name && (
            <div className="flex items-center mt-5 gap-2 text-base">
              <div
                className={`w-6 h-6 rounded-full overflow-hidden ${pickColor()} flex justify-center items-center text-xs overflow-hidden`}
              >
                {opportunity?.organization?.avatarLink ? (
                  <Image
                    width={40}
                    height={40}
                    src={`${FIRESTORE_IMG_BASE_START_URL}${encodeUrl(opportunity?.organization?.avatarLink)}`}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  getInitialOfEmail(
                    opportunity?.organization?.name
                      ? opportunity?.organization?.name
                      : 'O',
                  )
                )}
              </div>
              {opportunity?.organization?.name.length > 22 ? (
                <Tooltip
                  className="absolute left-0 w-64 min-w-[250px] p-2 text-sm text-white bg-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  content={opportunity?.organization?.name}
                >
                  {opportunity?.organization?.name.slice(0, 22) + '...'}
                </Tooltip>
              ) : (
                opportunity?.organization?.name
              )}
            </div>
          )}
          {pathname == '/activity' && eventsTab ? (
            <div className="flex gap-2 items-center text-base text-[#24181B]">
              <div className="flex gap-2">
                <div className="flex">
                  {opportunity?.volunteers?.length > 0 &&
                    opportunity.volunteers.map((vol: any, index: number) => (
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
                    ))}
                </div>
                {opportunity.volunteers.length}/{opportunity.spots} volunteers
              </div>
            </div>
          ) : null}
        </div>
      </Link>
    </>
  );
};

export default OpportunityCard;
