import React from 'react';
import Image from 'next/image'; // Import Image from next/image
import chevronDown from '../../public/images/chevron-down.svg';

const Notifications: React.FC = () => {
  return (
    <div className="w-full">
      <h3 className="text-[32px] font-medium mb-1 mt-0 leading-[36px]">
        Email notifications
      </h3>
      <div className="w-full">
        <div className="flex flex-wrap items-center gap-5 py-4 border-b border-[#E6E3D6] w-full">
          <div className="flex-1">
            <span className="text-[#24181B]">Updates from Giverr</span>
            <p className="m-0 text-[#24181B80] w-full">
              You will receive a notification every time the platform has news
              to share
            </p>
          </div>

          <label className="flex items-center cursor-pointer select-none text-dark ">
            <div className="relative">
              <input type="checkbox" id="toggleTwo" className="peer sr-only" />
              <div className="block border border-[#E6E3D6] h-8 rounded-full bg-[#EDEBE3] w-[52px] peer-checked:bg-[#E60054] peer-checked:border-[#E60054]"></div>
              <div className="absolute w-7 h-7 transition bg-white rounded-full dot left-[2px] top-[2px] peer-checked:translate-x-[74%] peer-checked:bg-primary"></div>
            </div>
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-5 py-4 border-b border-[#E6E3D6] w-full">
          <div className="flex-1">
            <span className="text-[#24181B]">Submission accepted</span>
          </div>

          <label className="flex items-center cursor-pointer select-none text-dark ">
            <div className="relative">
              <input type="checkbox" id="toggleTwo" className="peer sr-only" />
              <div className="block border border-[#E6E3D6] h-8 rounded-full bg-[#EDEBE3] w-[52px] peer-checked:bg-[#E60054] peer-checked:border-[#E60054]"></div>
              <div className="absolute w-7 h-7 transition bg-white rounded-full dot left-[2px] top-[2px] peer-checked:translate-x-[74%] peer-checked:bg-primary"></div>
            </div>
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-5 py-4 border-b border-[#E6E3D6] w-full">
          <div className="flex-1">
            <span className="text-[#24181B]">Upcoming volunteering</span>
            <p className="m-0 text-[#24181B80] w-full">
              Stay informed with email notifications for updates on
              opportunities, including changes in dates, locations, or
              cancellations.
            </p>
          </div>

          <label className="flex items-center cursor-pointer select-none text-dark ">
            <div className="relative">
              <input type="checkbox" id="toggleTwo" className="peer sr-only" />
              <div className="block border border-[#E6E3D6] h-8 rounded-full bg-[#EDEBE3] w-[52px] peer-checked:bg-[#E60054] peer-checked:border-[#E60054]"></div>
              <div className="absolute w-7 h-7 transition bg-white rounded-full dot left-[2px] top-[2px] peer-checked:translate-x-[74%] peer-checked:bg-primary"></div>
            </div>
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-5 py-4  w-full">
          <div className="flex-1">
            <span className="text-[#24181B]">Volunteer oportunities</span>
            <p className="m-0 text-[#24181B80] w-full">
              Stay up-to-date when a new opportunity of the selected categories
              appears
            </p>
          </div>

          <label className="flex items-center cursor-pointer select-none text-dark ">
            <div className="relative">
              <input type="checkbox" id="toggleTwo" className="peer sr-only" />
              <div className="block border border-[#E6E3D6] h-8 rounded-full bg-[#EDEBE3] w-[52px] peer-checked:bg-[#E60054] peer-checked:border-[#E60054]"></div>
              <div className="absolute w-7 h-7 transition bg-white rounded-full dot left-[2px] top-[2px] peer-checked:translate-x-[74%] peer-checked:bg-primary"></div>
            </div>
          </label>
        </div>

        <div className="relative w-full mt-1">
          <label className="text-xs text-[#24181B80] absolute top-[10px] left-5">
            Categories
          </label>
          <select className="block rounded-xl px-5 pb-2 pt-6 w-full text-base text-[#24181B] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer">
            <option>Select location (optional)</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <Image
            src={chevronDown}
            alt="arrow"
            className="absolute top-[17px] right-4 pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Notifications;
