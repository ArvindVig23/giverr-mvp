import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react';
import Image from 'next/image';
import externalLink from '/public/images/external-link.svg';
import arrowDown from '/public/images/chevron-down.svg';
import arrowUp from '/public/images/chevron-up.svg';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import arrow from '/public/images/chevron-right-black.svg';
import { useDispatch, useSelector } from 'react-redux';
import { sweetAlertToast } from '@/services/frontend/toastServices';
import { getOrganizationList } from '@/services/frontend/organization';
import OrganizationPageSkeleton from '../common/loader/OrganizationPageSkeleton';
import OrganizationEmpty from './OrganizationEmpty';
import OpportunityCard from '../common/cards/OpportunityCard';
import { setLoader } from '@/app/redux/slices/loaderSlice';
import { addRemoveWishlistService } from '@/services/frontend/wishlistService';
import OpportunityCardEmpty from '../common/cards/OpportunityCardEmpty';
import { FIRESTORE_IMG_BASE_START_URL } from '@/constants/constants';
import { encodeUrl } from '@/services/frontend/commonServices';
import { getInitialOfEmail } from '@/services/frontend/userService';
import { updateOrganizationList } from '@/app/redux/slices/organizationSlice';
import { useSearchParams } from 'next/navigation';
SwiperCore.use([Navigation]);

