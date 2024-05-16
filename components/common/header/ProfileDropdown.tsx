'use client';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import check from '../../../public/images/check-circle.svg';
import Image from 'next/image';
import { logOut } from '@/services/userService';

export default function ProfileDropdown() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-full bg-[#BAA388] min-w-10 w-10 h-10 items-center text-base font-medium ">
          A
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right !rounded-xl border !border-[#E6E3D6] !ring-0 bg-white !shadow-none">
          <div className="p-1.5 flex flex-col gap-0.5">
            <Menu.Item>
              <Link
                href="#"
                className="flex items-center gap-2 text-base px-3	py-[7px] hover:bg-[#F5F3EF] rounded-lg"
              >
                <div className="w-5 h-5 rounded-full bg-[#BAA388] flex justify-center items-center text-xs">
                  A
                </div>{' '}
                Anna Smith
                <div className="ml-auto">
                  <Image src={check} alt="check" />
                </div>
              </Link>
            </Menu.Item>

            <Menu.Item>
              <Link
                href="#"
                className="flex items-center gap-2 text-base px-3	py-[7px] hover:bg-[#F5F3EF] rounded-lg mb-1"
              >
                <div className="w-5 h-5 rounded-full bg-[#88AEBA] flex justify-center items-center text-xs">
                  H
                </div>{' '}
                Harmony
              </Link>
            </Menu.Item>
            <hr className="border-[#E6E3D6] realtive -left-[1.5px] -right-[1.5px]"></hr>
            <Menu.Item>
              <Link
                href="#"
                className="flex items-center gap-2 text-base px-3	py-[7px] hover:bg-[#F5F3EF] rounded-lg"
              >
                Events & Activity
              </Link>
            </Menu.Item>

            <Menu.Item>
              <Link
                href="#"
                className="flex items-center gap-2 text-base px-3	py-[7px] hover:bg-[#F5F3EF] rounded-lg"
              >
                Wishlist
              </Link>
            </Menu.Item>
            <hr className="border-[#E6E3D6]  relative -left-[1.5px] -right-[1.5px]"></hr>

            <Menu.Item>
              <Link
                href="#"
                className="flex items-center gap-2 text-base px-3	py-[7px] hover:bg-[#F5F3EF] rounded-lg"
              >
                Account settings
              </Link>
            </Menu.Item>

            <Menu.Item>
              <button
                className="flex items-center gap-2 text-base px-3	py-[7px] hover:bg-[#F5F3EF] rounded-lg"
                onClick={logOut}
              >
                Log out
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
