'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Filter from '../Opportunities/filter';
import heart from '/public/images/heart.svg';
import stateFill from '/public/images/state=filled.svg';
import thumb from '/public/images/thumb.jpg';
import { useCookies } from 'react-cookie';
import {
  encodeUrl,
  getFormattedLocalTime,
} from '@/services/frontend/commonServices';
import { useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { CurrentPage } from '@/interface/opportunity';
import { FIRESTORE_IMG_BASE_START_URL } from '@/constants/constants';
import { getOpportunityList } from '@/services/frontend/opportunityService';
import CardSkeleton from '../common/loader/CardSkeleton';
import { sweetAlertToast } from '@/services/frontend/toastServices';
import { Tooltip } from '@material-tailwind/react';

const OpportunitiesList: React.FC<CurrentPage> = ({
  currrentPage,
  setCurrentPage,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const opportunityTypeList = useSelector(
    (state: any) => state.eventListReducer,
  );
  const [opportunityList, setOpportunityList] = useState<any>([]);

  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [isActive, setIsActive] = useState(false);
  // const [limit, setLimit] = useState<number>(20);
  const [cookies] = useCookies();
  const handleClick = () => {
    setIsActive(!isActive);
  };
  const searchParams = useSearchParams();
  const createQueryParams = () => {
    const params = searchParams.get('opportunity');

    if (!params) {
      return '';
    }
    const parmasArray = params.split(',');

    const getFiltersOpportunities = opportunityTypeList.filter((record: any) =>
      parmasArray.includes(record.slug),
    );
    const getFilterIds = getFiltersOpportunities.map((rec: any) => rec.id);
    if (getFilterIds.length > 0) {
      return getFilterIds.join(',');
    }
  };
  useEffect(() => {
    const opportunityIds: string = createQueryParams();
    (async () => {
      try {
        setLoading(true);
        const getList = await getOpportunityList(opportunityIds, currrentPage);
        const { opportunities, page, totalRecords } = getList;
        if (page > 1) {
          setOpportunityList([...opportunityList, ...opportunities]);
        } else {
          setOpportunityList(opportunities);
        }
        setCurrentPage(page);
        setTotalRecords(totalRecords);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        const { message } = error;
        sweetAlertToast('error', message);
      }
    })(); //eslint-disable-next-line
  }, [
    cookies.userDetails,
    currrentPage,
    searchParams,
    opportunityTypeList.length,
  ]);
  const cards = Array(5).fill(null);
  return (
    <div className="pb-16">
      <div className="flex justify-between px-5 py-2 items-center ">
        <div className="text-base text-[#1E1E1E80] font-normal">
          {totalRecords} Opportunities
        </div>
        <Filter />
      </div>

      {loading ? (
        <div className="grid grid-cols-5 gap-4 mx-5">
          {cards.map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-5 px-5 ">
          {opportunityList && opportunityList.length > 0 ? (
            opportunityList.map((opportunity: any, index: number) => {
              return (
                <div key={index} className="relative group">
                  <div className="flex justify-between items-center gap-2 absolute left-2.5 right-2.5 top-2.5">
                    <div className="text-sm font-medium inline-flex py-[5px] px-3 gap-[5px] border border-[#FFFFFF80] bg-[#FFFFFFE5] rounded-full items-center">
                      <span className="bg-[#FFC430] w-2 h-2 rounded-full"></span>{' '}
                      Pre-Entry
                    </div>
                    <div
                      className="relative cursor-pointer"
                      onClick={handleClick}
                    >
                      <Image src={isActive ? stateFill : heart} alt="heart" />
                    </div>
                  </div>

                  <Link
                    href={`/opportunity/${opportunity.id}`}
                    className="bg-white border border-white overflow-hidden rounded-[14px] group-hover:border-[#E6E3D6] group-hover:bg-inherit inline-block w-full"
                  >
                    <div className="overflow-hidden rounded-[14px]">
                      <Image
                        className="w-full  rounded-[14px]"
                        src={`${FIRESTORE_IMG_BASE_START_URL}${encodeUrl(opportunity.imageLink)}`}
                        alt={opportunity.name}
                        width={399}
                        height={250}
                      />
                    </div>
                    <div className="flex flex-col p-5">
                      {opportunity.name.length > 15 ? (
                        <Tooltip content={opportunity.name}>
                          <h4 className="font-medium text-base overflow-hidden text-ellipsis whitespace-nowrap">
                            {opportunity.name.slice(0, 15)}{' '}
                            {opportunity.name.length > 15 && '...'}
                          </h4>
                        </Tooltip>
                      ) : (
                        <h4 className="font-medium text-base overflow-hidden text-ellipsis whitespace-nowrap">
                          {opportunity.name}
                        </h4>
                      )}
                      <span className="text-base">
                        {getFormattedLocalTime(opportunity.eventDate)}
                      </span>
                      <div className="mt-1 text-[#1E1E1E80]">
                        {opportunity.location}
                      </div>

                      <div className="flex items-center mt-5 gap-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden ">
                          <Image
                            src={thumb}
                            className="object-cover w-full h-full"
                            alt="thumbnail"
                          />
                        </div>
                        Planet Caretakers
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })
          ) : (
            <span>No Opportunitites</span>
          )}
        </div>
      )}
      <div className="w-full text-center mt-14 inline-flex flex-wrap justify-center gap-5">
        <div className="text-[#1E1E1E80] w-full">
          Showing {opportunityList.length} of {totalRecords}
        </div>
        {opportunityList.length !== totalRecords && (
          <button
            onClick={() => setCurrentPage(currrentPage! + 1)}
            className="text-base  w-auto h-11 px-4 py-3 inline-flex justify-center items-center bg-[#E60054] rounded-xl font-medium text-white hover:bg-[#C20038]"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default OpportunitiesList;
