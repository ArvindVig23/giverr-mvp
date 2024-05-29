import React, { useState } from 'react';
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

const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
}: any) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };
  const statusIsPending = opportunity.status === 'PENDING';
  const statusIsRejected = opportunity.status === 'REJECTED';
  return (
    <>
      <div className="flex justify-between items-center gap-2 absolute left-2.5 right-2.5 top-2.5">
        {statusIsPending || statusIsRejected ? (
          <div className="text-sm font-medium inline-flex py-[5px] px-3 gap-[5px] border border-[#D5D7FD80] bg-[#D5D7FDE5] text-[#02088B] rounded-full items-center">
            {statusIsRejected ? 'Rejected' : 'Approval pending'}
          </div>
        ) : (
          <div className="text-sm font-medium inline-flex py-[5px] px-3 gap-[5px] border border-[#FFFFFF80] bg-[#FFFFFFE5] rounded-full items-center">
            <span className="bg-[#FFC430] w-2 h-2 rounded-full"></span>{' '}
            Pre-Entry
          </div>
        )}
        <div className="relative cursor-pointer" onClick={handleClick}>
          <Image src={isActive ? stateFill : heart} alt="heart" />
        </div>
      </div>

      <Link
        href={`/opportunity/${opportunity.id}`}
        className="bg-white border border-white overflow-hidden rounded-[14px] group-hover:border-[#E6E3D6] group-hover:bg-inherit inline-block w-full"
      >
        <div className="overflow-hidden rounded-[14px] h-[198px]">
          {opportunity?.imageLink && (
            <Image
              className="w-full h-full object-cover rounded-[14px]"
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
              <h4 className="font-medium text-base overflow-hidden text-ellipsis whitespace-nowrap">
                {opportunity.name.slice(0, 30)}{' '}
                {opportunity.name.length > 30 && '...'}
              </h4>
            </Tooltip>
          ) : (
            <h4 className="font-medium text-base overflow-hidden text-ellipsis whitespace-nowrap">
              {opportunity.name}
            </h4>
          )}
          <span className="text-base">
            {getFormattedLocalTime(opportunity.eventDate)}
          </span>
          <div className="mt-1 text-[#1E1E1E80]">{opportunity.location}</div>

          {opportunity?.organization?.name && (
            <div className="flex items-center mt-5 gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden ">
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
