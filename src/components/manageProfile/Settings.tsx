import React, { useState } from 'react';
import Image from 'next/image'; // Import Image from next/image
import chevronDown from '/public/images/chevron-down.svg';
import { useCookies } from 'react-cookie';
import moment from 'moment-timezone';
import { TimeZoneSettings } from '@/interface/settings';
import { useDispatch } from 'react-redux';
import { setLoader } from '@/app/redux/slices/loaderSlice';
import { updateUserTimezoneSetting } from '@/services/frontend/userService';
import { sweetAlertToast } from '@/services/frontend/toastServices';
const Settings: React.FC = () => {
  const currentMonthDateYear = moment().format('MMMM DD, YYYY');
  const currentDayMonthYear = moment().format('DD MMMM, YYYY');
  const time12Hour = moment().format('h:mm A');
  const time24Hour = moment().format('HH:mm');
  const [cookies] = useCookies();
  const initialTimezoneSettings = cookies.userDetails.timeZoneSettings;

  const [timeZoneSettings, setTimeZoneSettings] = useState<TimeZoneSettings>({
    id: initialTimezoneSettings?.id,
    autoTimeZone: initialTimezoneSettings?.autoTimeZone,
    istwentyFourHourTimeFormat:
      initialTimezoneSettings?.istwentyFourHourTimeFormat,
    isDayMonthYearDateFormat: initialTimezoneSettings?.isDayMonthYearDateFormat,
  });
  const dispatch = useDispatch();
  const handleOnChange = async (name: keyof TimeZoneSettings) => {
    try {
      const data = {
        ...timeZoneSettings,
        [name]: !timeZoneSettings[name],
      };
      dispatch(setLoader(true));
      const response = await updateUserTimezoneSetting(data);
      console.log(response, 'response');
      setTimeZoneSettings(response.data);
      dispatch(setLoader(false));
    } catch (error: any) {
      const { message } = error;
      sweetAlertToast('error', message);
      dispatch(setLoader(false));
    }
    // setTimeZoneSettings({
    //   ...timeZoneSettings,
    //   [name]: !timeZoneSettings[name],
    // });
  };

  return (
    <div className="w-full">
      <h3 className="text-[32px] font-medium mb-1 mt-0 leading-[36px]">
        Settings
      </h3>
      <div className="w-full">
        <div className="flex flex-wrap items-center gap-5 py-4 w-full">
          <div className="flex-1">
            <span className="text-[#24181B]">Set timezone automatically</span>
            <p className="m-0 text-[#24181B80] w-full">
              Giverr uses your time zone to send notification emails and for
              opportunities times in the feed
            </p>
          </div>

          <label className="flex items-center cursor-pointer select-none text-dark ">
            <div className="relative">
              <input
                defaultChecked={timeZoneSettings?.autoTimeZone}
                onChange={() => handleOnChange('autoTimeZone')}
                type="checkbox"
                id="autoTimeZone"
                className="peer sr-only"
              />
              <div className="block border border-[#E6E3D6] h-8 rounded-full bg-[#EDEBE3] w-[52px] peer-checked:bg-[#E60054] peer-checked:border-[#E60054]"></div>
              <div className="absolute w-7 h-7 transition bg-white rounded-full dot left-[2px] top-[2px] peer-checked:translate-x-[74%] peer-checked:bg-primary"></div>
            </div>
          </label>
        </div>

        <div className="relative w-full mt-1">
          <label className="text-xs text-[#24181B80] absolute top-[10px] left-5">
            Timezone
          </label>
          <select
            disabled={timeZoneSettings?.autoTimeZone}
            className="block rounded-xl px-5 pb-2 pt-6 w-full text-base text-[#24181B] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
          >
            <option>Los Angeles, PST</option>
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
      </div>

      <div className="w-full mt-[50px]">
        <div className="flex flex-wrap items-center gap-5 pb-4 w-full">
          <div className="flex-1">
            <span className="text-[#24181B]">Time format</span>
            <p className="m-0 text-[#24181B80] w-full">
              Choose the way times are displayed
            </p>
          </div>
        </div>

        <div className="flex gap-5 w-full flex-col">
          <label className="relative w-full border border-[#E6E3D6] inline-flex rounded-xl bg-[#EDEBE3] p-4 cursor-pointer">
            <div className="flex items-center text-[#24181B] gap-2 flex-1">
              <input
                value={'false'}
                checked={timeZoneSettings.istwentyFourHourTimeFormat === false}
                onChange={() => handleOnChange('istwentyFourHourTimeFormat')}
                className="hidden peer"
                name="istwentyFourHourTimeFormat"
                type="radio"
              />
              <div className="border border[#E6E3D6] w-6 h-6 bg-white rounded-full relative flex items-center justify-center peer-checked:bg-[#E60054] peer-checked:border-[#E60054]">
                <span className="w-2 h-2 absolute bg-white rounded-md peer-checked:bg-[#fff]"></span>
              </div>
              12 hour format
            </div>
            <span className="ml-auto text-[#24181B80]">{time12Hour}</span>
          </label>
          <label className="relative w-full border border-[#E6E3D6] inline-flex rounded-xl bg-[#EDEBE3] p-4 cursor-pointer">
            <div className="flex items-center text-[#24181B] gap-2 flex-1">
              <input
                value={'true'}
                checked={timeZoneSettings.istwentyFourHourTimeFormat === true}
                onChange={() => handleOnChange('istwentyFourHourTimeFormat')}
                className="hidden peer"
                name="istwentyFourHourTimeFormat"
                type="radio"
              />
              <div className="border border[#E6E3D6] w-6 h-6 bg-white rounded-full relative flex items-center justify-center peer-checked:bg-[#E60054] peer-checked:border-[#E60054]">
                <span className="w-2 h-2 absolute bg-white rounded-md peer-checked:bg-[#fff]"></span>
              </div>
              24 hour format
            </div>
            <span className="ml-auto text-[#24181B80]">{time24Hour}</span>
          </label>
        </div>
      </div>

      <div className="w-full mt-[50px]">
        <div className="flex flex-wrap items-center gap-5 pb-4 w-full">
          <div className="flex-1">
            <span className="text-[#24181B]">Date format</span>
            <p className="m-0 text-[#24181B80] w-full">
              Choose the way dates are displayed
            </p>
          </div>
        </div>

        <div className="flex gap-5 w-full flex-col">
          <label className="relative w-full border border-[#E6E3D6] inline-flex rounded-xl bg-[#EDEBE3] p-4 cursor-pointer">
            <div className="flex items-center text-[#24181B] gap-2 flex-1">
              <input
                value={'false'}
                onChange={() => handleOnChange('isDayMonthYearDateFormat')}
                checked={timeZoneSettings.isDayMonthYearDateFormat === true}
                className="hidden peer"
                name="isDayMonthYearDateFormat"
                type="radio"
              />
              <div className="border border[#E6E3D6] w-6 h-6 bg-white rounded-full relative flex items-center justify-center peer-checked:bg-[#E60054] peer-checked:border-[#E60054]">
                <span className="w-2 h-2 absolute bg-white rounded-md peer-checked:bg-[#fff]"></span>
              </div>
              Day-Month-Year
            </div>
            <span className="ml-auto text-[#24181B80]">
              {currentDayMonthYear}
            </span>
          </label>
          <label className="relative w-full border border-[#E6E3D6] inline-flex rounded-xl bg-[#EDEBE3] p-4 cursor-pointer">
            <div className="flex items-center text-[#24181B] gap-2 flex-1">
              <input
                value={'true'}
                onChange={() => handleOnChange('isDayMonthYearDateFormat')}
                checked={timeZoneSettings.isDayMonthYearDateFormat === false}
                className="hidden peer"
                name="isDayMonthYearDateFormat"
                type="radio"
              />
              <div className="border border[#E6E3D6] w-6 h-6 bg-white rounded-full relative flex items-center justify-center peer-checked:bg-[#E60054] peer-checked:border-[#E60054]">
                <span className="w-2 h-2 absolute bg-white rounded-md peer-checked:bg-[#fff]"></span>
              </div>
              Month-Day-Year
            </div>
            <span className="ml-auto text-[#24181B80]">
              {currentMonthDateYear}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Settings;
