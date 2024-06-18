'use client';
// import { eventFrequency } from '@/utils/staticDropdown/dropdownOptions';
import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
// import DatePicker from 'react-datepicker';
// import { FileUploader } from 'react-drag-drop-files';
import { useForm } from 'react-hook-form';
import chevronDown from '/public/images/chevron-down.svg';
// import close from '/public/images/close.svg';
import Image from 'next/image';
import 'react-datepicker/dist/react-datepicker.css';
import { websiteLinkRegex } from '@/utils/regex';

const CreateEventStep2 = ({ setShowModal }: any) => {
  // const [cookies] = useCookies();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      locationType: '1',
      virtualLocationLink: '',
    },
  });
  const locationType = watch('locationType');
  //   handle submit for create event
  const handleFormSubmit = async (data: any) => {
    console.log(data, 'data');
  };

  // to set the website link value to empty
  useEffect(() => {
    if (locationType === '2') {
      setValue('virtualLocationLink', '');
    } //eslint-disable-next-line
  }, [locationType]);

  return (
    <form className="" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex  w-full py-5 flex-col relative px-5 max-h-modal overflow-auto">
        <h4 className="text-[#24181B] text-2xl font-medium mb-5">Location</h4>
        <div className="border border-[#E6E3D6] rounded-t-xl p-5 flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <label className="text-base text-[#24181B]">
              Physical location
            </label>

            <label className="relative cursor-pointer">
              <input
                {...register('locationType')}
                className="hidden peer"
                name="locationType"
                type="radio"
                value={1}
              />
              <div className="ml-auto border border[#E6E3D6] w-6 h-6 bg-white rounded-full relative flex items-center justify-center peer-checked:bg-[#E60054] peer-checked:border-[#E60054]">
                <span className="w-2 h-2 absolute bg-white rounded-md peer-checked:bg-[#fff]"></span>
              </div>
            </label>
          </div>

          <div className="flex flex-col gap-5">
            <div className="relative w-full">
              <input
                type="text"
                id="name"
                className="block rounded-2xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                placeholder=" "
              />
              <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                Address
              </label>
            </div>

            <div className="relative w-full">
              <input
                type="text"
                id="name"
                className="block rounded-2xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                placeholder=" "
              />
              <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                City
              </label>
            </div>

            <div className="relative w-full mt-1">
              <label className="text-xs text-[#24181B80] absolute top-[10px] left-5">
                Province (optional)
              </label>
              <select className="block rounded-2xl px-5 pb-2.5 pt-6 w-full text-base text-[#24181B] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer">
                <option>Province</option>
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

            <div className="relative w-full">
              <input
                type="text"
                id="name"
                className="block rounded-2xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                placeholder=" "
              />
              <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                Postal Code
              </label>
            </div>

            <hr className="border-[#E6E3D6]"></hr>

            <button
              className="cursro-pointer text-base h-[60px] px-4 py-3 inline-flex justify-center items-center border border-[#ff000040] bg-inherit rounded-2xl font-medium text-[#E60054]  hover:bg-[#ff000017]"
              type="button"
              onClick={() => setShowModal(false)}
            >
              Add location
            </button>
          </div>
        </div>
        <div className="border border-[#E6E3D6] border-t-0 rounded-b-xl p-5 flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <label className="text-base text-[#24181B]">Virtual</label>

            <label className="relative cursor-pointer">
              <input
                {...register('locationType')}
                className="hidden peer"
                name="locationType"
                type="radio"
                value={2}
              />
              <div className="ml-auto border border[#E6E3D6] w-6 h-6 bg-white rounded-full relative flex items-center justify-center peer-checked:bg-[#E60054] peer-checked:border-[#E60054]">
                <span className="w-2 h-2 absolute bg-white rounded-md peer-checked:bg-[#fff]"></span>
              </div>
            </label>
          </div>

          <div
            className={`flex flex-col gap-5 ${locationType === '2' ? '' : 'hidden'}`}
          >
            <div className="relative w-full">
              <input
                {...register('virtualLocationLink', {
                  required:
                    locationType === '2'
                      ? 'Virtual location link is required.'
                      : false,
                  pattern: {
                    value: websiteLinkRegex,
                    message: 'Enter valid location link',
                  },
                })}
                type="text"
                id="virtualLocationLink"
                className="block rounded-2xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                placeholder=" "
              />
              <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                Link
              </label>
              {errors.virtualLocationLink && (
                <span className="text-red-500">
                  {(errors.virtualLocationLink as { message: string }).message}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end p-6 border-t border-solid border-[#1E1E1E0D] rounded-b">
        <button
          className="text-base  w-full h-[60px] py-3 flex justify-center items-center bg-[#E60054] rounded-2xl font-medium text-white hover:bg-[#C20038]"
          type="submit"
        >
          Continue to Commitment
        </button>
      </div>
    </form>
  );
};
export default CreateEventStep2;
