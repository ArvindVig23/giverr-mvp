import Image from 'next/image';
import React from 'react';
import chevronDown from '/public/images/chevron-down.svg';
import longarrow from '/public/images/arrow-right.svg';
import { useDispatch, useSelector } from 'react-redux';
import { updateSubmitOppDetails } from '@/app/redux/slices/submitOpportunity';
import { Controller, useForm } from 'react-hook-form';
import { eventFrequency } from '@/utils/staticDropdown/dropdownOptions';
import moment from 'moment-timezone';
import DatePicker from 'react-datepicker';
import MaterialDatepicker from 'react-tailwindcss-datepicker';
import { SearchParam } from '@/interface/opportunity';
import { updateSearchParams } from '@/services/frontend/commonServices';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const DatesCommitment = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const eventDetails = useSelector((state: any) => state.submitOppReducer);
  const dispatch = useDispatch();
  const handleFormSubmit = async (data: any) => {
    console.log(data, 'data');
    const updatedStateEvent = {
      ...eventDetails,
      type: 'DATES',
      frequency: data.frequency,
      selectedDate: data.dateRange.startDate,
      endDate: data.dateRange.endDate,
      minHour: data.minHour,
      maxHour: data.maxHour,
      startTime: data.startTime,
      endTime: data.endTime,
    };

    dispatch(updateSubmitOppDetails(updatedStateEvent));
    const params: SearchParam[] = [
      {
        key: 'submit-event',
        value: 'true',
      },
      {
        key: 'step',
        value: '4',
      },
    ];
    updateSearchParams(searchParams, pathname, router, params);
  };
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      dateRange:
        eventDetails.selectedDate && eventDetails.endDate
          ? {
              startDate: moment(eventDetails.selectedDate).format('YYYY-MM-DD'),
              endDate: moment(eventDetails.endDate).format('YYYY-MM-DD'),
            }
          : {
              startDate: moment().format(),
              endDate: new Date(),
            },
      frequency: eventDetails.frequency,
      minHour: eventDetails.minHour,
      maxHour: eventDetails.maxHour,
      startTime: eventDetails.startTime
        ? new Date(eventDetails.startTime)
        : null,
      endTime: eventDetails.endTime ? new Date(eventDetails.endTime) : null,
    },
  });
  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="relative w-full">
        <Controller
          name="dateRange"
          control={control}
          rules={{ required: 'Event Date is required' }}
          render={({ field }) => (
            <MaterialDatepicker
              useRange={false}
              value={field.value}
              onChange={(range: any) =>
                field.onChange({
                  startDate: moment.utc(range.startDate).toISOString(),
                  endDate: moment.utc(range.endDate).toISOString(),
                })
              }
              placeholder="Select Date"
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

      <div className="flex gap-5  items-center">
        <div className="relative w-full">
          <Controller
            name="startTime"
            control={control}
            rules={{ required: 'Start time is required' }}
            render={({ field }) => (
              <DatePicker
                className="block rounded-xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                selected={field.value}
                onChange={(date) =>
                  field.onChange(moment.utc(date).toISOString())
                }
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            )}
          />
          <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
            HH :MM
          </label>
          {errors.startTime && (
            <span className="text-red-500">
              {(errors.startTime as { message: string }).message}
            </span>
          )}
        </div>

        <div className="min-w-5">
          <Image src={longarrow} alt=""></Image>
        </div>

        <div className="relative w-full">
          <Controller
            name="endTime"
            control={control}
            rules={{ required: 'Start time is required' }}
            render={({ field }) => (
              <DatePicker
                className="block rounded-xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                selected={field.value}
                onChange={(date) =>
                  field.onChange(moment.utc(date).toISOString())
                }
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            )}
          />
          <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
            HH : MM
          </label>
          {errors.endTime && (
            <span className="text-red-500">
              {(errors.endTime as { message: string }).message}
            </span>
          )}
        </div>
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

export default DatesCommitment;
