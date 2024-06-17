'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper'; // Import Swiper core and required modules
import { Navigation } from 'swiper/modules';
import Image from 'next/image'; // Import Image from next/image
import 'swiper/css';
import 'swiper/css/navigation';
// import heart from '/public/images/heart.svg';
// import stateFill from '/public/images/state=filled.svg';
// import dummy from '/public/images/dummy.jpg';
// import thumb from '/public/images/thumb.jpg';
import arrowRight from '/public/images/chevron-right.svg';
import { SimilarInterest } from '@/interface/opportunity';
import OpportunityCard from '../common/cards/OpportunityCard';
// Install Swiper modules

SwiperCore.use([Navigation]);

const OpportunitiesSimilars: React.FC<SimilarInterest> = ({
  similarInterest,
}: any) => {
  return (
    <div className="relative ml-5 pt-24">
      <div className="flex justify-between items-center mb-5 items-center ">
        <h4 className="text-2xl text-[#24181B] font-medium">
          Similar interests
        </h4>

        <div className="inline-flex gap-2 relative items-center swiper-btns">
          <div className="swiper-button-prev !relative after:hidden bg-[#1E1E1E] !left-[inherit]  !right-[inherit] !w-[30px] !rounded-[10px] !h-[30px] !m-0">
            <Image className="rotate-180" src={arrowRight} alt="check" />
          </div>
          <div className="swiper-button-next !relative after:hidden bg-[#1E1E1E]  !left-[inherit]  !right-[inherit] !w-[30px] !rounded-[10px] !h-[30px] !m-0">
            <Image src={arrowRight} alt="check" />
          </div>
        </div>
      </div>
      <Swiper
        spaceBetween={12}
        slidesPerView={5}
        navigation={{
          // Add navigation prop
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
      >
        {similarInterest && similarInterest.length > 0 ? (
          similarInterest.map((opportunity: any, index: number) => (
            <SwiperSlide key={index}>
              <OpportunityCard opportunity={opportunity} />
            </SwiperSlide>
          ))
        ) : (
          <p>No Similar Interests found.</p>
        )}
      </Swiper>
    </div>
  );
};

export default OpportunitiesSimilars;
