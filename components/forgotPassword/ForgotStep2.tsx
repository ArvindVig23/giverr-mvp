import Link from 'next/link';
import React from 'react';
import Image from 'next/image'; // Import Image from next/image
import logo from '../../public/images/logo.svg';
import mobleftshape from '../../public/images/left-mob-shape.svg';
import mobrightshape from '../../public/images/right-mob-shape.svg';
import leftshape from '../../public/images/left-shapes.svg';
import rightshape from '../../public/images/right-shapes.svg';
import back from '../../public/images/arrow-left.svg';

const ForgotStep2: React.FC = () => {
  return (
    <div className="flex w-full overflow-auto min-h-screen items-center justify-center flex-col bg-[#F5F3EF] relative p-6 pb-32 md:pb-0">
      {/* Use next/image component */}
      <div className="w-full text-center  absolute top-16 ">
        <Link className="inline-block" href="#">
          <Image className="h-8 md:h-auto" src={logo} alt="Logo" />
        </Link>
      </div>

      <div className="max-w-[270px] sm:max-w-[484px] w-full py-2 relative">
        <div className="rounded-xl  border border-[#E6E3D6] text-center p-5">
          <strong className="font-semibold text-[#1E1E1E] text-2xl inline-block">
            Password reset
          </strong>
          <p className="m-0 text-[#1E1E1E80] text-base">
            Check your inbox at a**th@gmail.com.
          </p>
        </div>

        <div className="w-full text-center md:absolute mt-6 md:m-0 left-0 right-0 -bottom-32">
          <Link
            href={'/sign-in?step=1'}
            className="border border-[#E6E3D6] hover:bg-[#E6E3D6] rounded-lg w-11 h-11 inline-flex items-center justify-center"
          >
            <Image src={back} alt="back" />
          </Link>
        </div>
      </div>

      <div className="absolute left-0 bottom-0">
        <Image
          className="hidden md:block h-40 lg:h-auto w-auto"
          src={leftshape}
          alt="shapes"
        />
        <Image className="block md:hidden" src={mobleftshape} alt="shapes" />
      </div>

      <div className="absolute right-0 bottom-0">
        <Image
          className="hidden md:block h-40 lg:h-auto w-auto"
          src={rightshape}
          alt="shapes"
        />
        <Image className="block md:hidden" src={mobrightshape} alt="shapes" />
      </div>
    </div>
  );
};
export default ForgotStep2;
