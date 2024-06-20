import Image from 'next/image';
import React from 'react';
import chevronDown from '/public/images/chevron-down.svg';
import longarrow from '/public/images/arrow-right.svg';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import {
  commitmentOptions,
  eventFrequency,
} from '@/utils/staticDropdown/dropdownOptions';

const OnGoingCommitment = () => {
  const eventDetails = useSelector((state: any) => state.submitOppReducer);
  const handleFormSubmit = async (data: any) => {
    console.log(data, 'data');
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      frequency: eventDetails.frequency,
      minHour: eventDetails.minHour,
      maxHour: eventDetails.maxHour,
    },
  });
  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="flex gap-5  items-center">
        <div className="relative w-full">
          <input
            {...register('minHour', {
              required: 'Min hours is required.',
            })}
            min={0}
            type="number"
            id="minHour"
            className="block rounded-2xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
            placeholder=" "
          />
          <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
            Min hours
          </label>
          {errors.minHour && (
            <span className="text-red-500">
              {(errors.minHour as { message: string }).message}
            </span>
          )}
        </div>

        <div className="min-w-5">
          <Image src={longarrow} alt=""></Image>
        </div>

        <div className="relative w-full">
          <input
            {...register('maxHour', {
              required: 'Max hours is required.',
            })}
            min={0}
            type="number"
            id="maxHour"
            className="block rounded-2xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
            placeholder=" "
          />
          <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
            Max hours
          </label>
          {errors.maxHour && (
            <span className="text-red-500">
              {(errors.maxHour as { message: string }).message}
            </span>
          )}
        </div>
      </div>

      <div className="relative w-full mt-1">
        <label className="text-xs text-[#24181B80] absolute top-[10px] left-5">
          Select frequency
        </label>
        <select
          id="frequency"
          {...register('frequency', {
            required: 'Frequency is required.',
          })}
          className="block rounded-xl px-5 pb-2 pt-6 w-full text-base text-[#24181B] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
        >
          <option value="" selected disabled hidden>
            Select
          </option>
          {eventFrequency.map((option: any, index: number) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Image
          src={chevronDown}
          alt="arrow"
          className="absolute top-[18px] right-4 pointer-events-none"
        />
        {errors.frequency && (
          <span className="text-red-500">
            {(errors.frequency as { message: string }).message}
          </span>
        )}
      </div>

      <div className="relative w-full mt-1">
        <label className="text-xs text-[#24181B80] absolute top-[10px] left-5">
          Commitment
        </label>
        <select
          id="commitment"
          {...register('commitment', {
            required: 'Commitment is required.',
          })}
          className="block rounded-2xl px-5 pb-2.5 pt-6 w-full text-base text-[#24181B] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
        >
          <option value="" selected disabled hidden>
            Select
          </option>
          {commitmentOptions.map((option: any, index: number) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Image
          src={chevronDown}
          alt="arrow"
          className="absolute top-[17px] right-4 pointer-events-none"
        />
        {errors.commitment && (
          <span className="text-red-500">
            {(errors.commitment as { message: string }).message}
          </span>
        )}
      </div>
      <button
        className="text-base  w-full h-[60px] py-3 flex justify-center items-center bg-[#E60054] rounded-2xl font-medium text-white hover:bg-[#C20038]"
        type="submit"
      >
        Continue to Registration type
      </button>
    </form>
  );
};

export default OnGoingCommitment;
