'use client';
import React from 'react';
import chevronDown from '/public/images/chevron-down.svg';
import longarrow from '/public/images/arrow-right.svg';
import Image from 'next/image';
import 'react-datepicker/dist/react-datepicker.css';
import OneTimeCommitment from './OneTimeCommitment';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
const CreateEventStep3 = () => {
  const searchParams = useSearchParams();
  const commitment = searchParams.get('commitment');
  return (
    <div>
      <div className="flex  w-full py-5 flex-col relative px-5 max-h-modal overflow-auto">
        <h4 className="text-[#24181B] text-2xl font-medium mb-5">Commitment</h4>

        <div className="w-full flex flex-col">
          <ul
            className="flex gap-[5px] mb-0 list-none  w-full relative"
            role="tablist"
          >
            <li className="">
              <Link
                className={
                  'px-3 py-2.5 inline-flex items-center rounded-xl text-[#24181B80]  ' +
                  (commitment === 'ONETIME' ? 'text-white bg-[#24181B]' : '')
                }
                href="?submit-event=true&step=3&commitment=ONETIME"
                role="tablist"
              >
                One-time
              </Link>
            </li>
            <li className="">
              <Link
                className={
                  'px-3 py-2.5 inline-flex items-center rounded-xl text-[#24181B80]  ' +
                  (commitment === 'DATES' ? 'text-white bg-[#24181B]' : '')
                }
                data-toggle="tab"
                href="?submit-event=true&step=3&commitment=DATES"
                role="tablist"
              >
                Dates
              </Link>
            </li>

            <li className="">
              <Link
                className={
                  'px-3 py-2.5 inline-flex items-center rounded-xl text-[#24181B80]  ' +
                  (commitment === 'ONGOING' ? 'text-white bg-[#24181B]' : '')
                }
                href="?submit-event=true&step=3&commitment=ONGOING"
                role="tablist"
              >
                Ongoing
              </Link>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words w-full">
            <div className=" py-5 flex-auto">
              <div className="tab-content tab-space">
                <div
                  className={commitment === 'ONETIME' ? 'block' : 'hidden'}
                  id="link1"
                >
                  <OneTimeCommitment />
                </div>
                <div
                  className={commitment === 'DATES' ? 'block' : 'hidden'}
                  id="link2"
                >
                  <div className="flex flex-col gap-5">
                    <div className="relative w-full">
                      <input
                        type="text"
                        id="name"
                        className="block rounded-2xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                        placeholder=" "
                      />
                      <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                        Select date
                      </label>
                    </div>

                    <div className="relative w-full mt-1">
                      <label className="text-xs text-[#24181B80] absolute top-[10px] left-5">
                        Frequency
                      </label>
                      <select className="block rounded-2xl px-5 pb-2.5 pt-6 w-full text-base text-[#24181B] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer">
                        <option>1</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </select>
                      <Image
                        src={chevronDown}
                        alt="arrow"
                        className="absolute top-[17px] right-4 pointer-events-none"
                      />
                    </div>

                    <div className="flex gap-5  items-center">
                      <div className="relative w-full">
                        <input
                          type="text"
                          id="name"
                          className="block rounded-2xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                          placeholder=" "
                        />
                        <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                          Min hours
                        </label>
                      </div>

                      <div className="min-w-5">
                        <Image src={longarrow} alt=""></Image>
                      </div>

                      <div className="relative w-full">
                        <input
                          type="text"
                          id="name"
                          className="block rounded-2xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                          placeholder=" "
                        />
                        <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                          Max hours
                        </label>
                      </div>
                    </div>

                    <div className="flex gap-5  items-center">
                      <div className="relative w-full">
                        <input
                          type="text"
                          id="name"
                          className="block rounded-2xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                          placeholder=" "
                        />
                        <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                          Min hours
                        </label>
                      </div>

                      <div className="min-w-5">
                        <Image src={longarrow} alt=""></Image>
                      </div>

                      <div className="relative w-full">
                        <input
                          type="text"
                          id="name"
                          className="block rounded-2xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                          placeholder=" "
                        />
                        <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                          Max hours
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={commitment === 'ONGOING' ? 'block' : 'hidden'}
                  id="link3"
                >
                  <div className="flex flex-col gap-5">
                    <div className="flex gap-5  items-center">
                      <div className="relative w-full">
                        <input
                          type="text"
                          id="name"
                          className="block rounded-2xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                          placeholder=" "
                        />
                        <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                          Min hours
                        </label>
                      </div>

                      <div className="min-w-5">
                        <Image src={longarrow} alt=""></Image>
                      </div>

                      <div className="relative w-full">
                        <input
                          type="text"
                          id="name"
                          className="block rounded-2xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                          placeholder=" "
                        />
                        <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                          Max hours
                        </label>
                      </div>
                    </div>
                    <div className="relative w-full">
                      <input
                        type="text"
                        id="name"
                        className="block rounded-2xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                        placeholder=" "
                      />
                      <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                        Select date
                      </label>
                    </div>

                    <div className="relative w-full mt-1">
                      <label className="text-xs text-[#24181B80] absolute top-[10px] left-5">
                        Frequency
                      </label>
                      <select className="block rounded-2xl px-5 pb-2.5 pt-6 w-full text-base text-[#24181B] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer">
                        <option>1</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </select>
                      <Image
                        src={chevronDown}
                        alt="arrow"
                        className="absolute top-[17px] right-4 pointer-events-none"
                      />
                    </div>

                    <div className="relative w-full mt-1">
                      <label className="text-xs text-[#24181B80] absolute top-[10px] left-5">
                        Commitment
                      </label>
                      <select className="block rounded-2xl px-5 pb-2.5 pt-6 w-full text-base text-[#24181B] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer">
                        <option>3 months</option>
                        <option>6 months</option>
                        <option>12 months</option>
                        <option>24 months</option>
                      </select>
                      <Image
                        src={chevronDown}
                        alt="arrow"
                        className="absolute top-[17px] right-4 pointer-events-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateEventStep3;
