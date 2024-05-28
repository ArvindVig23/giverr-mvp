import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const OpportunityTypeSkeleton = () => {
  return (
    <div>
      <div
        className={`group border rounded-md gap-[5px] px-3 py-2 inline-flex items-center justify-center cursor-pointer hover:border-[#E60054] hover:text-[#E60054] text-[#E60054]`}
      >
        <Skeleton className="w-6 h-6 rounded-full" />
        <Skeleton width={150} />
      </div>
    </div>
  );
};

export default OpportunityTypeSkeleton;
