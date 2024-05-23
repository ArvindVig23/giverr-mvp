'use client';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper'; // Import Swiper core and required modules
import { Navigation } from 'swiper/modules';

import Image from 'next/image'; // Import Image from next/image
import heartSearch from '/public/images/heart-search.svg';
import round from '/public/images/rounded.svg';
import 'swiper/css';
import 'swiper/css/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getEventList } from '@/services/frontend/opportunityService';
import { encodeUrl } from '@/services/frontend/commonServices';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CurrentPage } from '@/interface/opportunity';
// Install Swiper modules

SwiperCore.use([Navigation]);

const OpportunitiesTags: React.FC<CurrentPage> = ({ setCurrentPage }) => {
  const [opportunityFilter, setOpportunityFilter] = useState<string[]>([]);
  const opportunityTypeList = useSelector(
    (state: any) => state.eventListReducer,
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (opportunityTypeList.length === 0) {
      getEventList(dispatch);
    } // eslint-disable-next-line
  }, []);

  // create searchparam string
  const searchParams = useSearchParams();
  const updateSearchParams = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);

    return params.toString();
  };
  // on opportunity type filter clict
  const filterClick = (type: string) => {
    if (type === 'all') {
      setOpportunityFilter([]);
      setCurrentPage(1);
      router.push(pathname + '?' + updateSearchParams('opportunity', ''));
    } else {
      const filters = [...opportunityFilter];
      if (!filters.includes(type)) {
        filters.push(type);
      }
      const string = filters.join(',');
      setOpportunityFilter(filters);
      setCurrentPage(1);
      router.push(pathname + '?' + updateSearchParams('opportunity', string));
    }
  };

  // to get the params if page regresh or user types url
  useEffect(() => {
    const filters = searchParams.get('opportunity');
    if (filters) {
      setOpportunityFilter(filters.split(','));
    } //eslint-disable-next-line
  }, []);

  return (
    <div className="px-5 relative mb-5 opportunities-swiper">
      <Swiper
        spaceBetween={12}
        slidesPerView="auto"
        loop={true}
        navigation={{
          // Add navigation prop
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
      >
        <SwiperSlide onClick={() => filterClick('all')}>
          <div
            className={`group border rounded-md gap-[5px] px-3 py-2 inline-flex items-center justify-center cursor-pointer hover:border-[#E60054] hover:text-[#E60054] ${opportunityFilter.length === 0 && 'border-[#E60054] text-[#E60054]'}`}
          >
            <Image
              className={` group-hover:brightness-100 ${opportunityFilter.length === 0 ? 'brightness-100' : 'brightness-0'}`}
              src={heartSearch}
              alt="search"
            />
            All
          </div>
        </SwiperSlide>
        {opportunityTypeList &&
          opportunityTypeList.length > 0 &&
          opportunityTypeList.map((type: any, index: number) => (
            <SwiperSlide key={index} onClick={() => filterClick(type.slug)}>
              <div
                className={`group  border border-[#D1CFC7] rounded-md gap-[5px] px-3 py-2 inline-flex items-center justify-center cursor-pointer  hover:bg-[#EDEBE3] ${opportunityFilter.includes(type.slug) && 'border-[#E60054] text-[#E60054]'}`}
              >
                <Image
                  className={` ${opportunityFilter.includes(type.slug) ? 'brightness-100' : 'brightness-0'} `}
                  width={20}
                  height={20}
                  src={`${process.env.NEXT_PUBLIC_FIRESTORE_IMG_BASE_START_URL}${encodeUrl(type?.icon)}`}
                  alt="beach"
                />
                {type.name}
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="swiper-button-next">
        <Image src={round} alt="next" />
      </div>
    </div>
  );
};

export default OpportunitiesTags;
