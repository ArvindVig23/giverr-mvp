import React, { useEffect, useState } from 'react';
import OpportunityCard from '../common/cards/OpportunityCard';
import CardSkeleton from '../common/loader/CardSkeleton';
import { sweetAlertToast } from '@/services/frontend/toastServices';
import {
  addRemoveWishlistService,
  getWishlistList,
} from '@/services/frontend/wishlistService';
import { useDispatch } from 'react-redux';
import { setLoader } from '@/app/redux/slices/loaderSlice';

const WishlistOpportunity: React.FC = () => {
  const [opportunityList, setOpportunityList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currrentPage, setCurrentPage] = useState<number>(1);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const dispatch = useDispatch();
  const cards = Array(5).fill(null);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const getList = await getWishlistList(currrentPage);
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
  }, [currrentPage]);

  const addRemoveWishlist = async (oppId: string) => {
    try {
      dispatch(setLoader(true));
      const response = await addRemoveWishlistService(oppId);
      const { opportunityId, isWishlist } = response.data;
      if (!isWishlist) {
        setOpportunityList((prevList: any[]) =>
          prevList.filter((opp) => opp.id !== opportunityId),
        );
        setTotalRecords(totalRecords - 1);
      }

      dispatch(setLoader(false));
      sweetAlertToast('success', response.message);
    } catch (error: any) {
      dispatch(setLoader(false));
      const { message } = error.data;
      sweetAlertToast('error', message);
    }
  };
  return (
    <div>
      {' '}
      <div className="pb-16">
        <div className="flex justify-between px-5 py-2 items-center ">
          <div className="text-base text-[#1E1E1E80] font-normal">
            {totalRecords && opportunityList?.length
              ? `${totalRecords} Opportunities`
              : null}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-5 px-5 ">
          {opportunityList && opportunityList.length > 0 ? (
            opportunityList.map((opportunity: any, index: number) => {
              return (
                <div
                  key={index}
                  className={`relative group ${(opportunity.status === 'PENDING' || opportunity.status === 'REJECTED') && 'opacity-60'}`}
                >
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
        {loading && (
          <div className="grid grid-cols-5 gap-4 mx-5">
            {cards.map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        )}
        {opportunityList?.length ? (
          <div className="w-full text-center mt-14 inline-flex flex-wrap justify-center gap-5">
            <div className="text-[#1E1E1E80] w-full">
              Showing {opportunityList?.length} of {totalRecords}
            </div>
            {opportunityList?.length !== totalRecords && (
              <button
                onClick={() => setCurrentPage(currrentPage! + 1)}
                className="text-base  w-auto h-11 px-4 py-3 inline-flex justify-center items-center bg-[#E60054] rounded-xl font-medium text-white hover:bg-[#C20038]"
              >
                Load More
              </button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default WishlistOpportunity;
