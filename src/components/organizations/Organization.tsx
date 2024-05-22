import React, { useState } from 'react';
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
import SwiperCore from 'swiper'; // Import Swiper core and required modules
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import heart from '/public/images/heart.svg';
import stateFill from '/public/images/state=filled.svg';
import thumb from '/public/images/thumb.jpg';
// import OrganizationEmpty from './OrganizationEmpty';

SwiperCore.use([Navigation]);

const Organization = () => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const [open, setOpen] = React.useState<number>(1);

  return (
    <div className="w-full border-t border-[#E6E3D6] p-5 organization-section">
      {/* <OrganizationEmpty /> */}
      <div className="max-w-[652px] m-auto w-full">
        <>
          <Accordion
            open={open === 1}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <AccordionHeader
              onClick={() => setOpen(1)}
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
                      4 opportunities
                    </span>
                  </div>

                  <Link
                    href="#"
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
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={12}
                slidesPerView={2}
                navigation={{
                  // Add navigation prop
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }}
                pagination={{ clickable: true }}
              >
                <SwiperSlide>
                  <div className="relative group">
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
                      href="#"
                      className="bg-white border border-[#E6E3D6] overflow-hidden rounded-[14px] group-hover:border-[#E6E3D6] group-hover:bg-inherit inline-block w-full"
                    >
                      <div className="overflow-hidden rounded-[14px]">
                        <Image
                          className="w-full  rounded-[14px]"
                          src={dummy}
                          alt="dummy"
                        />
                      </div>
                      <div className="flex flex-col p-5">
                        <h4 className="font-medium text-base">
                          Forest maintenance
                        </h4>
                        <span className="text-base">Apr 6, 2024 at 09:30</span>
                        <div className="mt-1 text-[#1E1E1E80]">
                          Miami, FL, USA
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
                </SwiperSlide>

                <SwiperSlide>
                  <div className="relative group">
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
                      href="#"
                      className="bg-white border border-[#E6E3D6] overflow-hidden rounded-[14px] group-hover:border-[#E6E3D6] group-hover:bg-inherit inline-block w-full"
                    >
                      <div className="overflow-hidden rounded-[14px]">
                        <Image
                          className="w-full  rounded-[14px]"
                          src={dummy}
                          alt="dummy"
                        />
                      </div>
                      <div className="flex flex-col p-5">
                        <h4 className="font-medium text-base">
                          Forest maintenance
                        </h4>
                        <span className="text-base">Apr 6, 2024 at 09:30</span>
                        <div className="mt-1 text-[#1E1E1E80]">
                          Miami, FL, USA
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
                </SwiperSlide>

                <SwiperSlide>
                  <div className="relative group">
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
                      href="#"
                      className="bg-white border border-[#E6E3D6] overflow-hidden rounded-[14px] group-hover:border-[#E6E3D6] group-hover:bg-inherit inline-block w-full"
                    >
                      <div className="overflow-hidden rounded-[14px]">
                        <Image
                          className="w-full  rounded-[14px]"
                          src={dummy}
                          alt="dummy"
                        />
                      </div>
                      <div className="flex flex-col p-5">
                        <h4 className="font-medium text-base">
                          Forest maintenance
                        </h4>
                        <span className="text-base">Apr 6, 2024 at 09:30</span>
                        <div className="mt-1 text-[#1E1E1E80]">
                          Miami, FL, USA
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
                </SwiperSlide>

                <SwiperSlide>
                  <div className="relative group">
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
                      href="#"
                      className="bg-white border border-[#E6E3D6] overflow-hidden rounded-[14px] group-hover:border-[#E6E3D6] group-hover:bg-inherit inline-block w-full"
                    >
                      <div className="overflow-hidden rounded-[14px]">
                        <Image
                          className="w-full  rounded-[14px]"
                          src={dummy}
                          alt="dummy"
                        />
                      </div>
                      <div className="flex flex-col p-5">
                        <h4 className="font-medium text-base">
                          Forest maintenance
                        </h4>
                        <span className="text-base">Apr 6, 2024 at 09:30</span>
                        <div className="mt-1 text-[#1E1E1E80]">
                          Miami, FL, USA
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
                </SwiperSlide>

                <SwiperSlide>
                  <div className="relative group">
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
                      href="#"
                      className="bg-white border border-[#E6E3D6] overflow-hidden rounded-[14px] group-hover:border-[#E6E3D6] group-hover:bg-inherit inline-block w-full"
                    >
                      <div className="overflow-hidden rounded-[14px]">
                        <Image
                          className="w-full  rounded-[14px]"
                          src={dummy}
                          alt="dummy"
                        />
                      </div>
                      <div className="flex flex-col p-5">
                        <h4 className="font-medium text-base">
                          Forest maintenance
                        </h4>
                        <span className="text-base">Apr 6, 2024 at 09:30</span>
                        <div className="mt-1 text-[#1E1E1E80]">
                          Miami, FL, USA
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
                </SwiperSlide>

                <SwiperSlide>
                  <div className="relative group">
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
                      href="#"
                      className="bg-white border border-[#E6E3D6] overflow-hidden rounded-[14px] group-hover:border-[#E6E3D6] group-hover:bg-inherit inline-block w-full"
                    >
                      <div className="overflow-hidden rounded-[14px]">
                        <Image
                          className="w-full  rounded-[14px]"
                          src={dummy}
                          alt="dummy"
                        />
                      </div>
                      <div className="flex flex-col p-5">
                        <h4 className="font-medium text-base">
                          Forest maintenance
                        </h4>
                        <span className="text-base">Apr 6, 2024 at 09:30</span>
                        <div className="mt-1 text-[#1E1E1E80]">
                          Miami, FL, USA
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
                </SwiperSlide>
              </Swiper>
            </AccordionBody>
          </Accordion>
          <Accordion
            open={open === 2}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <AccordionHeader
              onClick={() => setOpen(2)}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              className={`flex flex-wrap p-5 w-full hover:bg-[#EDEBE3] border-b border-[#E6E3D6] hover:rounded-xl ${open === 2 ? '!bg-[#EAE7DC]  !rounded-xl !rounded-b-none border-0' : ''}`}
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
                      4 opportunities
                    </span>
                  </div>

                  <Link
                    href="#"
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
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={12}
                slidesPerView={2}
                navigation={{
                  // Add navigation prop
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }}
                pagination={{ clickable: true }}
              >
                <SwiperSlide>
                  <div className="relative group">
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
                      href="#"
                      className="bg-white border border-[#E6E3D6] overflow-hidden rounded-[14px] group-hover:border-[#E6E3D6] group-hover:bg-inherit inline-block w-full"
                    >
                      <div className="overflow-hidden rounded-[14px]">
                        <Image
                          className="w-full  rounded-[14px]"
                          src={dummy}
                          alt="dummy"
                        />
                      </div>
                      <div className="flex flex-col p-5">
                        <h4 className="font-medium text-base">
                          Forest maintenance
                        </h4>
                        <span className="text-base">Apr 6, 2024 at 09:30</span>
                        <div className="mt-1 text-[#1E1E1E80]">
                          Miami, FL, USA
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
                </SwiperSlide>

                <SwiperSlide>
                  <div className="relative group">
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
                      href="#"
                      className="bg-white border border-[#E6E3D6] overflow-hidden rounded-[14px] group-hover:border-[#E6E3D6] group-hover:bg-inherit inline-block w-full"
                    >
                      <div className="overflow-hidden rounded-[14px]">
                        <Image
                          className="w-full  rounded-[14px]"
                          src={dummy}
                          alt="dummy"
                        />
                      </div>
                      <div className="flex flex-col p-5">
                        <h4 className="font-medium text-base">
                          Forest maintenance
                        </h4>
                        <span className="text-base">Apr 6, 2024 at 09:30</span>
                        <div className="mt-1 text-[#1E1E1E80]">
                          Miami, FL, USA
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
                </SwiperSlide>

                <SwiperSlide>
                  <div className="relative group">
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
                      href="#"
                      className="bg-white border border-[#E6E3D6] overflow-hidden rounded-[14px] group-hover:border-[#E6E3D6] group-hover:bg-inherit inline-block w-full"
                    >
                      <div className="overflow-hidden rounded-[14px]">
                        <Image
                          className="w-full  rounded-[14px]"
                          src={dummy}
                          alt="dummy"
                        />
                      </div>
                      <div className="flex flex-col p-5">
                        <h4 className="font-medium text-base">
                          Forest maintenance
                        </h4>
                        <span className="text-base">Apr 6, 2024 at 09:30</span>
                        <div className="mt-1 text-[#1E1E1E80]">
                          Miami, FL, USA
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
                </SwiperSlide>

                <SwiperSlide>
                  <div className="relative group">
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
                      href="#"
                      className="bg-white border border-[#E6E3D6] overflow-hidden rounded-[14px] group-hover:border-[#E6E3D6] group-hover:bg-inherit inline-block w-full"
                    >
                      <div className="overflow-hidden rounded-[14px]">
                        <Image
                          className="w-full  rounded-[14px]"
                          src={dummy}
                          alt="dummy"
                        />
                      </div>
                      <div className="flex flex-col p-5">
                        <h4 className="font-medium text-base">
                          Forest maintenance
                        </h4>
                        <span className="text-base">Apr 6, 2024 at 09:30</span>
                        <div className="mt-1 text-[#1E1E1E80]">
                          Miami, FL, USA
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
                </SwiperSlide>

                <SwiperSlide>
                  <div className="relative group">
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
                      href="#"
                      className="bg-white border border-[#E6E3D6] overflow-hidden rounded-[14px] group-hover:border-[#E6E3D6] group-hover:bg-inherit inline-block w-full"
                    >
                      <div className="overflow-hidden rounded-[14px]">
                        <Image
                          className="w-full  rounded-[14px]"
                          src={dummy}
                          alt="dummy"
                        />
                      </div>
                      <div className="flex flex-col p-5">
                        <h4 className="font-medium text-base">
                          Forest maintenance
                        </h4>
                        <span className="text-base">Apr 6, 2024 at 09:30</span>
                        <div className="mt-1 text-[#1E1E1E80]">
                          Miami, FL, USA
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
                </SwiperSlide>

                <SwiperSlide>
                  <div className="relative group">
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
                      href="#"
                      className="bg-white border border-[#E6E3D6] overflow-hidden rounded-[14px] group-hover:border-[#E6E3D6] group-hover:bg-inherit inline-block w-full"
                    >
                      <div className="overflow-hidden rounded-[14px]">
                        <Image
                          className="w-full  rounded-[14px]"
                          src={dummy}
                          alt="dummy"
                        />
                      </div>
                      <div className="flex flex-col p-5">
                        <h4 className="font-medium text-base">
                          Forest maintenance
                        </h4>
                        <span className="text-base">Apr 6, 2024 at 09:30</span>
                        <div className="mt-1 text-[#1E1E1E80]">
                          Miami, FL, USA
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
                </SwiperSlide>
              </Swiper>
            </AccordionBody>
          </Accordion>
        </>

        <div className="w-full text-center mt-14 inline-flex flex-wrap justify-center gap-5">
          <div className="text-[#1E1E1E80] w-full">Showing 20 of 366</div>
          <button className="text-base  w-auto h-11 px-4 py-3 inline-flex justify-center items-center bg-[#E60054] rounded-xl font-medium text-white hover:bg-[#C20038]">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Organization;
