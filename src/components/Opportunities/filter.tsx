'use client';
import { useState } from 'react'; // Import useState, useEffect, and useRef
// import { Menu, Transition } from '@headlessui/react';
// import { Fragment } from 'react';
// import Link from 'next/link';
import Image from 'next/image'; // Import Image from next/image
import filtericon from '/public/images/filter.svg';
import physical from '/public/images/physical.svg';
import virtual from '/public/images/virtual.svg';
import check from '/public/images/check.svg';
import CommonModal from '../common/modal/CommonModal';

export default function ProfileDropdown() {
  const [showModal, setShowModal] = useState(false); // State to track menu open/close
  const [isButtonClicked, setIsButtonClicked] = useState(false); // State to track filter button click

  return (
    // <Menu
    //   as="div"
    //   className="relative inline-block text-left"
    //   ref={dropdownRef}
    // >
    //   <div>
    //     {/* Custom button to toggle menu */}

    //   </div>

    //   {/* Menu transition */}
    //   <Transition
    //     show={isOpen} // Show menu when isOpen is true
    //     as={Fragment}
    //     enter="transition ease-out duration-100"
    //     enterFrom="transform opacity-0 scale-95"
    //     enterTo="transform opacity-100 scale-100"
    //     leave="transition ease-in duration-75"
    //     leaveFrom="transform opacity-100 scale-100"
    //     leaveTo="transform opacity-0 scale-95"
    //   >
    //     {/* Menu items */}
    //     <Menu.Items className="absolute right-0 z-10 mt-2 min-w-64 w-64 origin-top-right !rounded-xl border !border-[#E6E3D6] !ring-0 bg-white !shadow-none">
    //       <div className="flex flex-col">
    //         <Menu.Item>
    //           <Link
    //             href="#"
    //             className="flex items-center gap-2 justify-between p-4"
    //           >
    //             <span className="text-[#1E1E1E80]">Filter by</span>

    //             <button className="border border-[#E6E3D6] py-[5px] px-3 rounded-xl hover:bg-[#EDEBE3] text-base">
    //               Reset filters
    //             </button>
    //           </Link>
    //         </Menu.Item>
    //         <hr className="border-[#E6E3D6]"></hr>
    //         <Menu.Item>
    //           <div className="p-1">
    //             <div className="flex items-center gap-2 text-base hover:bg-[#F5F3EF] rounded-lg mb-1">
    //               <div className="inline-flex items-center w-full">
    //                 <label
    //                   className="relative flex items-center rounded-full cursor-pointer w-full gap-2 px-3 py-[7px]"
    //                   htmlFor="check"
    //                 >
    //                   <input
    //                     type="checkbox"
    //                     className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-[#E6E3D6] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#E60054] checked:bg-[#E60054] checked:before:bg-gray-900 "
    //                     id="check"
    //                   />
    //                   <span className="absolute left-[22px] text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
    //                     <Image src={check} alt="check" />
    //                   </span>
    //                   <span className="mt-px font-light text-gray-700 cursor-pointer select-none">
    //                     Walk-In
    //                   </span>
    //                 </label>
    //               </div>
    //             </div>

    //             <div className="flex items-center gap-2 text-base hover:bg-[#F5F3EF] rounded-lg mb-1">
    //               <div className="inline-flex items-center w-full">
    //                 <label
    //                   className="relative flex items-center rounded-full cursor-pointer w-full gap-2 px-3 py-[7px]"
    //                   htmlFor="check3"
    //                 >
    //                   <input
    //                     type="checkbox"
    //                     className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-[#E6E3D6] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#E60054] checked:bg-[#E60054] checked:before:bg-gray-900 "
    //                     id="check3"
    //                   />
    //                   <span className="absolute left-[22px] text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
    //                     <Image src={check} alt="check3" />
    //                   </span>
    //                   <span className="mt-px font-light text-gray-700 cursor-pointer select-none">
    //                     Pre-Entry
    //                   </span>
    //                 </label>
    //               </div>
    //             </div>

    //             <div className="flex items-center gap-2 text-base hover:bg-[#F5F3EF] rounded-lg mb-1">
    //               <div className="inline-flex items-center w-full">
    //                 <label
    //                   className="relative flex items-center rounded-full cursor-pointer w-full gap-2 px-3 py-[7px]"
    //                   htmlFor="check2"
    //                 >
    //                   <input
    //                     type="checkbox"
    //                     className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-[#E6E3D6] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#E60054] checked:bg-[#E60054] checked:before:bg-gray-900 "
    //                     id="check2"
    //                   />
    //                   <span className="absolute left-[22px] text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
    //                     <Image src={check} alt="check2" />
    //                   </span>
    //                   <span className="mt-px font-light text-gray-700 cursor-pointer select-none">
    //                     By organization
    //                   </span>
    //                 </label>
    //               </div>
    //             </div>

    //             <div className="flex items-center gap-2 text-base hover:bg-[#F5F3EF] rounded-lg mb-1">
    //               <div className="inline-flex items-center w-full">
    //                 <label
    //                   className="relative flex items-center rounded-full cursor-pointer w-full gap-2 px-3 py-[7px]"
    //                   htmlFor="check1"
    //                 >
    //                   <input
    //                     type="checkbox"
    //                     className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-[#E6E3D6] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#E60054] checked:bg-[#E60054] checked:before:bg-gray-900 "
    //                     id="check1"
    //                   />
    //                   <span className="absolute left-[22px] text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
    //                     <Image src={check} alt="check1" />
    //                   </span>
    //                   <span className="mt-px font-light text-gray-700 cursor-pointer select-none">
    //                     By user
    //                   </span>
    //                 </label>
    //               </div>
    //             </div>
    //           </div>
    //         </Menu.Item>
    //       </div>
    //     </Menu.Items>
    //   </Transition>
    // </Menu>
    <div>
      <button
        onClick={() => {
          setShowModal(!showModal);
          setIsButtonClicked(true); // Set button click state to true
        }}
        className={`inline-flex w-full justify-center gap-x-1.5 items-center text-base font-medium px-2.5 py-1 rounded-[10px] hover:bg-[#EDEBE3] group ${isButtonClicked ? 'bg-[#EDEBE3]' : ''}`}
      >
        <Image src={filtericon} alt="filtericon" />
        Filters
      </button>
      {showModal && (
        <CommonModal
          heading={'Filters'}
          subHeading={'Send Invite to'}
          showModal={showModal}
          setShowModal={setShowModal}
        >
          <div>
            <div className="flex gap-[60px] w-full py-5 flex-col relative px-5 max-h-modal overflow-auto">
              <div className="w-full flex flex-col gap-5">
                <h4 className="text-[#24181B] text-2xl font-medium">
                  Event Details
                </h4>

                <label
                  className="relative flex items-center rounded-full cursor-pointer w-full gap-2"
                  htmlFor="check"
                >
                  <input
                    type="checkbox"
                    className="before:content[''] bg-white peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-[#E6E3D6] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#E60054] checked:bg-[#E60054] checked:before:bg-gray-900 before:w-5 before:h-5"
                    id="check"
                  />
                  <span className="absolute left-[11px] text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                    <Image src={check} alt="check" />
                  </span>
                  <span className="mt-px font-light text-[#24181B] cursor-pointer select-none">
                    Show up
                  </span>
                </label>

                <label
                  className="relative flex items-center rounded-full cursor-pointer w-full gap-2"
                  htmlFor="check1"
                >
                  <input
                    type="checkbox"
                    className="before:content[''] bg-white peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-[#E6E3D6] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#E60054] checked:bg-[#E60054] checked:before:bg-gray-900 before:w-5 before:h-5"
                    id="check1"
                  />
                  <span className="absolute left-[11px] text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                    <Image src={check} alt="check1" />
                  </span>
                  <span className="mt-px font-light text-[#24181B] cursor-pointer select-none">
                    Pre-Entry
                  </span>
                </label>
              </div>

              <div className="w-full flex flex-col gap-5">
                <h4 className="text-[#24181B] text-2xl font-medium">Date</h4>
                <div className="relative w-full">
                  <input
                    id="name"
                    className="block rounded-xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                    placeholder=" "
                    type="text"
                    name="name"
                  />
                  <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                    Select Date
                  </label>
                </div>
              </div>

              <div className="w-full flex flex-col gap-5">
                <h4 className="text-[#24181B] text-2xl font-medium">
                  Location
                </h4>

                <div className="flex flex-wrap gap-5">
                  <div className="w-40 p-4 rounded-md border border-[#E6E3D6]  h-[120px] flex flex-col justify-between hover:bg-[#EDEBE3] cursor-pointer">
                    <Image src={physical} alt="physical" />
                    <h3 className="m-0 text-base text-[#24181B]">
                      Physical location
                    </h3>
                  </div>

                  <div className="w-40 p-4 rounded-md border border-[#E6E3D6]  h-[120px] flex flex-col justify-between hover:bg-[#EDEBE3] cursor-pointer">
                    <Image src={virtual} alt="physical" />
                    <h3 className="m-0 text-base text-[#24181B]">Virtual</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-[#1E1E1E0D] rounded-b">
              <button
                className="text-base  w-full h-[60px] py-3 flex justify-center items-center bg-[#E60054] rounded-xl font-medium text-white hover:bg-[#C20038]"
                type="submit"
              >
                Show 366 opportunities
              </button>
            </div>
          </div>
        </CommonModal>
      )}
    </div>
  );
}
