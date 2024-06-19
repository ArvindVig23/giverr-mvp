'use client';
import callApi from '@/services/frontend/callApiService';
import { sweetAlertToast } from '@/services/frontend/toastServices';
// import { eventFrequency } from '@/utils/staticDropdown/dropdownOptions';
import moment from 'moment-timezone';
import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
// import DatePicker from 'react-datepicker';
// import { FileUploader } from 'react-drag-drop-files';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
// import chevronDown from '/public/images/chevron-down.svg';
// import close from '/public/images/close.svg';
// import Image from 'next/image';
import 'react-datepicker/dist/react-datepicker.css';
import { setLoader } from '@/app/redux/slices/loaderSlice';
import { websiteLinkRegex } from '@/utils/regex';
import { useRouter } from 'next/navigation';

const CreateEventStep4 = () => {
  const eventDetails = useSelector((state: any) => state.submitOppReducer);
  console.log(eventDetails, 'eventDetails');

  const dispatch = useDispatch();
  const [cookies] = useCookies();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      registrationType: '1',
      registrationWebsiteLink: '',
      spots: 0,
    },
  });
  const radioValue = watch('registrationType');
  const router = useRouter();
  //   handle submit for create event
  const handleFormSubmit = async (data: any) => {
    const formData = {
      ...eventDetails,
      registrationType: data.registrationType,
      registrationWebsiteLink: data.registrationWebsiteLink,
      spots: data.spots,
    };
    console.log(formData, 'formData');

    dispatch(setLoader(true));
    // if (thumbnailFile) {
    //   const filePathName = `opportunities/${thumbnailFile.name}`;
    //   const pathOfFile = await uploadFile(thumbnailFile, filePathName);
    //   data.imageLink = `${pathOfFile}?alt=media`;
    // }
    data.createdBy = cookies.userDetails.id;
    const eventDate = data.eventDate;
    const eventTime = data.eventTime;
    // 1. Convert eventDate to UTC
    const utcEventDate = moment.tz(eventDate, moment.locale()).utc();
    // 2. Convert eventTime to UTC
    const utcEventTime = moment.tz(eventTime, moment.locale()).utc();
    // 3. Replace the time in utcEventDate with the time of utcEventTime
    utcEventDate.set({
      hour: utcEventTime.hour(),
      minute: utcEventTime.minute(),
      second: utcEventTime.second(),
      millisecond: utcEventTime.millisecond(),
    });
    const eventDateTime = utcEventDate.format();
    data.eventDate = eventDateTime;
    if (data.publishAs !== cookies.userDetails.id) {
      data.organizationId = data.publishAs;
    }
    try {
      const response = await callApi('/opportunity', 'post', data);
      const { message } = response;
      sweetAlertToast('success', message);
      reset();
      dispatch(setLoader(false));
      router.push('/');
    } catch (error: any) {
      dispatch(setLoader(false));
      const { message } = error.data;
      sweetAlertToast('error', message);
    }
  };

  // to set the website link value to empty
  useEffect(() => {
    if (radioValue !== '3') {
      setValue('registrationWebsiteLink', '');
    }
    if (radioValue !== '1') {
      setValue('spots', 0);
    }
    //eslint-disable-next-line
  }, [radioValue]);

  return (
    <form className="" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex gap-5 w-full py-5 flex-col relative px-5 max-h-modal overflow-auto">
        <h4 className="text-[#24181B] text-2xl font-medium">Event Details</h4>

        <div className="w-full flex flex-col gap-5">
          <div className="w-full border border-[#E6E3D6] rounded-xl overflow-hidden">
            <label
              className={`relative w-full  border-[#1E1E1E0D] inline-flex  p-4 d-flex items-center gap-5 cursor-pointer ${radioValue === '1' ? '' : 'border-b'}`}
            >
              <div>
                <span className="text-[#24181B]">
                  Registration through Giverr platform
                </span>
                <p className="text-[#24181B80]">
                  For events that are space limited
                </p>
              </div>
              <input
                {...register('registrationType')}
                className="hidden peer"
                name="registrationType"
                type="radio"
                value={1}
              />
              <div className="ml-auto border border[#E6E3D6] w-6 h-6 bg-white rounded-full relative flex items-center justify-center peer-checked:bg-[#E60054] peer-checked:border-[#E60054]">
                <span className="w-2 h-2 absolute bg-white rounded-md peer-checked:bg-[#fff]"></span>
              </div>
            </label>
            {radioValue === '1' ? (
              <div className="px-5 pb-5 border-b border-[#1E1E1E0D] ">
                <div className="relative w-full ">
                  <input
                    min={0}
                    disabled={radioValue !== '1'}
                    {...register('spots', {
                      required:
                        radioValue === '1' ? 'Spots are required.' : false,
                      pattern: {
                        value: websiteLinkRegex,
                        message: 'Enter valid website link',
                      },
                    })}
                    type="number"
                    id="spots"
                    className="block rounded-2xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                    placeholder=" "
                  />
                  <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                    Spots
                  </label>
                  {errors.registrationWebsiteLink && (
                    <span className="text-red-500">
                      {
                        (errors.registrationWebsiteLink as { message: string })
                          .message
                      }
                    </span>
                  )}
                </div>
              </div>
            ) : null}

            <label className="relative w-full border-b border-[#1E1E1E0D] inline-flex p-4 d-flex items-center gap-5 cursor-pointer">
              <div>
                <span className="text-[#24181B]">Just show up</span>
                <p className="text-[#24181B80]">There’s no limited space</p>
              </div>
              <input
                {...register('registrationType')}
                className="hidden peer"
                name="registrationType"
                type="radio"
                value={2}
              />
              <div className="ml-auto border border[#E6E3D6] w-6 h-6 bg-white rounded-full relative flex items-center justify-center peer-checked:bg-[#E60054] peer-checked:border-[#E60054]">
                <span className="w-2 h-2 absolute bg-white rounded-md peer-checked:bg-[#fff]"></span>
              </div>
            </label>

            <label className="relative w-full  inline-flex p-4 d-flex items-center gap-5 cursor-pointer">
              <div>
                <span className="text-[#24181B]">Website link</span>
                <p className="text-[#24181B80]">
                  The registration for the event will be handled by the
                  organization
                </p>
              </div>
              <input
                {...register('registrationType')}
                className="hidden peer"
                name="registrationType"
                type="radio"
                value={3}
              />
              <div className="ml-auto border border[#E6E3D6] w-6 h-6 bg-white rounded-full relative flex items-center justify-center peer-checked:bg-[#E60054] peer-checked:border-[#E60054]">
                <span className="w-2 h-2 absolute bg-white rounded-md peer-checked:bg-[#fff]"></span>
              </div>
            </label>

            {radioValue === '3' ? (
              <div className="px-5 mb-5">
                <div className="relative w-full ">
                  <input
                    disabled={radioValue !== '3'}
                    {...register('registrationWebsiteLink', {
                      required:
                        radioValue === '3'
                          ? 'Website link is required.'
                          : false,
                      pattern: {
                        value: websiteLinkRegex,
                        message: 'Enter valid website link',
                      },
                    })}
                    type="text"
                    id="registrationWebsiteLink"
                    className="block rounded-2xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                    placeholder=" "
                  />
                  <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                    Website link
                  </label>
                  {errors.registrationWebsiteLink && (
                    <span className="text-red-500">
                      {
                        (errors.registrationWebsiteLink as { message: string })
                          .message
                      }
                    </span>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end p-6 border-t border-solid border-[#1E1E1E0D] rounded-b">
        <button
          className="text-base  w-full h-[60px] py-3 flex justify-center items-center bg-[#E60054] rounded-xl font-medium text-white hover:bg-[#C20038]"
          type="submit"
        >
          Submit event
        </button>
      </div>
    </form>
  );
};
export default CreateEventStep4;
