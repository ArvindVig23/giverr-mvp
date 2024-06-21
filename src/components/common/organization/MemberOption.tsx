import { FIRESTORE_IMG_BASE_START_URL } from '@/constants/constants';
import { encodeUrl } from '@/services/frontend/commonServices';
import { getInitialOfEmail } from '@/services/frontend/userService';
import Image from 'next/image';
import React from 'react';

const MemberOption = ({ member }: any) => {
  return (
    <div className="flex gap-2.5 items-center w-2/4		 md:w-full">
      <div className="w-8 h-8 min-w-8 flex items-center justify-center font-medium overflow-hidden rounded-full text-xs bg-[#BAA388] text-[#24181B]">
        {member.profileUrl ? (
          <Image
            width={40}
            height={40}
            src={`${FIRESTORE_IMG_BASE_START_URL}${encodeUrl(member.profileUrl)}`}
            alt="profile"
            className="w-full h-full object-cover"
          />
        ) : (
          getInitialOfEmail(member.fullName ? member.fullName : member.email)
        )}
      </div>

      <div className="text-base truncate ">
        {member.fullName ? member.fullName : member.email}
      </div>
      {member.username ? (
        <span className="text-[#24181B80] md:block hidden">
          @{member.username}
        </span>
      ) : null}
    </div>
  );
};

export default MemberOption;
