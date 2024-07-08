'use client';
import callApi from '@/services/frontend/callApiService';
import { sweetAlertToast } from '@/services/frontend/toastServices';
import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import { setLoader } from '@/app/redux/slices/loaderSlice';
import { websiteLinkRegex } from '@/utils/regex';
import { uploadFile } from '@/services/frontend/opportunityService';
import { CreateOppDetails } from '@/interface/opportunity';
import { useRouter, useSearchParams } from 'next/navigation';
import { submitEventState } from '@/utils/initialStates/submitOppInitalState';
import { updateSubmitOppDetails } from '@/app/redux/slices/submitOpportunity';

const CreateEventStep4 = ({
  setThankYouModal,
}: {
  setThankYouModal?: Function;
}) => {
  const eventDetails = useSelector((state: any) => state.submitOppReducer);
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [cookies] = useCookies();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      registrationType: eventDetails.registrationType || 'GIVER_PLATFORM',
      registrationWebsiteLink: eventDetails.registrationWebsiteLink || '',
      spots: eventDetails.spots || '',
    },
  });
  const radioValue = watch('registrationType');
  const removeExtraPhysicalLocation = (arr: any) => {
    return arr.filter((obj: any) => {
      const allValuesZero = Object.values(obj).every((val) => !val);
      return !allValuesZero;
    });
  };
  //   handle submit for create event
  const createOpportunity = async (data: any) => {
    dispatch(setLoader(true));
    try {
      //  created this form data to avoid unessary fields to go in payload like file
      const formData: CreateOppDetails = {
        name: eventDetails.name,
        description: eventDetails.description,
        activities: eventDetails.activities || '',
        volunteerRequirements: eventDetails.volunteerRequirements || '',
        opportunityType: eventDetails.opportunityType,
        createdBy: eventDetails.createdBy,
        organizationId:
          eventDetails.createdBy === cookies.userDetails.id
            ? ''
            : eventDetails.createdBy,
        locationType: eventDetails.locationType,
        virtualLocationLink: eventDetails.virtualLocationLink || '',
        physicalLocations: removeExtraPhysicalLocation(
          eventDetails.physicalLocations,
        ),
        selectedDate: eventDetails.selectedDate,
        minHour: eventDetails.minHour,
        maxHour: eventDetails.maxHour,
        startTime: eventDetails.startTime,
        endTime: eventDetails.endTime,
        endDate: eventDetails.endDate,
        frequency: eventDetails.frequency,
        type: eventDetails.type,
        registrationType: data.registrationType,
        registrationWebsiteLink: data.registrationWebsiteLink,
        spots: data.spots,
        commitment: eventDetails.commitment,
      };
      if (eventDetails.thumbnailFile) {
        const filePathName = `opportunities/${eventDetails.thumbnailFile.name}`;
        const pathOfFile = await uploadFile(
          eventDetails.thumbnailFile,
          filePathName,
        );
        formData.imageLink = pathOfFile ? `${pathOfFile}?alt=media` : '';
      }
      await callApi('/opportunity', 'post', formData);
      setThankYouModal && setThankYouModal(true);
      dispatch(setLoader(false));
    } catch (error: any) {
      dispatch(setLoader(false));
      const { message } = error.data;
      sweetAlertToast('error', message);
    }
  };

  // to set the website link value to empty
  useEffect(() => {
    if (radioValue !== 'WEBSITE_LINK') {
      setValue('registrationWebsiteLink', '');
    }
    if (radioValue !== 'GIVER_PLATFORM') {
      setValue('spots', '');
    }
    //eslint-disable-next-line
  }, [radioValue]);

  const submitEvent = (data: any) => {
    if (eventDetails.id) {
      updateDetails(data);
    } else {
      createOpportunity(data);
    }
  };

  const updateDetails = async (data: any) => {
    try {
      dispatch(setLoader(true));
      const formData: CreateOppDetails = {
        name: eventDetails.name,
        description: eventDetails.description,
        activities: eventDetails.activities || '',
        volunteerRequirements: eventDetails.volunteerRequirements || '',
        opportunityType: eventDetails.opportunityType,
        createdBy: eventDetails.createdBy,
        organizationId:
          eventDetails.createdBy === cookies.userDetails.id
            ? ''
            : eventDetails.createdBy,
        locationType: eventDetails.locationType,
        virtualLocationLink: eventDetails.virtualLocationLink || '',
        physicalLocations: removeExtraPhysicalLocation(
          eventDetails.physicalLocations,
        ),
        selectedDate: eventDetails.selectedDate,
        minHour: eventDetails.minHour,
        maxHour: eventDetails.maxHour,
        startTime: eventDetails.startTime,
        endTime: eventDetails.endTime,
        endDate: eventDetails.endDate,
        frequency: eventDetails.frequency,
        type: eventDetails.type,
        registrationType: data.registrationType,
        registrationWebsiteLink: data.registrationWebsiteLink,
        spots: data.spots,
        commitment: eventDetails.commitment,
        commitmentId: eventDetails.commitmentId,
        imageLink: eventDetails.imageLink,
      };
      if (eventDetails.thumbnailFile) {
        const filePathName = `opportunities/${eventDetails.thumbnailFile.name}`;
        const pathOfFile = await uploadFile(
          eventDetails.thumbnailFile,
          filePathName,
        );
        formData.imageLink = pathOfFile ? `${pathOfFile}?alt=media` : '';
      }

      const response = await callApi(
        `/opportunity/${eventDetails.id}`,
        'put',
        formData,
      );
      const { message } = response;
      sweetAlertToast('success', message);
      dispatch(setLoader(false));
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.delete('submit-event');
      current.delete('step');
      current.delete('commitment');
      const search = current.toString();
      const query = search ? `?${search}` : '';
      router.push(`${window.location.pathname}${query}`);
      setThankYouModal && setThankYouModal(true);
      dispatch(updateSubmitOppDetails(submitEventState));
    } catch (error: any) {
      dispatch(setLoader(false));
      const { message } = error.data;
      sweetAlertToast('error', message);
    }
  };
  return (
    <form className="" onSubmit={handleSubmit(submitEvent)}>
      <div className="flex gap-5 w-full py-5 flex-col relative px-5 max-h-modal overflow-auto">
        <h4 className="text-[#24181B] text-2xl font-medium">
          Registration Type
        </h4>

        <div className="w-full flex flex-col gap-5">
          <div className="w-full border border-[#E6E3D6] rounded-xl overflow-hidden">
            <label
              className={`relative w-full  border-[#1E1E1E0D] inline-flex  p-4 d-flex items-center gap-5 cursor-pointer ${radioValue === 'GIVER_PLATFORM' ? '' : 'border-b'}`}
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
                value={'GIVER_PLATFORM'}
              />
              <div className="ml-auto border border[#E6E3D6]  min-w-6 w-6 h-6 bg-white rounded-full relative flex items-center justify-center peer-checked:bg-[#E60054] peer-checked:border-[#E60054]">
                <span className="w-2 h-2 absolute bg-white rounded-md peer-checked:bg-[#fff]"></span>
              </div>
            </label>
            {radioValue === 'GIVER_PLATFORM' ? (
              <div className="px-5 pb-5 border-b border-[#1E1E1E0D] ">
                <div className="relative w-full ">
                  <input
                    min={0}
                    disabled={radioValue !== 'GIVER_PLATFORM'}
                    {...register('spots', {
                      required:
                        radioValue === 'GIVER_PLATFORM'
                          ? 'Spots are required.'
                          : false,
                    })}
                    type="number"
                    id="spots"
                    className="no-spinners block rounded-2xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="spots"
                    className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                  >
                    Number of spots
                  </label>
                  {errors.spots && (
                    <span className="text-red-500">
                      {(errors.spots as { message: string }).message}
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
                value={'SHOW_UP'}
              />
              <div className="ml-auto border border[#E6E3D6]  min-w-6 w-6 h-6 bg-white rounded-full relative flex items-center justify-center peer-checked:bg-[#E60054] peer-checked:border-[#E60054]">
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
                value={'WEBSITE_LINK'}
              />
              <div className="ml-auto border border[#E6E3D6]  min-w-6 w-6 h-6 bg-white rounded-full relative flex items-center justify-center peer-checked:bg-[#E60054] peer-checked:border-[#E60054]">
                <span className="w-2 h-2 absolute bg-white rounded-md peer-checked:bg-[#fff]"></span>
              </div>
            </label>

            {radioValue === 'WEBSITE_LINK' ? (
              <div className="px-5 mb-5">
                <div className="relative w-full ">
                  <input
                    disabled={radioValue !== 'WEBSITE_LINK'}
                    {...register('registrationWebsiteLink', {
                      required:
                        radioValue === 'WEBSITE_LINK'
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
                  <label
                    htmlFor="registrationWebsiteLink"
                    className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                  >
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
          {eventDetails.id ? 'Update' : 'Submit'} event
        </button>
      </div>
    </form>
  );
};
export default CreateEventStep4;
