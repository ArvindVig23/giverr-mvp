'use client';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper'; // Import Swiper core and required modules
import { Navigation } from 'swiper/modules';
import Link from 'next/link';
import Image from 'next/image'; // Import Image from next/image
import 'swiper/css';
import 'swiper/css/navigation';
import heart from '../../public/images/heart.svg';
import stateFill from '../../public/images/state=filled.svg';
import dummy from '../../public/images/dummy.jpg';
import thumb from '../../public/images/thumb.jpg';
import arrowRight from '../../public/images/chevron-right.svg';
// Install Swiper modules

SwiperCore.use([Navigation]);

const OpportunitiesSimilars: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };
  return (
    <div className="relative">
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
        <SwiperSlide>
          <div className="relative group">
            <div className="flex justify-between items-center gap-2 absolute left-2.5 right-2.5 top-2.5">
              <div className="text-sm font-medium inline-flex py-[5px] px-3 gap-[5px] border border-[#FFFFFF80] bg-[#FFFFFFE5] rounded-full items-center">
                <span className="bg-[#FFC430] w-2 h-2 rounded-full"></span>{' '}
                Pre-Entry
              </div>
              <div className="relative cursor-pointer" onClick={handleClick}>
                <Image src={isActive ? stateFill : heart} alt="heart" />
              </div>
            </div>

            <Link
              href="#"
              className="bg-white border border-white overflow-hidden rounded-[14px] group-hover:border-[#E6E3D6] group-hover:bg-inherit inline-block w-full"
            >
              <div className="overflow-hidden rounded-[14px]">
                <Image
                  className="w-full  rounded-[14px]"
                  src={dummy}
                  alt="dummy"
                />
              </div>
              <div className="flex flex-col p-5">
                <h4 className="font-medium text-base">Forest maintenance</h4>
                <span className="text-base">Apr 6, 2024 at 09:30</span>
                <div className="mt-1 text-[#1E1E1E80]">Miami, FL, USA</div>

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
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative group">
            <div className="flex justify-between items-center gap-2 absolute left-2.5 right-2.5 top-2.5">
              <div className="text-sm font-medium inline-flex py-[5px] px-3 gap-[5px] border border-[#FFFFFF80] bg-[#FFFFFFE5] rounded-full items-center">
                <span className="bg-[#FFC430] w-2 h-2 rounded-full"></span>{' '}
                Pre-Entry
              </div>
              <div className="relative cursor-pointer" onClick={handleClick}>
                <Image src={isActive ? stateFill : heart} alt="heart" />
              </div>
            </div>

            <Link
              href="#"
              className="bg-white border border-white overflow-hidden rounded-[14px] group-hover:border-[#E6E3D6] group-hover:bg-inherit inline-block w-full"
            >
              <div className="overflow-hidden rounded-[14px]">
                <Image
                  className="w-full  rounded-[14px]"
                  src={dummy}
                  alt="dummy"
                />
              </div>
              <div className="flex flex-col p-5">
                <h4 className="font-medium text-base">Forest maintenance</h4>
                <span className="text-base">Apr 6, 2024 at 09:30</span>
                <div className="mt-1 text-[#1E1E1E80]">Miami, FL, USA</div>

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
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative group">
            <div className="flex justify-between items-center gap-2 absolute left-2.5 right-2.5 top-2.5">
              <div className="text-sm font-medium inline-flex py-[5px] px-3 gap-[5px] border border-[#FFFFFF80] bg-[#FFFFFFE5] rounded-full items-center">
                <span className="bg-[#FFC430] w-2 h-2 rounded-full"></span>{' '}
                Pre-Entry
              </div>
              <div className="relative cursor-pointer" onClick={handleClick}>
                <Image src={isActive ? stateFill : heart} alt="heart" />
              </div>
            </div>

            <Link
              href="#"
              className="bg-white border border-white overflow-hidden rounded-[14px] group-hover:border-[#E6E3D6] group-hover:bg-inherit inline-block w-full"
            >
              <div className="overflow-hidden rounded-[14px]">
                <Image
                  className="w-full  rounded-[14px]"
                  src={dummy}
                  alt="dummy"
                />
              </div>
              <div className="flex flex-col p-5">
                <h4 className="font-medium text-base">Forest maintenance</h4>
                <span className="text-base">Apr 6, 2024 at 09:30</span>
                <div className="mt-1 text-[#1E1E1E80]">Miami, FL, USA</div>

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
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative group">
            <div className="flex justify-between items-center gap-2 absolute left-2.5 right-2.5 top-2.5">
              <div className="text-sm font-medium inline-flex py-[5px] px-3 gap-[5px] border border-[#FFFFFF80] bg-[#FFFFFFE5] rounded-full items-center">
                <span className="bg-[#FFC430] w-2 h-2 rounded-full"></span>{' '}
                Pre-Entry
              </div>
              <div className="relative cursor-pointer" onClick={handleClick}>
                <Image src={isActive ? stateFill : heart} alt="heart" />
              </div>
            </div>

            <Link
              href="#"
              className="bg-white border border-white overflow-hidden rounded-[14px] group-hover:border-[#E6E3D6] group-hover:bg-inherit inline-block w-full"
            >
              <div className="overflow-hidden rounded-[14px]">
                <Image
                  className="w-full  rounded-[14px]"
                  src={dummy}
                  alt="dummy"
                />
              </div>
              <div className="flex flex-col p-5">
                <h4 className="font-medium text-base">Forest maintenance</h4>
                <span className="text-base">Apr 6, 2024 at 09:30</span>
                <div className="mt-1 text-[#1E1E1E80]">Miami, FL, USA</div>

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
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative group">
            <div className="flex justify-between items-center gap-2 absolute left-2.5 right-2.5 top-2.5">
              <div className="text-sm font-medium inline-flex py-[5px] px-3 gap-[5px] border border-[#FFFFFF80] bg-[#FFFFFFE5] rounded-full items-center">
                <span className="bg-[#FFC430] w-2 h-2 rounded-full"></span>{' '}
                Pre-Entry
              </div>
              <div className="relative cursor-pointer" onClick={handleClick}>
                <Image src={isActive ? stateFill : heart} alt="heart" />
              </div>
            </div>

            <Link
              href="#"
              className="bg-white border border-white overflow-hidden rounded-[14px] group-hover:border-[#E6E3D6] group-hover:bg-inherit inline-block w-full"
            >
              <div className="overflow-hidden rounded-[14px]">
                <Image
                  className="w-full  rounded-[14px]"
                  src={dummy}
                  alt="dummy"
                />
              </div>
              <div className="flex flex-col p-5">
                <h4 className="font-medium text-base">Forest maintenance</h4>
                <span className="text-base">Apr 6, 2024 at 09:30</span>
                <div className="mt-1 text-[#1E1E1E80]">Miami, FL, USA</div>

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
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative group">
            <div className="flex justify-between items-center gap-2 absolute left-2.5 right-2.5 top-2.5">
              <div className="text-sm font-medium inline-flex py-[5px] px-3 gap-[5px] border border-[#FFFFFF80] bg-[#FFFFFFE5] rounded-full items-center">
                <span className="bg-[#FFC430] w-2 h-2 rounded-full"></span>{' '}
                Pre-Entry
              </div>
              <div className="relative cursor-pointer" onClick={handleClick}>
                <Image src={isActive ? stateFill : heart} alt="heart" />
              </div>
            </div>

            <Link
              href="#"
              className="bg-white border border-white overflow-hidden rounded-[14px] group-hover:border-[#E6E3D6] group-hover:bg-inherit inline-block w-full"
            >
              <div className="overflow-hidden rounded-[14px]">
                <Image
                  className="w-full  rounded-[14px]"
                  src={dummy}
                  alt="dummy"
                />
              </div>
              <div className="flex flex-col p-5">
                <h4 className="font-medium text-base">Forest maintenance</h4>
                <span className="text-base">Apr 6, 2024 at 09:30</span>
                <div className="mt-1 text-[#1E1E1E80]">Miami, FL, USA</div>

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
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative group">
            <div className="flex justify-between items-center gap-2 absolute left-2.5 right-2.5 top-2.5">
              <div className="text-sm font-medium inline-flex py-[5px] px-3 gap-[5px] border border-[#FFFFFF80] bg-[#FFFFFFE5] rounded-full items-center">
                <span className="bg-[#FFC430] w-2 h-2 rounded-full"></span>{' '}
                Pre-Entry
              </div>
              <div className="relative cursor-pointer" onClick={handleClick}>
                <Image src={isActive ? stateFill : heart} alt="heart" />
              </div>
            </div>

            <Link
              href="#"
              className="bg-white border border-white overflow-hidden rounded-[14px] group-hover:border-[#E6E3D6] group-hover:bg-inherit inline-block w-full"
            >
              <div className="overflow-hidden rounded-[14px]">
                <Image
                  className="w-full  rounded-[14px]"
                  src={dummy}
                  alt="dummy"
                />
              </div>
              <div className="flex flex-col p-5">
                <h4 className="font-medium text-base">Forest maintenance</h4>
                <span className="text-base">Apr 6, 2024 at 09:30</span>
                <div className="mt-1 text-[#1E1E1E80]">Miami, FL, USA</div>

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
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default OpportunitiesSimilars;
