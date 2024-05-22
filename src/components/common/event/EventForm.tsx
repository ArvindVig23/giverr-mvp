'use client';
import callApi from '@/services/frontend/callApiService';
import { sweetAlertToast } from '@/services/frontend/toastServices';
import { eventFrequency } from '@/utils/staticDropdown/dropdownOptions';
import moment from 'moment-timezone';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import DatePicker from 'react-datepicker';
import { FileUploader } from 'react-drag-drop-files';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import chevronDown from '/public/images/chevron-down.svg';
import close from '/public/images/close.svg';
import Image from 'next/image';
import 'react-datepicker/dist/react-datepicker.css';
import {
  createFileUrl,
  getEventList,
  getOrganizationList,
  uploadFile,
} from '@/services/frontend/opportunityService';
import { fileTypes } from '@/constants/fileConstants';

const EventForm = ({ setShowModal }: any) => {
  const dispatch = useDispatch();
  const [thumbnailFile, setThumbnailFile] = useState<any>('');
  const [fileError, setFileError] = useState<string>('');
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  const [cookies] = useCookies();
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      registrationType: '1',
      frequency: '',
      description: '',
      activities: '',
      volunteerRequirements: '',
      registrationWebsiteLink: '',
      organizationId: '',
      opportunityType: '',
      eventDate: null,
      eventTime: null,
      location: '',
    },
  });
  const radioValue = watch('registrationType');

  const eventList = useSelector((state: any) => state.eventListReducer);
  const organizationList = useSelector(
    (state: any) => state.organizationReducer,
  );
  //   handle submit for create event
  const handleFormSubmit = async (data: any) => {
    if (!thumbnailFile) {
      setFileError('Pleae select thumbnail');
      return;
    }
    if (thumbnailFile) {
      const filePathName = `opportunities/${thumbnailFile.name}`;
      const pathOfFile = await uploadFile(thumbnailFile, filePathName);
      data.imageLink = pathOfFile;
    }
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
    try {
      const response = await callApi('/opportunity', 'post', data);
      const { message } = response;
      sweetAlertToast('success', message);
      reset();
      setShowModal(false);
      setFileError('');
      setThumbnailUrl('');
      setThumbnailFile(null);
    } catch (error: any) {
      const { message } = error.data;
      sweetAlertToast('error', message);
    }
  };

  useEffect(() => {
    if (eventList.length === 0) {
      getEventList(dispatch);
    }
    if (organizationList.length === 0) {
      getOrganizationList(dispatch);
    } // eslint-disable-next-line
  }, []);

  // handle file upload
  const handleFile = (file: any) => {
    if (file) {
      setFileError('');
      const url = createFileUrl(file);
      setThumbnailUrl(url);
      setThumbnailFile(file);
    }
  };

  // remove file
  const removeImg = () => {
    setFileError('Please choose thumbnail file.');
    setThumbnailUrl('');
    setThumbnailFile(null);
  };

  // validate file
  const validateFile = (error: string) => {
    if (error) {
      setFileError(
        'Unsupported format. Use PNG, JPG (under 5MB), 1068x646 pixels.',
      );
      setThumbnailUrl('');
      setThumbnailFile(null);
      return;
    } else {
      setFileError('');
    }
  };
  return (
    <form className="" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex gap-5 w-full flex-col relative px-5">
        <div className="w-full rounded-xl p-5 flex gap-5 bg-[#EDEBE3] flex-col border border-[#E6E3D6]">
          <h4 className="text-base text-[#24181B] m-0">
            Upload image thumbnail
          </h4>
          <div className="border border-dashed border-[#D1CFC7] rounded-lg h-[200px] w-full overflow-hidden relative">
            {thumbnailUrl && (
              <>
                <button
                  type="button"
                  className="w-5 h-5 rounded-full bg-[#24181B] flex items-center justify-center absolute right-2.5 top-2.5 hover:bg-[#454545]"
                >
                  <Image
                    onClick={removeImg}
                    className="object-cover h-2"
                    src={close}
                    alt="dog"
                  />
                </button>
                <Image
                  width={1068}
                  height={646}
                  className="h-full w-full object-cover"
                  src={thumbnailUrl}
                  alt="dog"
                />
              </>
            )}
            <div className="flex items-center justify-center text-center h-full file-upload">
              <FileUploader
                onTypeError={(error: any) => validateFile(error)}
                onSizeError={(error: any) => validateFile(error)}
                maxSize={5}
                multiple={false}
                className="hidden"
                handleChange={(file: any) => handleFile(file)}
                name="file"
                types={fileTypes}
              >
                <div>
                  <span className="text-[#0C0D0D]">
                    <span className="text-[#E60054]">Browse files</span> or drag
                    & drop
                  </span>
                  <p className="text-[#24181B80] text-xs">
                    1068px (w) x 646px (h) <br></br>
                    .jpeg or .png, with maximum file size of 5MB.
                  </p>
                </div>
              </FileUploader>
            </div>
          </div>
        </div>
        {fileError && <span className="text-red-500">{fileError}</span>}
        <div className="relative w-full">
          <input
            {...register('name', {
              required: 'Event Name is required',
              min: {
                value: 4,
                message: 'Minimum 4 characters required.',
              },
            })}
            type="text"
            id="name"
            className="block rounded-xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
            placeholder=" "
          />
          <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
            Event name
          </label>
          {errors.name && (
            <span className="text-red-500">
              {(errors.name as { message: string }).message}
            </span>
          )}
        </div>

        <div className="flex gap-5">
          <div className="relative w-full">
            <Controller
              name="eventDate"
              control={control}
              rules={{ required: 'Event Date is required' }}
              render={({ field }) => (
                <DatePicker
                  className="block rounded-xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                  selected={field.value}
                  onChange={(date) =>
                    field.onChange(moment.utc(date).toISOString())
                  }
                  timeCaption="Time"
                  dateFormat="yyyy-MM-dd"
                />
              )}
            />
            <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
              Date
            </label>
            {errors.eventDate && (
              <span className="text-red-500">
                {(errors.eventDate as { message: string }).message}
              </span>
            )}
          </div>

          <div className="relative w-full">
            <Controller
              name="eventTime"
              control={control}
              rules={{ required: 'Event time is required' }}
              render={({ field }) => (
                <DatePicker
                  className="block rounded-xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                  selected={field.value}
                  onChange={(date: any) => field.onChange(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
              )}
            />
            <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
              Time
            </label>
            {errors.eventTime && (
              <span className="text-red-500">
                {(errors.eventTime as { message: string }).message}
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
              required: 'Select Frequency',
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

        <div className="relative w-full">
          <input
            {...register('location', {
              required: 'Select Location',
            })}
            type="text"
            id="location"
            className="block rounded-xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
            placeholder=" "
          />
          <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
            Location
          </label>
          {errors.location && (
            <span className="text-red-500">
              {(errors.location as { message: string }).message}
            </span>
          )}
        </div>

        <div className="relative w-full mt-1">
          <label className="text-xs text-[#24181B80] absolute top-[10px] left-5">
            Organization name
          </label>
          <select
            id="organizationId"
            {...register('organizationId')}
            className="block rounded-xl px-5 pb-2 pt-6 w-full text-base text-[#24181B] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
          >
            <option value="" selected disabled hidden>
              Select
            </option>
            {organizationList.map((option: any, index: number) => (
              <option key={index} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          <Image
            src={chevronDown}
            alt="arrow"
            className="absolute top-[18px] right-4 pointer-events-none"
          />
        </div>

        <div className="relative w-full mt-1">
          <label className="text-xs text-[#24181B80] absolute top-[10px] left-5">
            Event type
          </label>
          <select
            {...register('opportunityType', {
              required: 'Select Event',
            })}
            className="block rounded-xl px-5 pb-2 pt-6 w-full text-base text-[#24181B] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
          >
            <option value="" selected disabled hidden>
              Event type
            </option>
            {eventList.length > 0 &&
              eventList.map((option: any, index: any) => (
                <option key={index} value={option.id}>
                  {option.name}
                </option>
              ))}
          </select>
          <Image
            src={chevronDown}
            alt="arrow"
            className="absolute top-[18px] right-4 pointer-events-none"
          />
          {errors.opportunityType && (
            <span className="text-red-500">
              {(errors.opportunityType as { message: string }).message}
            </span>
          )}
        </div>

        <div className="relative w-full">
          <textarea
            {...register('description', {
              required: 'Please enter description',
              min: {
                value: 4,
                message: 'Minimum 4 characters required.',
              },
            })}
            id="description"
            className="block rounded-xl px-5 pb-2.5 h-[120px] pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
            placeholder=" "
          />
          <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
            Description
          </label>
          {errors.description && (
            <span className="text-red-500">
              {(errors.description as { message: string }).message}
            </span>
          )}
        </div>

        <div className="relative w-full">
          <textarea
            {...register('activities')}
            id="activities"
            className="block rounded-xl px-5 pb-2.5 h-[120px] pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
            placeholder=" "
          />
          <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
            Activities (optional)
          </label>
        </div>
        <div className="relative w-full">
          <textarea
            {...register('volunteerRequirements')}
            id="volunteerRequirements"
            className="block rounded-xl px-5 pb-2.5 h-[120px] pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
            placeholder=" "
          />
          <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
            Volunteer requirements (optional)
          </label>
        </div>

        <div className="w-full flex flex-col gap-5 mt-10">
          <h4 className="text-[#24181B] text-2xl font-medium">
            Volunteer registration type
          </h4>

          <div className="w-full border border-[#E6E3D6] rounded-xl overflow-hidden">
            <label className="relative w-full border-b border-[#1E1E1E0D] inline-flex  p-4 d-flex items-center gap-5 cursor-pointer">
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

            <div className="px-5 mb-5">
              <div className="relative w-full ">
                <input
                  disabled={radioValue !== '3'}
                  {...register('registrationWebsiteLink')}
                  type="text"
                  id="registrationWebsiteLink"
                  className="block rounded-2xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                  placeholder=" "
                />
                <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                  Website link
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end p-6 pb-0 border-t border-solid border-[#1E1E1E0D] rounded-b">
        <button
          className="text-base  w-full h-[60px] py-3 flex justify-center items-center bg-[#E60054] rounded-xl font-medium text-white hover:bg-[#C20038]"
          type="submit"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EventForm;
