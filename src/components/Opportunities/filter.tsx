'use client';
import { useState, useEffect, useRef } from 'react'; // Import useState, useEffect, and useRef
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Image from next/image
import filtericon from '/public/images/filter.svg';
import check from '/public/images/check.svg';

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false); // State to track menu open/close
  const [isButtonClicked, setIsButtonClicked] = useState(false); // State to track filter button click
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref to store reference to dropdown

  useEffect(() => {
    // Function to handle click outside dropdown
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close dropdown if clicked outside
        setIsButtonClicked(false); // Reset button click state
      }
    }

    // Add event listener when component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Menu
      as="div"
      className="relative inline-block text-left"
      ref={dropdownRef}
    >
      <div>
        {/* Custom button to toggle menu */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setIsButtonClicked(true); // Set button click state to true
          }}
          className={`inline-flex w-full justify-center gap-x-1.5 items-center text-base font-medium px-2.5 py-1 rounded-[10px] hover:bg-[#EDEBE3] group ${isButtonClicked ? 'bg-[#EDEBE3]' : ''}`}
        >
          <Image src={filtericon} alt="filtericon" />
          Filters
        </button>
      </div>

      {/* Menu transition */}
      <Transition
        show={isOpen} // Show menu when isOpen is true
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        {/* Menu items */}
        <Menu.Items className="absolute right-0 z-10 mt-2 min-w-64 w-64 origin-top-right !rounded-xl border !border-[#E6E3D6] !ring-0 bg-white !shadow-none">
          <div className="flex flex-col">
            <Menu.Item>
              <Link
                href="#"
                className="flex items-center gap-2 justify-between p-4"
              >
                <span className="text-[#1E1E1E80]">Filter by</span>

                <button className="border border-[#E6E3D6] py-[5px] px-3 rounded-xl hover:bg-[#EDEBE3] text-base">
                  Reset filters
                </button>
              </Link>
            </Menu.Item>
            <hr className="border-[#E6E3D6]"></hr>
            <Menu.Item>
              <div className="p-1">
                <div className="flex items-center gap-2 text-base hover:bg-[#F5F3EF] rounded-lg mb-1">
                  <div className="inline-flex items-center w-full">
                    <label
                      className="relative flex items-center rounded-full cursor-pointer w-full gap-2 px-3 py-[7px]"
                      htmlFor="check"
                    >
                      <input
                        type="checkbox"
                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-[#E6E3D6] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#E60054] checked:bg-[#E60054] checked:before:bg-gray-900 "
                        id="check"
                      />
                      <span className="absolute left-[22px] text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                        <Image src={check} alt="check" />
                      </span>
                      <span className="mt-px font-light text-gray-700 cursor-pointer select-none">
                        Walk-In
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-base hover:bg-[#F5F3EF] rounded-lg mb-1">
                  <div className="inline-flex items-center w-full">
                    <label
                      className="relative flex items-center rounded-full cursor-pointer w-full gap-2 px-3 py-[7px]"
                      htmlFor="check3"
                    >
                      <input
                        type="checkbox"
                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-[#E6E3D6] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#E60054] checked:bg-[#E60054] checked:before:bg-gray-900 "
                        id="check3"
                      />
                      <span className="absolute left-[22px] text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                        <Image src={check} alt="check3" />
                      </span>
                      <span className="mt-px font-light text-gray-700 cursor-pointer select-none">
                        Pre-Entry
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-base hover:bg-[#F5F3EF] rounded-lg mb-1">
                  <div className="inline-flex items-center w-full">
                    <label
                      className="relative flex items-center rounded-full cursor-pointer w-full gap-2 px-3 py-[7px]"
                      htmlFor="check2"
                    >
                      <input
                        type="checkbox"
                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-[#E6E3D6] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#E60054] checked:bg-[#E60054] checked:before:bg-gray-900 "
                        id="check2"
                      />
                      <span className="absolute left-[22px] text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                        <Image src={check} alt="check2" />
                      </span>
                      <span className="mt-px font-light text-gray-700 cursor-pointer select-none">
                        By organization
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-base hover:bg-[#F5F3EF] rounded-lg mb-1">
                  <div className="inline-flex items-center w-full">
                    <label
                      className="relative flex items-center rounded-full cursor-pointer w-full gap-2 px-3 py-[7px]"
                      htmlFor="check1"
                    >
                      <input
                        type="checkbox"
                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-[#E6E3D6] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#E60054] checked:bg-[#E60054] checked:before:bg-gray-900 "
                        id="check1"
                      />
                      <span className="absolute left-[22px] text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                        <Image src={check} alt="check1" />
                      </span>
                      <span className="mt-px font-light text-gray-700 cursor-pointer select-none">
                        By user
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
