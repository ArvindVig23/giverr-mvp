import { FIRESTORE_IMG_BASE_START_URL } from '@/constants/constants';
import { encodeUrl } from '@/services/frontend/commonServices';
import { getInitialOfEmail } from '@/services/frontend/userService';
import Image from 'next/image';
import React from 'react';

const DisplayMemberItem = ({ orgMember }: any) => {
  return (
    <div className="inline-flex gap-4 items-center">
      <div className="w-11 min-w-11 h-11 flex items-center justify-center font-medium overflow-hidden rounded-full bg-[#88AEBA] text-[#24181B]">
        {orgMember.orgDetails.avatarLink ? (
          <Image
            width={20}
            height={20}
            src={`${FIRESTORE_IMG_BASE_START_URL}${encodeUrl(orgMember.orgDetails.avatarLink)}`}
            alt="profile"
            className="w-full h-full object-cover"
          />
        ) : (
          getInitialOfEmail(orgMember.orgDetails.name)
        )}
      </div>
      <div>
        <span className="text-[#24181B] w-full font-medium">
          {orgMember.orgDetails.name}
        </span>
      </div>
    </div>
  );
};

export default DisplayMemberItem;
