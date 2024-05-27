import Link from 'next/link';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CardSkeleton = () => {
  return (
    <div key={0} className="relative group">
      <div className="flex justify-between items-center gap-2 absolute left-2.5 right-2.5 top-2.5">
        <Skeleton circle width={4} height={4} /> Pre-Entry
        <Skeleton className="w-8 h-8 rounded-full" />{' '}
      </div>
      <Link
        href="#"
        className="bg-white border border-white overflow-hidden rounded-[14px] group-hover:border-[#E6E3D6] group-hover:bg-inherit inline-block w-full"
      >
        <div className="overflow-hidden rounded-[14px]">
          <Skeleton height={220} />
        </div>
        <div className="flex flex-col p-5">
          <Skeleton height={20} />
          <Skeleton height={16} />
          <Skeleton height={16} />
          <div className="flex items-center mt-5 gap-2">
            <Skeleton circle width={40} height={40} /> <Skeleton width={100} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardSkeleton;
