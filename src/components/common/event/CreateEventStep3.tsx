'use client';
// import { eventFrequency } from '@/utils/staticDropdown/dropdownOptions';
import moment from 'moment-timezone';
import React from 'react';
// import DatePicker from 'react-datepicker';
// import { FileUploader } from 'react-drag-drop-files';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import chevronDown from '/public/images/chevron-down.svg';
import longarrow from '/public/images/arrow-right.svg';
import Image from 'next/image';
// import { min4CharWithoutSpace, websiteLinkRegex } from '@/utils/regex';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CreateEventStep3 = () => {
  const eventDetails = useSelector((state: any) => state.submitOppReducer);
  const [openTab, setOpenTab] = React.useState(1);
  //   handle submit for create event
  const handleFormSubmit = async (data: any) => {
    console.log(data, 'data step 3');
  };
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      selectedDate: eventDetails.selectedDate,
    },
  });
  return (
    <form className="" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex  w-full py-5 flex-col relative px-5 max-h-modal overflow-auto">
        <h4 className="text-[#24181B] text-2xl font-medium mb-5">Commitment</h4>

        <div className="w-full flex flex-col">
          <ul
            className="flex gap-[5px] mb-0 list-none  w-full relative"
            role="tablist"
          >
            <li className="">
              <a
                className={
                  'px-3 py-2.5 inline-flex items-center rounded-xl text-[#24181B80]  ' +
                  (openTab === 1 ? 'text-white bg-[#24181B]' : '')
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                One-time
              </a>
            </li>
            <li className="">
              <a
                className={
                  'px-3 py-2.5 inline-flex items-center rounded-xl text-[#24181B80]  ' +
                  (openTab === 2 ? 'text-white bg-[#24181B]' : '')
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                Dates
              </a>
            </li>

            <li className="">
              <a
                className={
                  'px-3 py-2.5 inline-flex items-center rounded-xl text-[#24181B80]  ' +
                  (openTab === 3 ? 'text-white bg-[#24181B]' : '')
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                Ongoing
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words w-full">
            <div className=" py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? 'block' : 'hidden'} id="link1">
                  <div className="flex flex-col gap-5">
                    <div className="relative w-full">
                      <Controller
                        control={control}
                        rules={{ required: 'Event Date is required' }}
                        name="selectedDate"
                        render={({ field }) => (
                          <DatePicker
                            className="block rounded-2xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                            selected={field.value}
                            onChange={(date) =>
                              field.onChange(moment.utc(date).toISOString())
                            }
                            timeCaption="Time"
                            dateFormat="yyyy-MM-dd"
                            minDate={new Date()}
                          />
                        )}
                      />
                      <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                        Select date
                      </label>
                      {errors.selectedDate && (
                        <span className="text-red-500">
                          {(errors.selectedDate as { message: string }).message}
                        </span>
                      )}
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
                <div className={openTab === 2 ? 'block' : 'hidden'} id="link2">
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

                <div className={openTab === 3 ? 'block' : 'hidden'} id="link3">
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
      <div className="flex items-center justify-end p-6 border-t border-solid border-[#1E1E1E0D] rounded-b">
        <button
          className="text-base  w-full h-[60px] py-3 flex justify-center items-center bg-[#E60054] rounded-2xl font-medium text-white hover:bg-[#C20038]"
          type="submit"
        >
          Continue to Registration type
        </button>
      </div>
    </form>
  );
};
export default CreateEventStep3;
