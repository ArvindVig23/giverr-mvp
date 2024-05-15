import React from 'react';
import Image from 'next/image'; // Import Image from next/image
import dummy from '../../public/images/dummy.jpg';

const Organizations: React.FC = () => {
  return (
    <div className="w-full">
      <h3 className="text-[32px] font-medium mb-2 mt-0 leading-[36px]">
        Organizations
      </h3>
      <p className="m-0 text-[#24181B80]">
        You are a member of the following organizations
      </p>
      <div className="inline-flex w-full items-center gap-4 justify-between mt-5">
        <div className="inline-flex gap-4 items-center">
          <div className="w-11 h-11 flex items-center justify-center font-medium overflow-hidden rounded-full bg-[#88AEBA] text-[#24181B]">
            <Image
              src={dummy}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="text-[#24181B] w-full font-medium">
              Planet Caretakers
            </span>
          </div>
        </div>
      </div>

      <hr className="my-[60px] border-[#E6E3D6]"></hr>

      <div className="flex w-full flex-col gap-5">
        <h4 className="w-full text-[#24181B] text-2xl font-medium">
          Pending invites
        </h4>
        <div className="w-full">
          <div className="flex py-5 items-center gap-3 border-b border-[#E6E3D6]">
            <div className="flex gap-4 items-center">
              <div className="w-11 h-11 flex items-center justify-center font-medium overflow-hidden rounded-full bg-[#88AEBA] text-[#24181B]">
                <Image
                  src={dummy}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-base font-medium">Anna Danielle Smith</div>
            </div>

            <div className="ml-auto flex gap-2 items-center">
              <button
                type="button"
                className="text-base  w-full h-11 px-4 py-3 flex justify-center items-center bg-inherit rounded-xl font-medium text-[#E60054]  border border-[#E6005433] hover:bg-[#E600540D]"
              >
                Ignore
              </button>
              <button
                type="button"
                className="text-base  w-full h-11 px-4 py-3 flex justify-center items-center bg-[#E60054] rounded-xl font-medium text-white hover:bg-[#C20038]"
              >
                Accept
              </button>
            </div>
          </div>

          <div className="flex py-5 items-center gap-3 border-b border-[#E6E3D6]">
            <div className="flex gap-4 items-center">
              <div className="w-11 h-11 flex items-center justify-center font-medium overflow-hidden rounded-full bg-[#88AEBA] text-[#24181B]">
                <Image
                  src={dummy}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-base font-medium">Anna Danielle Smith</div>
            </div>

            <div className="ml-auto flex gap-2 items-center">
              <button
                type="button"
                className="text-base  w-full h-11 px-4 py-3 flex justify-center items-center bg-inherit rounded-xl font-medium text-[#E60054]  border border-[#E6005433] hover:bg-[#E600540D]"
              >
                Ignore
              </button>
              <button
                type="button"
                className="text-base  w-full h-11 px-4 py-3 flex justify-center items-center bg-[#E60054] rounded-xl font-medium text-white hover:bg-[#C20038]"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* No organization section Start */}

      {/* <div className="flex w-full justify-between gap-3 items-center">
        <div>
          <span className="text-[#24181B] text-base">No organizations</span>
          <p className="text-[#24181B80] text-base m-0">You are the owner.</p>
        </div>

      </div> */}
      {/* No organization section end */}
    </div>
  );
};

export default Organizations;
