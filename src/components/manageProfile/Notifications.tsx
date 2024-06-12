import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEventList } from '@/services/frontend/opportunityService';
import { useCookies } from 'react-cookie';
import Select, { MultiValue } from 'react-select';
import { OptionType } from '@/interface/organization';
import { setLoader } from '@/app/redux/slices/loaderSlice';
import { sweetAlertToast } from '@/services/frontend/toastServices';
import { updateUsersNotificationSetting } from '@/services/frontend/userService';

const Notifications: React.FC = () => {
  const [cookies] = useCookies();
  const existingSetting = cookies.userDetails.notificationSetting;
  const [notificationValues, setNotificationValues] = useState<any>({
    allowUpdates: existingSetting.allowUpdates,
    acceptSubmission: existingSetting.acceptSubmission,
    allowVolunteeringUpdates: existingSetting.allowVolunteeringUpdates,
  });
  const defaultOption = { label: 'All Categories', value: '0' };
  const [options, setOptions] = useState<OptionType[]>([]);
  const dispatch = useDispatch();
  const opportunityTypeList = useSelector(
    (state: any) => state.eventListReducer,
  );

  // get opportunity type list
  useEffect(() => {
    if (opportunityTypeList.length === 0) {
      getEventList(dispatch);
    } // eslint-disable-next-line
  }, []);

  const [selectedOptions, setSelectedOptions] = useState<
    MultiValue<OptionType>
  >([defaultOption]);

  const handleChange = (selected: MultiValue<OptionType>) => {
    if (selected.some((option) => option.value === '0')) {
      setSelectedOptions([{ label: 'All Categories', value: '0' }]);
    } else {
      setSelectedOptions(selected);
    }
  };

  //  useEffect to create options
  useEffect(() => {
    const newOptions = opportunityTypeList.map((item: any) => ({
      value: item.id,
      label: item.name,
    }));
    setOptions([defaultOption, ...newOptions]);
    // eslint-disable-next-line
  }, [opportunityTypeList.length]);

  // handle all three checkbox 
  const handleCheckboxChange = async (event: any) => {
    const { name, checked } = event.target;
    const updatedSettings = { ...notificationValues, [name]: checked };
    try {
      dispatch(setLoader(true));
      const update = await updateUsersNotificationSetting(updatedSettings);
      console.log(update);
      setNotificationValues(update);
      dispatch(setLoader(false));
    } catch (error: any) {
      dispatch(setLoader(false));
      const { message } = error;
      sweetAlertToast('error', message);
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-[32px] font-medium mb-1 mt-0 leading-[36px]">
        Email notifications
      </h3>
      <div className="w-full">
        <div className="flex flex-wrap items-center gap-5 py-4 border-b border-[#E6E3D6] w-full">
          <div className="flex-1">
            <span className="text-[#24181B]">Updates from Giverr</span>
            <p className="m-0 text-[#24181B80] w-full">
              You will receive a notification every time the platform has news
              to share
            </p>
          </div>

          <label className="flex items-center cursor-pointer select-none text-dark">
            <div className="relative">
              <input
                onChange={handleCheckboxChange}
                defaultChecked={notificationValues?.allowUpdates}
                type="checkbox"
                name={'allowUpdates'}
                className="peer sr-only"
              />
              <div className="block border border-[#E6E3D6] h-8 rounded-full bg-[#EDEBE3] w-[52px] peer-checked:bg-[#E60054] peer-checked:border-[#E60054]"></div>
              <div className="absolute w-7 h-7 transition bg-white rounded-full dot left-[2px] top-[2px] peer-checked:translate-x-[74%] peer-checked:bg-primary"></div>
            </div>
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-5 py-4 border-b border-[#E6E3D6] w-full">
          <div className="flex-1">
            <span className="text-[#24181B]">Submission accepted</span>
          </div>

          <label className="flex items-center cursor-pointer select-none text-dark ">
            <div className="relative">
              <input
                disabled={!notificationValues.allowUpdates}
                defaultChecked={notificationValues?.acceptSubmission}
                onChange={handleCheckboxChange}
                name={'acceptSubmission'}
                type="checkbox"
                className="peer sr-only"
              />
              <div
                className={`block border border-[#E6E3D6] h-8 rounded-full bg-[#EDEBE3] w-[52px] peer-checked:bg-[#E60054] peer-checked:border-[#E60054] ${!notificationValues.allowUpdates ? 'cursor-not-allowed' : ''}`}
              ></div>
              <div
                className={`absolute w-7 h-7 transition bg-white rounded-full dot left-[2px] top-[2px] peer-checked:translate-x-[74%] peer-checked:bg-primary ${!notificationValues.allowUpdates ? 'cursor-not-allowed' : ''}`}
              ></div>
            </div>
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-5 py-4 border-b border-[#E6E3D6] w-full">
          <div className="flex-1">
            <span className="text-[#24181B]">Upcoming volunteering</span>
            <p className="m-0 text-[#24181B80] w-full">
              Stay informed with email notifications for updates on
              opportunities, including changes in dates, locations, or
              cancellations.
            </p>
          </div>

          <label className="flex items-center cursor-pointer select-none text-dark ">
            <div className="relative">
              <input
                disabled={!notificationValues.allowUpdates}
                defaultChecked={notificationValues?.allowVolunteeringUpdates}
                type="checkbox"
                name={'allowVolunteeringUpdates'}
                onChange={handleCheckboxChange}
                className="peer sr-only"
              />
              <div
                className={`block border border-[#E6E3D6] h-8 rounded-full bg-[#EDEBE3] w-[52px] peer-checked:bg-[#E60054] peer-checked:border-[#E60054] ${!notificationValues.allowUpdates ? 'cursor-not-allowed' : ''}`}
              ></div>
              <div
                className={`absolute w-7 h-7 transition bg-white rounded-full dot left-[2px] top-[2px] peer-checked:translate-x-[74%] peer-checked:bg-primary ${!notificationValues.allowUpdates ? 'cursor-not-allowed' : ''}`}
              ></div>
            </div>
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-5 py-4  w-full">
          <div className="flex-1">
            <span className="text-[#24181B]">Volunteer oportunities</span>
            <p className="m-0 text-[#24181B80] w-full">
              Stay up-to-date when a new opportunity of the selected categories
              appears
            </p>
          </div>
        </div>

        <div className="relative w-full mt-1">
          <label className="text-xs text-[#24181B80] absolute top-[10px] left-5">
            Categories
          </label>
          <Select
            className="basic-multi-select block rounded-xl px-5 pb-2 pt-6 w-full text-base text-[#24181B] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
            isMulti
            value={selectedOptions}
            onChange={handleChange}
            options={options}
            classNamePrefix="select"
          />
        </div>
      </div>
    </div>
  );
};

export default Notifications;
