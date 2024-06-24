'use client';
import React, { useEffect, useState } from 'react';
import Filter from './Filter';
import { useCookies } from 'react-cookie';
import { usePathname, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { CurrentPage, OpportunityDetails } from '@/interface/opportunity';
import { getOpportunityList } from '@/services/frontend/opportunityService';
import CardSkeleton from '../common/loader/CardSkeleton';
import { sweetAlertToast } from '@/services/frontend/toastServices';
import OpportunityCard from '../common/cards/OpportunityCard';
import { setLoader } from '@/app/redux/slices/loaderSlice';
import { updateOpportunityList } from '@/app/redux/slices/opportunitySlice';
import { addRemoveWishlistService } from '@/services/frontend/wishlistService';
import MobileFilterSlider from '../mobileComponents/MobileFilterSlider';
import Image from 'next/image';
import filtericon from '/public/images/filter.svg';
import CommonModal from '../common/modal/CommonModal';
import { useRouter } from 'next/navigation';

const OpportunitiesList: React.FC<CurrentPage> = ({
  currrentPage,
  setCurrentPage,
}) => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [showMobFilterModal, setShowMobFilterModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const opportunityTypeList = useSelector(
    (state: any) => state.eventListReducer,
  );
  const opportunityList = useSelector((state: any) => state.opportunityReducer);
  const [opportunityIds, setOpportunityIds] = useState('');
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  // const [limit, setLimit] = useState<number>(20);
  const [cookies] = useCookies();
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
    setOpportunityIds(opportunityIds);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    (async () => {
      try {
        setLoading(true);
        const getList = await getOpportunityList(
          opportunityIds,
          currrentPage,
          startDate ?? undefined,
          endDate ?? undefined,
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
  const clearDateRange = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.has('startDate')) params.delete('startDate');
    if (params.has('endDate')) params.delete('endDate');
    router.push(pathname + '?' + params.toString());
    setShowFilterModal(false);
  };
  return (
    <div className="pb-16">
      <div className="flex justify-between px-5 py-2 items-center ">
        <div className="text-base text-[#24181B80] font-normal">
          {totalRecords} Opportunities
        </div>
        <button
          onClick={() => {
            setShowFilterModal(!showFilterModal);
            setIsButtonClicked(true); // Set button click state to true
          }}
          className={`hidden md:inline-flex  justify-center gap-x-1.5 items-center text-base font-medium px-2.5 py-1 rounded-[10px] hover:bg-[#EDEBE3] group ${isButtonClicked ? 'bg-[#EDEBE3]' : ''}`}
        >
          <Image src={filtericon} alt="filtericon" />
          Filters
        </button>
        <button
          onClick={() => {
            document.body.classList.add('overflow-hidden');
            setShowMobFilterModal(!showMobFilterModal);
            setIsButtonClicked(true); // Set button click state to true
          }}
          className={`inline-flex  md:hidden justify-center gap-x-1.5 items-center text-base font-medium px-2.5 py-1 rounded-[10px] hover:bg-[#EDEBE3] group ${isButtonClicked ? 'bg-[#EDEBE3]' : ''}`}
        >
          <Image src={filtericon} alt="filtericon" />
          Filters
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 px-5 ">
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
            className="text-base  w-auto h-11 px-4 py-3 inline-flex justify-center items-center bg-[#E60054] rounded-2xl font-medium text-white hover:bg-[#C20038]"
          >
            Load More
          </button>
        ) : null}
      </div>
      {showFilterModal && (
        <CommonModal
          heading={'Filters'}
          subHeading={'Send Invite to'}
          showModal={showFilterModal}
          setShowModal={setShowFilterModal}
          closeModalOptional={clearDateRange}
        >
          <Filter
            opportunityIds={opportunityIds}
            setCurrentPage={setCurrentPage}
            setTotalRecords={setTotalRecords}
            setShowModal={setShowFilterModal}
          />
        </CommonModal>
      )}
      {showMobFilterModal && (
        <div
          onClick={() => {
            document.body.classList.remove('overflow-hidden');
            setShowMobFilterModal(false);
          }}
          className="background-overlay h-full bg-black opacity-50 fixed top-0 bottom-0 left-0 right-0 z-10"
        ></div>
      )}
      <div
        className={`border-0 rounded-t-[20px] flex flex-col w-full bg-[#F5F3EF] fixed bottom-0 z-10 transition-all ease-in-out duration-500 delay-[200ms] overflow-hidden translate-y-full  ${showMobFilterModal ? '!translate-y-0 ' : ''}`}
      >
        {showMobFilterModal && (
          <MobileFilterSlider
            opportunityIds={opportunityIds}
            setCurrentPage={setCurrentPage}
            setTotalRecords={setTotalRecords}
            setShowModal={setShowMobFilterModal}
          />
        )}
      </div>
    </div>
  );
};

export default OpportunitiesList;
