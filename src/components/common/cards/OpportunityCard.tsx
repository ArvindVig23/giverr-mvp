import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import heart from '/public/images/heart.svg';
import stateFill from '/public/images/state=filled.svg';
// import dummy from '/public/images/dummy.jpg';
import thumb from '/public/images/thumb.jpg';
import { OpportunityCardProps } from '@/interface/opportunity';
import {
  encodeUrl,
  getFormattedLocalTime,
} from '@/services/frontend/commonServices';
import { FIRESTORE_IMG_BASE_START_URL } from '@/constants/constants';
import { Tooltip } from '@material-tailwind/react';
import { useCookies } from 'react-cookie';

const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  addRemoveWishlist,
}: any) => {
  const [cookies] = useCookies();

  // const timeZoneCookie = cookies?.userDetails?.timeZoneSettings;
  const statusIsPending = opportunity.status === 'PENDING';
  const statusIsRejected = opportunity.status === 'REJECTED';

  const userNotFound = !cookies.userToken;
  const sameUserOpp = cookies?.userDetails?.id === opportunity.createdBy;
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
            <span className="bg-[#FFC430] w-2 h-2 rounded-full"></span>{' '}
            Pre-Entry
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
            {getFormattedLocalTime(opportunity.eventDate, cookies)}
          </span>
          <div className="text-[#24181B80] truncate text-base">
            1001 Ocean Drive, Miami Beach, FL 33139
          </div>
          <div className="mt-1 text-[#1E1E1E80]">{opportunity.location}</div>

          {opportunity?.organization?.name && (
            <div className="flex items-center mt-5 gap-2 text-base">
              <div className="w-6 h-6 rounded-full overflow-hidden ">
                <Image
                  src={thumb}
                  className="object-cover w-full h-full"
                  alt="thumbnail"
                />
              </div>
              {opportunity?.organization?.name}
            </div>
          )}
        </div>
      </Link>
    </>
  );
};

export default OpportunityCard;
