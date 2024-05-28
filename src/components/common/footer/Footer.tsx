import Link from 'next/link';
import React from 'react';
import Image from 'next/image'; // Import Image from next/image
import footerlogo from '/public/images/giverr.svg';
import insta from '/public/images/instagram.svg';
import twitter from '/public/images/twitter.svg';
import linkedin from '/public/images/linkedin.svg';
import link from '/public/images/external-link.svg';

const Footer: React.FC = () => {
  return (
    <div className="bg-[#E60054] text-center flex  items-center flex-col gap-10 pt-[100px] pb-12 px-10 relative before:content-[''] before:h-6 before:rounded-b-[24px] before:w-full before:absolute before:top-0 before:bg-[#F5F3EF]">
      <div className="flex flex-col gap-2.5">
        <h4 className="text-[#FFF3D680]">Company</h4>
        <Link href="/about" className="text-[#FFF3D6]  hover:underline">
          About
        </Link>
        <Link href="#" className="text-[#FFF3D6] inline-flex  hover:underline">
          Contact <Image src={link} alt="Link" />
        </Link>
      </div>

      <div className="flex flex-col gap-2.5">
        <h4 className="text-[#FFF3D680]">Legal</h4>
        <Link href="#" className="text-[#FFF3D6] hover:underline">
          Terms & Conditions
        </Link>
        <Link href="#" className="text-[#FFF3D6]  hover:underline">
          Privacy Policy
        </Link>
      </div>

      <div className="flex flex-col gap-2.5">
        <h4 className="text-[#FFF3D680]">Social</h4>
        <div className="flex gap-5 w-full justify-center">
          <Link href="#">
            <Image src={linkedin} alt="Linkedin" />
          </Link>
          <Link href="#">
            <Image src={twitter} alt="Twitter" />
          </Link>

          <Link href="#">
            <Image src={insta} alt="Instagram" />
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 items-center mt-10">
        <Link href="#" className="mb-4">
          <Image src={footerlogo} alt="logo" />
        </Link>

        <p className="text-[#FFF3D6]">
          © 2024 Giverr. <br></br>
          All rights reserved.{' '}
        </p>
      </div>
    </div>
  );
};

export default Footer;
