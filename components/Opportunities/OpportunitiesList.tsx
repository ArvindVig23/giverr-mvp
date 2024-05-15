'use client';
import React, { useState } from 'react';
import Image from 'next/image'; // Import Image from next/image
import Link from 'next/link';
import Filter from '../Opportunities/filter';
import heart from '../../public/images/heart.svg';
import stateFill from '../../public/images/state=filled.svg';
import dummy from '../../public/images/dummy.jpg';
import thumb from '../../public/images/thumb.jpg';

const OpportunitiesList: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="pb-16">
      <div className="flex justify-between px-5 py-2 items-center ">
        <div className="text-base text-[#1E1E1E80] font-normal">
          366 opportunities
        </div>
        <Filter />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-5 px-5 ">
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
      </div>

      <div className="w-full text-center mt-14 inline-flex flex-wrap justify-center gap-5">
        <div className="text-[#1E1E1E80] w-full">Showing 20 of 366</div>
        <button className="text-base  w-auto h-11 px-4 py-3 inline-flex justify-center items-center bg-[#E60054] rounded-xl font-medium text-white hover:bg-[#C20038]">
          Load More
        </button>
      </div>
    </div>
  );
};

export default OpportunitiesList;
