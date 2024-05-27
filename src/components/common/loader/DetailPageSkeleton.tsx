import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const DetailPageSkeleton = () => {
  return (
    <div className="relative border-t border-[#E6E3D6]">
      <div className="p-5 w-full relative pb-24">
        <div className="w-full max-w-[652px] m-auto">
          <div className="w-full bg-white rounded-3xl relative overflow-hidden">
            <div className="flex justify-between items-center gap-2 absolute left-5 right-5 top-5">
              <div className="text-sm font-medium inline-flex py-[5px] px-3 gap-[5px] border border-[#FFFFFF80] bg-[#FFFFFFE5] rounded-full items-center">
                <Skeleton circle={true} width={10} height={10} />
                <span>Pre-Entry</span>
              </div>
              <Skeleton width={80} height={30} />
            </div>
            <div className="realtive rounded-3xl">
              <Skeleton width={652} height={408} />
            </div>

            <div className="p-5">
              <div className="flex gap-2.5 flex-wrap mb-5">
                <Skeleton height={40} />

                <div className="flex gap-2 items-center">
                  <Skeleton circle={true} width={40} height={40} />
                  <Skeleton width={100} height={20} />
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-8">
                <div className="">
                  <Skeleton height={20} />
                  <Skeleton count={2} />
                </div>

                <div>
                  <Skeleton height={20} />
                  <Skeleton count={4} />
                </div>

                <div>
                  <Skeleton height={20} />
                  <Skeleton count={4} />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full bg-white rounded-3xl relative overflow-hidden mt-10 p-5 ">
            <Skeleton height={20} />
            <div className="flex flex-col gap-2.5">
              <div className="flex gap-1 text-base text-[#24181B]">
                <Skeleton circle={true} width={20} height={20} />
                <Skeleton width={100} height={15} />
              </div>

              <div className="flex gap-1 text-base text-[#24181B]">
                <Skeleton circle={true} width={20} height={20} />
                <Skeleton width={150} height={15} />
              </div>

              <div className="flex gap-1 text-base text-[#24181B]">
                <Skeleton circle={true} width={20} height={20} />
                <Skeleton width={200} height={15} />
              </div>
            </div>

            <div className="w-full rounded-xl overflow-hidden my-10">
              <Skeleton width="100%" height={450} />
            </div>

            <Skeleton height={100} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPageSkeleton;
