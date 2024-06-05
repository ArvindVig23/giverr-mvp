import React from 'react';
import lightSearch from '/public/images/search-light.svg';
import more from '/public/images/more.svg';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import Image from 'next/image';
const Members = () => {
  return (
    <div className="flex w-full flex-col gap-5">
      <h4 className="w-full text-[#24181B] text-2xl font-medium">Members</h4>
      <div className="flex gap-5">
        <div className="relative flex-1">
          <input
            type="text"
            className="w-full h-11 bg-[#EDEBE3] border border-[#E6E3D6] rounded-xl focus:outline-none px-10"
            placeholder="Search Members"
          ></input>
          <Image
            className="absolute top-3 left-3 pointer-events-none"
            src={lightSearch}
            alt="search"
          />
        </div>

        <button className="text-base h-11 px-4 py-3 inline-flex justify-center items-center bg-[#E60054] rounded-xl font-medium text-white hover:bg-[#C20038]">
          Invite members
        </button>
      </div>

      <div className="w-full">
        <div className="flex py-3 items-center gap-3 border-b border-[#E6E3D6]">
          <div className="flex gap-2.5 items-center">
            <div className="w-8 h-8 flex items-center justify-center font-medium overflow-hidden rounded-full text-xs bg-[#BAA388] text-[#24181B]">
              A
            </div>

            <div className="text-base">Anna Danielle Smith</div>
            <span className="text-[#24181B80]">@anna.smith</span>
          </div>

          <div className="ml-auto flex gap-2 items-center">
            <span className="inline-flex  text-[#24181B80] border border-[#E6E3D6] py-1 px-2 text-sm gap-2.5 rounded-full">
              Owner
            </span>
          </div>
        </div>

        <div className="flex py-3 items-center gap-3 border-b border-[#E6E3D6]">
          <div className="flex gap-2.5 items-center">
            <div className="w-8 h-8 flex items-center justify-center font-medium overflow-hidden text-xs rounded-full bg-[#D3D496] text-[#24181B]">
              T
            </div>

            <div className="text-base">Terry Gouse Bator</div>
            <span className="text-[#24181B80]">@terry.bator</span>
          </div>

          <div className="ml-auto flex gap-2 items-center">
            <span className="inline-flex  text-[#24181B80] border border-[#E6E3D6] py-1 px-2 text-sm gap-2.5 rounded-full">
              Owner
            </span>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center gap-x-1.5 rounded-[10px] hover:bg-[#1E1E1E1A] min-w-[30px] w-[30px] h-[30px] items-center text-base font-medium ">
                  <Image src={more} alt="more" />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right !rounded-xl border !border-[#E6E3D6] !ring-0 bg-white !shadow-none">
                  <div className="p-1.5 flex flex-col gap-0.5">
                    <Menu.Item>
                      <Link
                        href="#"
                        className="flex items-center gap-2 text-base px-3	py-[7px] hover:bg-[#F5F3EF] rounded-lg"
                      >
                        Edit
                      </Link>
                    </Menu.Item>

                    <Menu.Item>
                      <Link
                        href="#"
                        className="flex items-center gap-2 text-base px-3	py-[7px] hover:bg-[#F5F3EF] rounded-lg"
                      >
                        Remove
                      </Link>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>

        <div className="flex py-3 items-center gap-3 border-b border-[#E6E3D6]">
          <div className="flex gap-2.5 items-center">
            <div className="w-8 h-8 flex items-center justify-center font-medium overflow-hidden text-xs rounded-full bg-[#D3D496] text-[#24181B]">
              T
            </div>

            <div className="text-base">Terry Gouse Bator</div>
            <span className="text-[#24181B80]">@terry.bator</span>
          </div>

          <div className="ml-auto flex gap-2 items-center">
            <span className="inline-flex  text-[#24181B80] border border-[#E6E3D6] py-1 px-2 text-sm gap-2.5 rounded-full">
              Owner
            </span>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center gap-x-1.5 rounded-[10px] hover:bg-[#1E1E1E1A] min-w-[30px] w-[30px] h-[30px] items-center text-base font-medium ">
                  <Image src={more} alt="more" />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right !rounded-xl border !border-[#E6E3D6] !ring-0 bg-white !shadow-none">
                  <div className="p-1.5 flex flex-col gap-0.5">
                    <Menu.Item>
                      <Link
                        href="#"
                        className="flex items-center gap-2 text-base px-3	py-[7px] hover:bg-[#F5F3EF] rounded-lg"
                      >
                        Edit
                      </Link>
                    </Menu.Item>

                    <Menu.Item>
                      <Link
                        href="#"
                        className="flex items-center gap-2 text-base px-3	py-[7px] hover:bg-[#F5F3EF] rounded-lg"
                      >
                        Remove
                      </Link>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>

        <div className="flex py-3 items-center gap-3 border-b border-[#E6E3D6]">
          <div className="flex gap-2.5 items-center opacity-50">
            <div className="w-8 h-8 flex items-center justify-center font-medium overflow-hidden text-xs rounded-full bg-[#D3D496] text-[#24181B]">
              T
            </div>

            <div className="text-base">Terry Gouse Bator</div>
            <span className="text-[#24181B80]">@terry.bator</span>
          </div>

          <div className="ml-auto flex gap-2 items-center">
            <span className="inline-flex  text-[#02088B] border border-[#D5D7FD] bg-[#D5D7FD] py-1 px-2 text-sm gap-2.5 rounded-full">
              Invite pending
            </span>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center gap-x-1.5 rounded-[10px] hover:bg-[#1E1E1E1A] min-w-[30px] w-[30px] h-[30px] items-center text-base font-medium ">
                  <Image src={more} alt="more" />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right !rounded-xl border !border-[#E6E3D6] !ring-0 bg-white !shadow-none">
                  <div className="p-1.5 flex flex-col gap-0.5">
                    <Menu.Item>
                      <Link
                        href="#"
                        className="flex items-center gap-2 text-base px-3	py-[7px] hover:bg-[#F5F3EF] rounded-lg"
                      >
                        Resend invite
                      </Link>
                    </Menu.Item>

                    <Menu.Item>
                      <Link
                        href="#"
                        className="flex items-center gap-2 text-base px-3	py-[7px] hover:bg-[#F5F3EF] rounded-lg"
                      >
                        Copy invite link
                      </Link>
                    </Menu.Item>

                    <Menu.Item>
                      <Link
                        href="#"
                        className="flex items-center gap-2 text-base px-3	py-[7px] hover:bg-[#F5F3EF] rounded-lg text-[#F93742]"
                      >
                        Revoke invite
                      </Link>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;
