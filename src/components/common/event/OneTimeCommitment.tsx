import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import longarrow from '/public/images/arrow-right.svg';
import moment from 'moment-timezone';
import { updateSubmitOppDetails } from '@/app/redux/slices/submitOpportunity';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { updateSearchParams } from '@/services/frontend/commonServices';
import { SearchParam } from '@/interface/opportunity';

const OneTimeCommitment = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const eventDetails = useSelector((state: any) => state.submitOppReducer);
  const handleFormSubmit = async (data: any) => {
    console.log(data, 'data');

    const updatedStateEvent = {
      ...eventDetails,
      type: 'ONETIME',
      selectedDate: data.selectedDate,
      minHour: data.minHour,
      maxHour: data.maxHour,
      startTime: data.startTime,
      endTime: data.endTime,
      endDate: '',
      frequency: '',
      commitment: '',
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
      selectedDate: eventDetails.selectedDate,
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
      className="flex flex-col gap-5 h-full"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="flex flex-col gap-5 flex-1">
        <div className="relative w-full">
          <Controller
            control={control}
            rules={{ required: 'Event Date is required' }}
            name="selectedDate"
            render={({ field }) => (
              <DatePicker
                className="block rounded-2xl px-5 placeholder-[#24181B80]  py-4 h-[60px] w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                selected={field.value}
                onChange={(date) =>
                  field.onChange(moment.utc(date).toISOString())
                }
                placeholderText="Select Date"
                timeCaption="Time"
                dateFormat="yyyy-MM-dd"
                minDate={new Date()}
              />
            )}
          />
          {/* <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
          Select date
        </label> */}
          {errors.selectedDate && (
            <span className="text-red-500">
              {(errors.selectedDate as { message: string }).message}
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
              className="no-spinners block rounded-2xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
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
              className="no-spinners block rounded-2xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
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
                  className="block rounded-xl px-5 placeholder-[#24181B80]  py-4 h-[60px] w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                  selected={field.value ? new Date(field.value) : null}
                  onChange={(date) =>
                    field.onChange(moment.utc(date).toISOString())
                  }
                  placeholderText="HH :MM"
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
              )}
            />
            {/* <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
            HH :MM
          </label> */}
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
              rules={{ required: 'End time is required' }}
              render={({ field }) => (
                <DatePicker
                  className="block rounded-xl px-5 placeholder-[#24181B80]  py-4 h-[60px] w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                  selected={field.value ? new Date(field.value) : null}
                  onChange={(date) =>
                    field.onChange(moment.utc(date).toISOString())
                  }
                  showTimeSelect
                  placeholderText="HH : MM"
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
              )}
            />
            {/* <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
            HH : MM
          </label> */}
            {errors.endTime && (
              <span className="text-red-500">
                {(errors.endTime as { message: string }).message}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-[[#1E1E1E0D] pt-5 px-5 -mx-5">
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

export default OneTimeCommitment;
