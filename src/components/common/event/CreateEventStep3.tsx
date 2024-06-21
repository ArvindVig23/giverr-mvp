'use client';
import callApi from '@/services/frontend/callApiService';
import { sweetAlertToast } from '@/services/frontend/toastServices';
// import { eventFrequency } from '@/utils/staticDropdown/dropdownOptions';
import moment from 'moment-timezone';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
// import DatePicker from 'react-datepicker';
// import { FileUploader } from 'react-drag-drop-files';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import chevronDown from '/public/images/chevron-down.svg';
import longarrow from '/public/images/arrow-right.svg';
import Image from 'next/image';
import 'react-datepicker/dist/react-datepicker.css';
import {
  getEventList,
  getOrganizationList,
  uploadFile,
} from '@/services/frontend/opportunityService';
// import { FILE_TYPES } from '@/constants/constants';
import { setLoader } from '@/app/redux/slices/loaderSlice';
// import { min4CharWithoutSpace, websiteLinkRegex } from '@/utils/regex';
import { useRouter } from 'next/navigation';

const CreateEventStep3 = ({ setShowModal }: any) => {
  const [openTab, setOpenTab] = React.useState(1);
  const dispatch = useDispatch();
  const [thumbnailFile, setThumbnailFile] = useState<any>('');
  const [, setFileError] = useState<string>('');
  const [, setThumbnailUrl] = useState<string>('');
  const [cookies] = useCookies();
  const { handleSubmit, watch, reset, setValue } = useForm({
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
      publishAs: cookies.userDetails.id,
    },
  });
  const radioValue = watch('registrationType');
  const router = useRouter();
  const eventList = useSelector((state: any) => state.eventListReducer);
  const organizationList = useSelector(
    (state: any) => state.organizationReducer,
  );
  //   handle submit for create event
  const handleFormSubmit = async (data: any) => {
    if (!thumbnailFile) {
      setFileError('Please Select thumbnail');
      return;
    }
    dispatch(setLoader(true));
    if (thumbnailFile) {
      const filePathName = `opportunities/${thumbnailFile.name}`;
      const pathOfFile = await uploadFile(thumbnailFile, filePathName);
      data.imageLink = `${pathOfFile}?alt=media`;
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
    if (data.publishAs !== cookies.userDetails.id) {
      data.organizationId = data.publishAs;
    }
    try {
      const response = await callApi('/opportunity', 'post', data);
      const { message } = response;
      sweetAlertToast('success', message, 1000);
      reset();
      setShowModal(false);
      setFileError('');
      setThumbnailUrl('');
      setThumbnailFile(null);
      dispatch(setLoader(false));
      router.push('/');
    } catch (error: any) {
      dispatch(setLoader(false));
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

  // to set the website link value to empty
  useEffect(() => {
    if (radioValue !== '3') {
      setValue('registrationWebsiteLink', '');
    } //eslint-disable-next-line
  }, [radioValue]);

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
                      <label className="text-xs text-[#24181B80] absolute top-[10px] left-5 z-10">
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
                      <label className="text-xs text-[#24181B80] absolute top-[10px] left-5 z-10">
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
                      <label className="text-xs text-[#24181B80] absolute top-[10px] left-5 z-10">
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
