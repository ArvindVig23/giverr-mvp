'use client';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { FileUploader } from 'react-drag-drop-files';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import chevronDown from '/public/images/chevron-down.svg';
import close from '/public/images/close.svg';
import Image from 'next/image';
import 'react-datepicker/dist/react-datepicker.css';
import {
  createFileUrl,
  getEventList,
  getOrganizationList,
} from '@/services/frontend/opportunityService';
import { FILE_TYPES } from '@/constants/constants';
import { min4CharWithoutSpace } from '@/utils/regex';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { updateSearchParams } from '@/services/frontend/commonServices';

const CreateEventStep1 = ({ eventDetails, setEventDetails }: any) => {
  const dispatch = useDispatch();
  const [fileError, setFileError] = useState<string>('');
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  const [cookies] = useCookies();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: eventDetails.name,
      description: eventDetails.description,
      activities: eventDetails.activities,
      volunteerRequirements: eventDetails.volunteerRequirements,
      opportunityType: eventDetails.opportunityType,
      publishAs: cookies.userDetails.id,
    },
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const eventList = useSelector((state: any) => state.eventListReducer);
  const organizationList = useSelector(
    (state: any) => state.organizationReducer,
  );
  //   handle submit for create event
  const handleFormSubmit = async (data: any) => {
    if (!eventDetails.thumbnailFile) {
      setFileError('Please Select thumbnail');
      return;
    }
    setEventDetails({
      ...eventDetails,
      name: data.name,
      description: data.description,
      activities: data.activities,
      volunteerRequirements: data.volunteerRequirements,
      opportunityType: data.opportunityType,
      createdBy: data.publishAs,
    });
    updateSearchParams(searchParams, pathname, router, '2');
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
      setEventDetails({ ...eventDetails, thumbnailFile: file });
    }
  };

  // remove file
  const removeImg = () => {
    setFileError('Please choose thumbnail file.');
    setThumbnailUrl('');
    setEventDetails({ ...eventDetails, thumbnailFile: null });
  };

  // validate file
  const validateFile = (error: string) => {
    if (error) {
      setFileError(
        'Unsupported format. Use PNG, JPG (under 5MB), 1068x646 pixels.',
      );
      setThumbnailUrl('');
      setEventDetails({ ...eventDetails, thumbnailFile: null });
      return;
    } else {
      setFileError('');
    }
  };

  return (
    <form className="" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex gap-5 w-full py-5 flex-col relative px-5 max-h-modal overflow-auto">
        <h4 className="text-[#24181B] text-2xl font-medium">Event Details</h4>
        <div className="flex flex-col w-full relative gap-5">
          <div className="py-3 px-4 flex items-center w-full mt-1 relative bg-[#EDEBE3] rounded-2xl border border-[#E6E3D6] min-h-[60px]">
            <div className="flex-shrink-0 px-5 pl-0 text-base text-[#24181B] border-r border-[#D1CFC7]">
              Publish as
            </div>
            <div className="relative w-full">
              <select
                id="publishAs"
                {...register('publishAs')}
                className="block w-full px-5 text-base text-[#24181B] bg-[#EDEBE3] border-none rounded-2xl focus:outline-none focus:ring-0 focus:border-[#E60054] appearance-none peer"
              >
                <option value={cookies.userDetails.id} selected disabled hidden>
                  {cookies.userDetails.fullName
                    ? cookies.userDetails.fullName
                    : cookies.userDetails.email}
                </option>
                {organizationList.length ? (
                  organizationList.map((option: any, index: number) => (
                    <option key={index} value={option.id}>
                      {option.name}
                    </option>
                  ))
                ) : (
                  <option disabled>No options to choose</option>
                )}
              </select>
              <Image
                src={chevronDown}
                alt="arrow"
                className="absolute top-0 right-0 pointer-events-none"
              />
            </div>
          </div>
        </div>

        <div className="w-full rounded-2xl p-5 flex gap-5 bg-[#EDEBE3] flex-col border border-[#E6E3D6]">
          <h4 className="text-base text-[#1E1E1E] m-0">
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
                id="thumbnail"
                onTypeError={(error: any) => validateFile(error)}
                onSizeError={(error: any) => validateFile(error)}
                maxSize={5}
                multiple={false}
                className="hidden"
                handleChange={(file: any) => handleFile(file)}
                name="file"
                types={FILE_TYPES}
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
              pattern: {
                value: min4CharWithoutSpace,
                message: 'Minimum 4 characters required.',
              },
            })}
            type="text"
            id="name"
            className="block rounded-2xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
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

        <div className="relative w-full mt-1">
          <label className="text-xs text-[#24181B80] absolute top-[10px] left-5">
            Category
          </label>
          <select
            {...register('opportunityType', {
              required: 'Event Category is required',
            })}
            className="block rounded-2xl px-5 pb-2.5 pt-6 w-full text-base text-[#24181B] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
          >
            <option value="" selected disabled hidden>
              Category
            </option>
            {eventList.length > 0 ? (
              eventList.map((option: any, index: any) => (
                <option key={index} value={option.id}>
                  {option.name}
                </option>
              ))
            ) : (
              <option disabled>No options to choose</option>
            )}
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
              // pattern: {
              //   value: min4CharWithoutSpace,
              //   message: 'Minimum 4 characters required.',
              // },
            })}
            id="description"
            className="block rounded-2xl px-5 pb-2.5 h-[120px] pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
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
            className="block rounded-2xl px-5 pb-2.5 h-[120px] pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
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
            className="block rounded-2xl px-5 pb-2.5 h-[120px] pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
            placeholder=" "
          />
          <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
            Volunteer requirements (optional)
          </label>
        </div>
      </div>
      <div className="flex items-center justify-end p-6 border-t border-solid border-[#1E1E1E0D] rounded-b">
        <button
          className="text-base  w-full h-[60px] py-3 flex justify-center items-center bg-[#E60054] rounded-2xl font-medium text-white hover:bg-[#C20038]"
          type="submit"
        >
          Continue to location
        </button>
      </div>
    </form>
  );
};
export default CreateEventStep1;
