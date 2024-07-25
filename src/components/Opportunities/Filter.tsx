'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image'; // Import Image from next/image

import physical from '/public/images/physical.svg';
import virtual from '/public/images/virtual.svg';
import check from '/public/images/check.svg';
import Datepicker from 'react-tailwindcss-datepicker';
import { getOpportunityList } from '@/services/frontend/opportunityService';
import { useDispatch, useSelector } from 'react-redux';
import { updateOpportunityList } from '@/app/redux/slices/opportunitySlice';
import { sweetAlertToast } from '@/services/frontend/toastServices';
import { OpportunityDetails } from '@/interface/opportunity';
import { setLoader } from '@/app/redux/slices/loaderSlice';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Filter = (props: {
  opportunityIds: string;
  setCurrentPage: Function;
  setTotalRecords: Function;
  setShowModal: Function;
}) => {
  const { opportunityIds, setCurrentPage, setTotalRecords, setShowModal } =
    props;
  const dispatch = useDispatch();
  const [totalCount, setTotalCount] = useState(0);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [dateRange, setDateRange] = useState({
    startDate: searchParams.get('startDate') || '',
    endDate: searchParams.get('endDate') || '',
  });
  const [opportunities, setOpportunities] = useState<OpportunityDetails[]>([]);
  const [page, setPage] = useState<number>(0);
  const loading = useSelector((state: any) => state.loaderReducer);
  const [firstTime, setFirstTime] = useState(true); // Flag to check whether we are loading filter for the first time to avoid unnecessary API call.
  const [locationType, setLocationType] = useState<string[]>([]);
  const [eventType, setEventType] = useState<string[]>([]);

  const handleRangeChange = (range: any) => {
    setFirstTime(false);
    setDateRange(range);
  };
  useEffect(() => {
    if (!firstTime) {
      (async () => {
        try {
          dispatch(setLoader(true));
          const getList = await getOpportunityList(
            opportunityIds,
            1,
            dateRange?.startDate?.length ? dateRange.startDate : undefined,
            dateRange?.endDate?.length ? dateRange.endDate : undefined,
            locationType.length ? locationType.join(',') : undefined,
            eventType.length ? eventType.join(',') : undefined,
          );
          const { opportunities, page, totalRecords } = getList;
          setOpportunities(opportunities);
          setPage(page);
          setTotalCount(totalRecords);
        } catch (error: any) {
          console.log('== err ==', error);
          const { message } = error;
          sweetAlertToast('error', message);
        } finally {
          dispatch(setLoader(false));
        }
      })();
    }
    //eslint-disable-next-line
  }, [dateRange.startDate, dateRange.endDate, locationType, eventType]);

  const handleShowRecords = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (dateRange.startDate && dateRange.endDate) {
      params.set('startDate', dateRange.startDate);
      params.set('endDate', dateRange.endDate);
    } else {
      if (params.has('startDate')) params.set('startDate', '');
      if (params.has('endDate')) params.set('endDate', '');
    }
    if (locationType.length > 0) {
      params.set('location', locationType.join(','));
    } else {
      params.delete('location');
    }
    if (eventType.length > 0) {
      params.set('event', eventType.join(','));
    } else {
      params.delete('event');
    }
    router.push(pathname + '?' + params.toString());
    dispatch(updateOpportunityList(opportunities));
    setCurrentPage(page);
    setTotalRecords(totalCount);
    setShowModal(false);
  };

  const handleLocationClick = (value: string) => {
    setLocationType((prevLocationType: any) => {
      let newLocationType: string[];
      if (prevLocationType.includes(value)) {
        // Remove the value if it already exists
        newLocationType = prevLocationType.filter(
          (type: string) => type !== value,
        );
      } else {
        // Add the value if it doesn't exist
        newLocationType = [...prevLocationType, value];
      }
      return newLocationType;
    });
    setFirstTime(false);
  };

  const handleCheckboxChange = (event: any, value: string) => {
    setEventType((prevLocationType) => {
      let newLocationType: string[];
      if (event.target.checked) {
        // Add 'SHOWUP' if it doesn't exist
        newLocationType = prevLocationType.includes(value)
          ? prevLocationType
          : [...prevLocationType, value];
      } else {
        // Remove 'SHOWUP' if it exists
        newLocationType = prevLocationType.filter((type) => type !== value);
      }
      return newLocationType;
    });
    setFirstTime(false);
  };

  useEffect(() => {
    const locationParam = searchParams.get('location');
    if (locationParam) {
      console.log('inside locationparm');

      setLocationType(locationParam.split(','));
    }

    const eventTypeParam = searchParams.get('event');
    if (eventTypeParam) {
      console.log('inside eventtpy');

      setEventType(eventTypeParam.split(','));
    } // eslint-disable-next-line
  }, []);
  return (
    <div>
      <div className="flex gap-10 md:gap-[60px] w-full p-4 md:p-5 flex-col relative  max-h-modal overflow-auto">
        <div className="w-full flex flex-col gap-4 md:gap-5">
          <h4 className="text-[#24181B] text-2xl font-medium">Event Details</h4>

          <label
            className="relative flex items-center rounded-full cursor-pointer w-full gap-2"
            htmlFor="check"
          >
            <input
              onChange={(e) => handleCheckboxChange(e, 'SHOW_UP')}
              checked={eventType.includes('SHOW_UP')}
              type="checkbox"
              className="before:content[''] bg-white peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-[#E6E3D6] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#E60054] checked:bg-[#E60054] checked:before:bg-gray-900 before:w-5 before:h-5"
              id="check"
            />
            <span className="absolute left-[11px] text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
              <Image src={check} alt="check" />
            </span>
            <span className="mt-px font-light text-[#24181B] cursor-pointer select-none">
              Show Up
            </span>
          </label>

          <label
            className="relative flex items-center rounded-full cursor-pointer w-full gap-2"
            htmlFor="check1"
          >
            <input
              checked={eventType.includes('PRE_ENTERY')}
              onChange={(e) => handleCheckboxChange(e, 'PRE_ENTERY')}
              type="checkbox"
              className="before:content[''] bg-white peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-[#E6E3D6] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#E60054] checked:bg-[#E60054] checked:before:bg-gray-900 before:w-5 before:h-5"
              id="check1"
            />
            <span className="absolute left-[11px] text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
              <Image src={check} alt="check1" />
            </span>
            <span className="mt-px font-light text-[#24181B] cursor-pointer select-none">
              Pre-Entry
            </span>
          </label>
        </div>
        <div className="w-full flex flex-col gap-5">
          <h4 className="text-[#24181B] text-2xl font-medium">Date</h4>
          <div className="relative w-full datePicker">
            <Datepicker
              useRange={false}
              value={dateRange}
              onChange={handleRangeChange}
              placeholder="Select Date"
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-5">
          <h4 className="text-[#24181B] text-2xl font-medium">Location</h4>

          <div className="flex gap-4 md:gap-5">
            <div
              className={`w-40 p-4 rounded-2xl border ${locationType.includes('PHYSICAL') ? 'border-[#000000]' : 'border-[#E6E3D6]'}   h-[120px] flex flex-col justify-between hover:bg-[#EDEBE3] cursor-pointer`}
              onClick={() => handleLocationClick('PHYSICAL')}
            >
              <Image src={physical} alt="physical" />
              <h3 className="m-0 text-base text-[#24181B]">
                Physical location
              </h3>
            </div>

            <div
              className={`w-40 p-4 rounded-2xl border ${locationType.includes('VIRTUAL') ? 'border-[#000000]' : 'border-[#E6E3D6]'}  h-[120px] flex flex-col justify-between hover:bg-[#EDEBE3] cursor-pointer`}
              onClick={() => handleLocationClick('VIRTUAL')}
            >
              <Image src={virtual} alt="physical" />
              <h3 className="m-0 text-base text-[#24181B]">Virtual</h3>
            </div>
          </div>
        </div>
      </div>
      {!loading ? (
        <div className="flex items-center justify-end p-4 md:p-6 border-t border-solid border-[#1E1E1E0D] rounded-b">
          <button
            disabled={!totalCount}
            onClick={() => (!totalCount ? null : handleShowRecords())}
            className={`${totalCount > 0 ? '' : 'cursor-not-allowed '}text-base  w-full h-[60px] py-3 flex justify-center items-center bg-[#E60054] rounded-xl font-medium text-white hover:bg-[#C20038]`}
            type="submit"
          >
            {totalCount
              ? `Show ${totalCount} opportunities.`
              : 'No Record Found.'}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Filter;