const Organization: React.FC<{
  currentPage: number;
  setCurrentPage: Function;
}> = ({ currentPage, setCurrentPage }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [openOrgs, setOpenOrgs] = React.useState<string[]>([]);
  const organisationsData = useSelector(
    (state: any) => state.organizationReducer,
  );
  const searchParams = useSearchParams();
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const searchText = searchParams.get('name');
        const { data } = await getOrganizationList(
          dispatch,
          currentPage,
          searchText ?? '',
        );
        const { organizations, page, totalRecords } = data;
        if (page > 1) {
          dispatch(
            updateOrganizationList({
              organizations: [
                ...organisationsData.organizations,
                ...organizations,
              ],
              page,
              totalRecords,
            }),
          );
        } else {
          dispatch(
            updateOrganizationList({
              organizations,
              page,
              totalRecords,
            }),
          );
        }
      } catch (error: any) {
        const { message } = error;
        sweetAlertToast('error', message);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchParams]);
  const addRemoveWishlist = async (oppId: string, organizationId: string) => {
    try {
      dispatch(setLoader(true));
      const response = await addRemoveWishlistService(oppId);
      const { isWishlist } = response.data;
      const orgToUpdate = organisationsData.organizations.find(
        (org: any) => org.id == organizationId,
      );
      const copyOfOrg = { ...orgToUpdate, isWishlist };
      copyOfOrg.opportunities = orgToUpdate.opportunities.filter(
        (opp: any) => opp.id !== oppId,
      );

      const updatedOrgs = organisationsData.organizations.map((org: any) => {
        if (org.id == organizationId) {
          return copyOfOrg;
        }
        return org;
      });
      dispatch(
        updateOrganizationList({
          ...organisationsData,
          organizations: updatedOrgs,
        }),
      );
      dispatch(setLoader(false));
      sweetAlertToast('success', response.message);
    } catch (error: any) {
      dispatch(setLoader(false));
      const { message } = error.data;
      sweetAlertToast('error', message);
    }
  };
  const fullNameOrUserName = (organizationDetails: any) => {
    if (organizationDetails.name) {
      return organizationDetails.name;
    } else {
      return organizationDetails.username;
    }
  };
  const toggleAccordion = (organizationId: string) => {
    let tempOpenOrgs = [...openOrgs];
    if (openOrgs.includes(organizationId)) {
      tempOpenOrgs = tempOpenOrgs.filter((orgId) => orgId !== organizationId);
      setOpenOrgs(tempOpenOrgs);
      return;
    }
    tempOpenOrgs.push(organizationId);
    setOpenOrgs(tempOpenOrgs);
  };

  return (
    <div className="w-full border-t border-[#E6E3D6] p-5 organization-section">
      <div className="max-w-[652px] m-auto w-full">
        <>
          {loading && (
            <div className="w-full border-t border-[#E6E3D6] p-5 organization-section">
              <div className="max-w-[652px] m-auto w-full">
                <div className="w-full flex flex-col gap-5">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <OrganizationPageSkeleton key={index} />
                  ))}
                </div>
              </div>
            </div>
          )}
          {!loading && !organisationsData?.organizations?.length && (
            <OrganizationEmpty />
          )}
          {!loading && (
            <>
              {organisationsData?.organizations?.map((organization: any) => (
                <Accordion
                  open={openOrgs.includes(organization.id)}
                  placeholder={undefined}
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                  key={organization.id}
                >
                  <AccordionHeader
                    onClick={() => toggleAccordion(organization.id)}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    className={`flex flex-wrap p-5 w-full hover:bg-[#EDEBE3] border-b border-[#E6E3D6] hover:rounded-xl ${openOrgs.includes(organization.id) ? '!bg-[#EAE7DC]  !rounded-xl !rounded-b-none border-0' : ''}`}
                  >
                    <div className="w-full flex flex-wrap gap-5">
                      <div className="flex-1 flex gap-4 items-center">
                        <div
                          className={`w-11 min-w-11 h-11 overflow-hidden rounded-full flex justify-center items-center ${openOrgs.includes(organization.id) ? 'bg-[#bbb9b4]' : 'bg-[#e6e3d6]'}`}
                        >
                          {organization.avatarLink ? (
                            <Image
                              width={40}
                              height={40}
                              src={`${FIRESTORE_IMG_BASE_START_URL}${encodeUrl(organization.avatarLink)}`}
                              alt="profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            getInitialOfEmail(fullNameOrUserName(organization))
                          )}
                        </div>
                        <div className="flex flex-col justify-center">
                          <h5 className="text-base font-medium text-[#24181B] m-0 leading-[22px]">
                            {organization.name}
                          </h5>
                          <span className="text-base text-[#24181B80]">
                            {organization.opportunities.length}
                            {organization.opportunities.length > 1
                              ? ' opportunities'
                              : ' opportunity'}
                          </span>
                        </div>

                        <Link
                          href={
                            !organization?.website?.startsWith('http') &&
                            !organization?.website?.startsWith('//')
                              ? `https://${organization.website}`
                              : organization.website
                          }
                          target="_blank"
                          className="w-[70px] ml-auto text-sm text-[#24181B] py-0.5 px-2 border border-[#D1CFC7] rounded-[10px] hover:bg-[#E6E3D6] group"
                        >
                          <span className="group-hover:hidden">Website</span>
                          <span className="hidden group-hover:flex  w-full justify-between">
                            Visit{' '}
                            <Image
                              className="brightness-0"
                              src={externalLink}
                              alt="link"
                            />
                          </span>
                        </Link>
                      </div>

                      <Image
                        src={
                          openOrgs.includes(organization.id)
                            ? arrowUp
                            : arrowDown
                        }
                        alt="arrow"
                      />
                    </div>
                  </AccordionHeader>
                  <AccordionBody className="bg-[#EAE7DC] px-2.5 rounded-b-xl mb-5">
                    {!organization.opportunities.length ? (
                      <OpportunityCardEmpty />
                    ) : (
                      <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={12}
                        slidesPerView={2}
                        navigation={{
                          nextEl: '.swiper-button-next',
                          prevEl: '.swiper-button-prev',
                        }}
                        pagination={{
                          clickable: true,
                          el: '.swiper-pagination',
                        }}
                      >
                        {organization.opportunities.map((oppurtunity: any) => (
                          <SwiperSlide key={oppurtunity.id}>
                            <div className="relative group">
                              <OpportunityCard
                                opportunity={oppurtunity}
                                addRemoveWishlist={() =>
                                  addRemoveWishlist(
                                    oppurtunity.id,
                                    organization.id,
                                  )
                                }
                              />
                            </div>
                          </SwiperSlide>
                        ))}
                        {/* Pagination and navigation container */}
                        {organization.opportunities.length > 2 ? (
                          <div className="swiper-controls">
                            <div className="swiper-button-prev">
                              <Image src={arrow} alt="arorw" />{' '}
                            </div>
                            <div className="swiper-button-next">
                              <Image src={arrow} alt="arorw" />{' '}
                            </div>
                            <div className="swiper-pagination"></div>
                          </div>
                        ) : null}
                      </Swiper>
                    )}
                  </AccordionBody>
                </Accordion>
              ))}
            </>
          )}
        </>

        {organisationsData?.organizations?.length ? (
          <div className="w-full text-center mt-14 inline-flex flex-wrap justify-center gap-5">
            <div className="text-[#1E1E1E80] w-full">
              Showing {organisationsData?.organizations.length} of
              {organisationsData?.totalRecords}
            </div>
            {organisationsData?.organizations?.length !==
            organisationsData?.totalRecords ? (
              <button
                onClick={() => setCurrentPage(currentPage! + 1)}
                className="text-base  w-auto h-11 px-4 py-3 inline-flex justify-center items-center bg-[#E60054] rounded-xl font-medium text-white hover:bg-[#C20038]"
              >
                Load More
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Organization;
