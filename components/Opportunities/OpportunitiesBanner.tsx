import React from 'react';
import Image from 'next/image'; // Import Image from next/image
import bannerBg from '../../public/images/hero-bg.png';

const OpportunitiesBanner: React.FC = () => {
  return (
    <div className="px-5 relative mb-5">
      <Image src={bannerBg} className="w-full" alt="bg" />

      <h1 className="absolute h-full flex items-center justify-center top-0 w-full left-0 right-0 text-[40px] text-[#F5F3EF] font-Boris">
        {' '}
        Empowering the world to volunteer
      </h1>
    </div>
  );
};

export default OpportunitiesBanner;
