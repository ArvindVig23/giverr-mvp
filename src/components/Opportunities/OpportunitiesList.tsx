'use client';
import React, { useEffect, useState } from 'react';
import Filter from '../Opportunities/filter';
import { useCookies } from 'react-cookie';
import { useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { CurrentPage, OpportunityDetails } from '@/interface/opportunity';
import { getOpportunityList } from '@/services/frontend/opportunityService';
import CardSkeleton from '../common/loader/CardSkeleton';
import { sweetAlertToast } from '@/services/frontend/toastServices';
import OpportunityCard from '../common/cards/OpportunityCard';
import { setLoader } from '@/app/redux/slices/loaderSlice';
import { updateOpportunityList } from '@/app/redux/slices/opportunitySlice';
import { addRemoveWishlistService } from '@/services/frontend/wishlistService';

const OpportunitiesList: React.FC<CurrentPage> = ({
  currrentPage,
  setCurrentPage,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const opportunityTypeList = useSelector(
    (state: any) => state.eventListReducer,
  );
  const opportunityList = useSelector((state: any) => state.opportunityReducer);
  const [opportunityIds, setOpportunityIds] = useState('');
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const searchParams = useSearchParams();
  const [dateRange, setDateRange] = useState({
    startDate: searchParams.get('startDate'),
    endDate: searchParams.get('endDate'),
  });
  // const [limit, setLimit] = useState<number>(20);
  const [cookies] = useCookies();
  const createQueryParams = () => {
    const params = searchParams.get('opportunity');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    if (startDate && endDate) {
      setDateRange({ startDate, endDate });
    }
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
    setOpportunityIds(opportunityIds);
    (async () => {
      try {
        setLoading(true);
        const getList = await getOpportunityList(
          opportunityIds,
          currrentPage,
          dateRange.startDate ? dateRange.startDate : undefined,
          dateRange.endDate ? dateRange.endDate : undefined,
        );
        const { opportunities, page, totalRecords } = getList;
        if (page > 1) {
          dispatch(
            updateOpportunityList([...opportunityList, ...opportunities]),
          );
        } else {
          dispatch(updateOpportunityList(opportunities));
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

  //  addd remove wishlist
  const addRemoveWishlist = async (oppId: string) => {
    try {
      dispatch(setLoader(true));
      const response = await addRemoveWishlistService(oppId);
      const { opportunityId, isWishlist } = response.data;
      const updatedOppList = opportunityList.map((opp: OpportunityDetails) =>
        opp.id === opportunityId ? { ...opp, isWishlist: isWishlist } : opp,
      );
      dispatch(updateOpportunityList(updatedOppList));
      dispatch(setLoader(false));
      sweetAlertToast('success', response.message);
    } catch (error: any) {
      dispatch(setLoader(false));
      const { message } = error.data;
      sweetAlertToast('error', message);
    }
  };
  return (
    <div className="pb-16">
      <div className="flex justify-between px-5 py-2 items-center ">
        <div className="text-base text-[#1E1E1E80] font-normal">
          {totalRecords} Opportunities
        </div>
        <Filter
          opportunityIds={opportunityIds}
          setCurrentPage={setCurrentPage}
          setTotalRecords={setTotalRecords}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-5 px-5 ">
        {opportunityList && opportunityList.length > 0 ? (
          opportunityList.map((opportunity: any, index: number) => {
            return (
              <div key={index} className="relative group">
                <OpportunityCard
                  opportunity={opportunity}
                  addRemoveWishlist={addRemoveWishlist}
                />
              </div>
            );
          })
        ) : (
          <span>No Opportunitites</span>
        )}
      </div>
      {loading ? (
        <div className="grid grid-cols-5 gap-4 mx-5">
          {cards.map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : null}
      <div className="w-full text-center mt-14 inline-flex flex-wrap justify-center gap-5">
        <div className="text-[#1E1E1E80] w-full">
          Showing {opportunityList.length} of {totalRecords}
        </div>
        {opportunityList.length !== totalRecords ? (
          <button
            onClick={() => setCurrentPage(currrentPage! + 1)}
            className="text-base  w-auto h-11 px-4 py-3 inline-flex justify-center items-center bg-[#E60054] rounded-xl font-medium text-white hover:bg-[#C20038]"
          >
            Load More
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default OpportunitiesList;
