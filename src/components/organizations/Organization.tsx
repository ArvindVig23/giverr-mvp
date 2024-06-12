import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react';
import Image from 'next/image';
import dummy from '/public/images/dummy.jpg';
import externalLink from '/public/images/external-link.svg';
import arrowDown from '/public/images/chevron-down.svg';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import arrow from '/public/images/chevron-right-black.svg';
import { useDispatch } from 'react-redux';
import { sweetAlertToast } from '@/services/frontend/toastServices';
import { getOrganizationList } from '@/services/frontend/organization';
import OrganizationPageSkeleton from '../common/loader/OrganizationPageSkeleton';
import OrganizationEmpty from './OrganizationEmpty';
import OpportunityCard from '../common/cards/OpportunityCard';
import { setLoader } from '@/app/redux/slices/loaderSlice';
import { addRemoveWishlistService } from '@/services/frontend/wishlistService';
import OpportunityCardEmpty from '../common/cards/OpportunityCardEmpty';
import { CurrentPage } from '@/interface/opportunity';
SwiperCore.use([Navigation]);

const Organization: React.FC<CurrentPage> = ({
  currrentPage,
  setCurrentPage,
}) => {
  console.log(currrentPage, setCurrentPage);
  const [loading, setLoading] = useState<boolean>(false);
  const [orgsList, setOrgsList] = useState<any>({
    organizations: [],
    totalRecords: 0,
    page: 1,
    limit: 20,
  });
  // console.log('=== orgs =', orgsList);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState<number>(1);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await getOrganizationList(dispatch);
        setOrgsList(data);
        setOpen(data?.organizations[0]?.id);
      } catch (error: any) {
        const { message } = error;
        sweetAlertToast('error', message);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const addRemoveWishlist = async (oppId: string, organizationId: string) => {
    try {
      dispatch(setLoader(true));
      const response = await addRemoveWishlistService(oppId);
      const { opportunityId, isWishlist } = response.data;
      const orgsToUpdate = orgsList.filter(
        (org: any) => org.id == organizationId,
      );
      orgsToUpdate.opportunities = orgsToUpdate.opportunities.filter(
        (opp: any) => opp.id !== oppId,
      );

      const updatedOrgs = orgsList.map((org: any) => {
        if (org.id == organizationId) {
          org.opportunities = org.opportunities.map((opp: any) =>
            opp.id === opportunityId ? { ...opp, isWishlist: isWishlist } : opp,
          );
          return org;
        }
        return org;
      });
      setOrgsList({ ...orgsList, organizations: updatedOrgs });
      dispatch(setLoader(false));
      sweetAlertToast('success', response.message);
    } catch (error: any) {
      dispatch(setLoader(false));
      const { message } = error.data;
      sweetAlertToast('error', message);
    }
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
          {!loading && !orgsList.organizations.length && <OrganizationEmpty />}
          {!loading && (
            <>
              {orgsList.organizations.map((organization: any) => (
                <Accordion
                  open={open === organization.id}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  key={organization.id}
                >
                  <AccordionHeader
                    onClick={() => setOpen(organization.id)}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    className={`flex flex-wrap p-5 w-full hover:bg-[#EDEBE3] border-b border-[#E6E3D6] hover:rounded-xl ${open === 1 ? '!bg-[#EAE7DC]  !rounded-xl !rounded-b-none border-0' : ''}`}
                  >
                    <div className="w-full flex flex-wrap gap-5">
                      <div className="flex-1 flex gap-4 items-center">
                        <div className="w-11 h-11 overflow-hidden rounded-full">
                          <Image
                            className="w-full h-full object-cover"
                            src={dummy}
                            alt="avatar"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h5 className="text-base font-medium text-[#24181B] m-0 leading-[22px]">
                            Planet Caretakers
                          </h5>
                          <span className="text-base text-[#24181B80]">
                            {organization.opportunities.length}
                            {organization.opportunities.length > 1
                              ? ' opportunities'
                              : ' opportunity'}
                          </span>
                        </div>

                        <Link
                          href={organization.website}
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

                      <Image src={arrowDown} alt="arrow" />
                    </div>
                  </AccordionHeader>
                  <AccordionBody className="bg-[#EAE7DC] px-2.5 rounded-b-xl">
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
                        <SwiperSlide>
                          {organization.opportunities.map(
                            (oppurtunity: any) => (
                              <OpportunityCard
                                opportunity={oppurtunity}
                                addRemoveWishlist={() =>
                                  addRemoveWishlist(
                                    oppurtunity.id,
                                    organization.id,
                                  )
                                }
                                key={oppurtunity.id}
                              />
                            ),
                          )}
                        </SwiperSlide>

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

        {orgsList.organizations.length ? (
          <div className="w-full text-center mt-14 inline-flex flex-wrap justify-center gap-5">
            <div className="text-[#1E1E1E80] w-full">
              Showing {orgsList.organizations.length} of {orgsList.totalRecords}
            </div>
            {orgsList.organizations.length !== orgsList.totalRecords ? (
              <button className="text-base  w-auto h-11 px-4 py-3 inline-flex justify-center items-center bg-[#E60054] rounded-xl font-medium text-white hover:bg-[#C20038]">
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
