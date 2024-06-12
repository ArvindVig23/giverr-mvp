import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
function OrganizationPageSkeleton() {
  return (
    <div className="border-b border-[#E6E3D6] rounded-xl animate-pulse">
      <div className="flex flex-wrap p-5 w-full bg-[#EAE7DC] rounded-xl rounded-b-none border-0">
        <div className="w-full flex flex-wrap gap-5">
          <div className="flex-1 flex gap-4 items-center">
            <div className="w-11 h-11 overflow-hidden rounded-full">
              <Skeleton circle={true} width={44} height={44} />
            </div>
            <div className="flex flex-col justify-center">
              <Skeleton width={120} height={20} />
              <Skeleton width={80} height={16} />
            </div>
            <Skeleton width={70} height={30} />
          </div>
          <Skeleton width={20} height={20} />
        </div>
      </div>
    </div>
  );
}

export default OrganizationPageSkeleton;
