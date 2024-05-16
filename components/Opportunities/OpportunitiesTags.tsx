'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper'; // Import Swiper core and required modules
import { Navigation } from 'swiper/modules';

import Image from 'next/image'; // Import Image from next/image
import heartSearch from '../../public/images/heart-search.svg';
import beach from '../../public/images/beach-cleanup.svg';
import trash from '../../public/images/trash-picking.svg';
import charity from '../../public/images/charity.svg';
import dog from '../../public/images/dog.svg';
import tree from '../../public/images/tree.svg';
import river from '../../public/images/river.svg';
import round from '../../public/images/rounded.svg';
import 'swiper/css';
import 'swiper/css/navigation';
// Install Swiper modules

SwiperCore.use([Navigation]);

const OpportunitiesTags: React.FC = () => {
  return (
    <div className="px-5 relative mb-5 opportunities-swiper">
      <Swiper
        spaceBetween={12}
        slidesPerView={8}
        loop={true}
        navigation={{
          // Add navigation prop
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
      >
        <SwiperSlide>
          <div className="group border border-[#E60054] text-[#E60054] rounded-md gap-[5px] px-3 py-2 inline-flex items-center justify-center cursor-pointer hover:border-[#E60054] hover:text-[#E60054]">
            <Image
              className="brightness-100 group-hover:brightness-100"
              src={heartSearch}
              alt="search"
            />
            All
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="group  border border-[#D1CFC7] rounded-md gap-[5px] px-3 py-2 inline-flex items-center justify-center cursor-pointer  hover:bg-[#EDEBE3]">
            <Image className="brightness-0" src={beach} alt="beach" />
            Beach cleanup
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="group  border border-[#D1CFC7] rounded-md gap-[5px] px-3 py-2 inline-flex items-center justify-center cursor-pointer hover:bg-[#EDEBE3]">
            <Image className="brightness-0" src={trash} alt="trash-picking" />
            Trash Picking
          </div>
        </SwiperSlide>

        <SwiperSlide>
          {' '}
          <div className="group  border border-[#D1CFC7] rounded-md gap-[5px] px-3 py-2 inline-flex items-center justify-center cursor-pointer hover:bg-[#EDEBE3]">
            <Image className="brightness-0" src={charity} alt="charity" />
            Charity
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="group  border border-[#D1CFC7] rounded-md gap-[5px] px-3 py-2 inline-flex items-center justify-center cursor-pointer hover:bg-[#EDEBE3]">
            <Image className="brightness-0" src={dog} alt="dog" />
            Dog walking
          </div>
        </SwiperSlide>

        <SwiperSlide>
          {' '}
          <div className="group  border border-[#D1CFC7] rounded-md gap-[5px] px-3 py-2 inline-flex items-center justify-center cursor-pointer hover:bg-[#EDEBE3]">
            <Image className="brightness-0" src={tree} alt="tree" />
            Tree planting
          </div>
        </SwiperSlide>

        <SwiperSlide>
          {' '}
          <div className="group  border border-[#D1CFC7] rounded-md gap-[5px] px-3 py-2 inline-flex items-center justify-center cursor-pointer hover:bg-[#EDEBE3]">
            <Image className="brightness-0" src={river} alt="river" />
            River cleanup
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="group  border border-[#D1CFC7] rounded-md gap-[5px] px-3 py-2 inline-flex items-center justify-center cursor-pointer hover:bg-[#EDEBE3]">
            <Image className="brightness-0" src={tree} alt="tree" />
            Arts and culture
          </div>
        </SwiperSlide>

        <SwiperSlide>
          {' '}
          <div className="group  border border-[#D1CFC7] rounded-md gap-[5px] px-3 py-2 inline-flex items-center justify-center cursor-pointer hover:bg-[#EDEBE3]">
            <Image className="brightness-0" src={tree} alt="tree" />
            Helping shelters
          </div>
        </SwiperSlide>

        <SwiperSlide>
          {' '}
          <div className="group  border border-[#D1CFC7] rounded-md gap-[5px] px-3 py-2 inline-flex items-center justify-center cursor-pointer hover:bg-[#EDEBE3]">
            <Image className="brightness-0" src={tree} alt="tree" />
            Elderly care
          </div>
        </SwiperSlide>

        <SwiperSlide>
          {' '}
          <div className="group  border border-[#D1CFC7] rounded-md gap-[5px] px-3 py-2 inline-flex items-center justify-center cursor-pointer hover:bg-[#EDEBE3]">
            <Image className="brightness-0" src={tree} alt="tree" />
            Education
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="swiper-button-next">
        <Image src={round} alt="next" />
      </div>
    </div>
  );
};

export default OpportunitiesTags;
