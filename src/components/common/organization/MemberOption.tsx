import React from 'react';

const MemberOption = ({ member }: any) => {
  console.log(member, 'member');

  return (
    <div className="w-full">
      <div className="flex py-3 items-center gap-3 border-b border-[#E6E3D6]">
        <div className="flex gap-2.5 items-center">
          <div className="w-8 h-8 flex items-center justify-center font-medium overflow-hidden rounded-full text-xs bg-[#BAA388] text-[#24181B]">
            A
          </div>

          <div className="text-base">
            {member.fullName ? member.fullName : member.email}
          </div>
          <span className="text-[#24181B80]">@{member.username}</span>
        </div>

        <div className="ml-auto flex gap-2 items-center">
          <span className="inline-flex  text-[#24181B80] border border-[#E6E3D6] py-1 px-2 text-sm gap-2.5 rounded-full">
            Owner
          </span>
        </div>
      </div>
    </div>
  );
};

export default MemberOption;
