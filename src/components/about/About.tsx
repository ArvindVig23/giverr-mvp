import React from 'react';
import Image from 'next/image'; // Import Image from next/image
import aboutbg from '/public/images/about-bg.jpg';
import shape2 from '/public/images/shape2.jpg';
import shape3 from '/public/images/shape3.jpg';
import plus from '/public/images/plus.svg';
import minus from '/public/images/minus.svg';
import herobg from '/public/images/hero-mb.svg';
import Link from 'next/link';
import faqJson from '@/utils/jsonData/faq.json';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react';

const About: React.FC = () => {
  const [open, setOpen] = React.useState<number | null>(1);
  return (
    <div className="w-full">
      <div className="px-5 relative mb-5  overflow-hidden px-5">
        <Image
          src={aboutbg}
          className="rounded-xl w-full hidden md:block"
          alt="bg"
        />
        <Image
          src={herobg}
          className="rounded-xl w-full block md:hidden"
          alt="bg"
        />
        <div className="absolute left-0 top-0 right-0 bottom-0 flex items-center justify-center text-center flex-col gap-8 p-6 md:p-0">
          <h1 className=" flex items-center justify-center text-center w-full text-[40px] leading-[40px]  lg:text-[70px] lg:leading-[70px] text-[#F5F3EF] font-Boris">
            {' '}
            Empowering <br></br> volunteers, <br></br>connecting <br></br>
            communities
          </h1>
          <p className="text-[#FFF3D6] md:max-w-[500px] text-base md:text-[20px]">
            Giverr is a volunteer-run project that is dedicated to increasing
            accessibility to volunteering opportunities. Our mission is simple
            yet profound: to empower the world to volunteer.{' '}
          </p>

          <Link
            href="#scroll"
            className="font-Boris  text-base text-[#FFF3D6] border border-[#FFF3D6] flex items-center justify-center pt-1.5 px-2.5 rounded-full w-[85px] h-[33px] text-center absolute bottom-[30px] .lg:bottom-[88px]"
          >
            SCROLL
          </Link>
        </div>
      </div>
      <div id={'scroll'} className="py-14 md:py-24 pb-0 px-5">
        <div className="max-w-[484px] w-full m-auto text-center ">
          <label className="font-medium text-base text-[#24181B] border border-[#24181B] rounded-full px-2.5 py-1 ">
            FOR WHO
          </label>
          <h1 className="text-[#24181B] text-[32px] md:text-[48px] font-medium leading-[32px] md:leading-[57px] mt-5">
            Connecting everyone on a single platform
          </h1>
          <p className="text-[#24181B80] text-base mt-5">
            At Giverr, we support grassroots initiatives for change. We empower
            individuals to organize diverse volunteering events, from beach
            cleanups to neighborhood beautification. With our tools, we help
            turn your vision for a better world into reality.
          </p>
        </div>
        <div className="max-w-[652px] w-full m-auto text-center mt-[60px] ">
          <div className="flex flex-wrap gap-5">
            <div className="flex-1">
              <div className="border border-[#E6E3D6] rounded-xl overflow-hidden bg-white">
                <Image
                  className="w-full rounded-xl"
                  src={shape3}
                  alt="shapes"
                />
                <div className="flex flex-col p-5 gap-2.5 text-left">
                  <h4 className="text-[#24181B] font-medium text-2xl">
                    Volunteers
                  </h4>
                  <p className="text-base text-[#24181B80]">
                    Volunteers have the power to explore a wide range of
                    volunteering opportunities tailored to their interests,
                    skills, and availability, as well as organize their own
                    events.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="border border-[#E6E3D6] rounded-xl overflow-hidden  bg-white">
                <Image
                  className="w-full rounded-xl"
                  src={shape2}
                  alt="shapes"
                />
                <div className="flex flex-col p-5 gap-2.5 text-left">
                  <h4 className="text-[#24181B] font-medium text-2xl">
                    Organizations
                  </h4>
                  <p className="text-base text-[#24181B80]">
                    Nonprofits, charities, schools, and community groups can
                    easily post volunteering opportunities, reaching a network
                    of passionate individuals eager to make a difference.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[484px] w-full m-auto text-center py-24 pt-16 md:py-24">
          <label className="font-medium text-base text-[#24181B] border border-[#24181B] rounded-full px-2.5 py-1 ">
            FAQ
          </label>
          <h1 className="text-[#24181B] text-[32px] md:text-[48px] font-medium leading-[32px] leading-[57px] mt-5 mb-[60px]">
            Frequently asked questions
          </h1>

          <>
            {faqJson.map((faq, index) => (
              <Accordion
                key={faq.Q}
                open={open === index + 1}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                className="text-left"
              >
                <AccordionHeader
                  onClick={() => setOpen(open === index + 1 ? null : index + 1)}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  className={`flex flex-wrap p-5 pr-[45px] w-full hover:bg-[#EDEBE3] border-b text-base font-normal border-[#E6E3D6] hover:rounded-xl ${open === index + 1 ? '!bg-[#EDEBE3]  !rounded-xl !rounded-b-none border-0' : ''}`}
                >
                  <span>{faq.Q}</span>
                  <Image
                    className="absolute right-5"
                    src={open === index + 1 ? minus : plus}
                    alt={open === index + 1 ? 'minus' : 'plus'}
                  />
                </AccordionHeader>
                <AccordionBody className="bg-[#EDEBE3] px-5 rounded-b-xl text-[#24181B80] pt-0 mb-5">
                  {faq.A}
                </AccordionBody>
              </Accordion>
            ))}
          </>

          <div className="max-w-[300px] m-auto text-center inline-flex gap-5 flex-wrap items-center justify-center mt-5">
            <label className="text-[#24181B] text-base font-normal w-full">
              If you can&apos;t find what you&apos;re looking for, please reach
              out.{' '}
            </label>

            <Link
              href={'/contact-us'}
              className="text-base  w-auto h-11 px-4 py-2.5 inlineflex justify-center items-center bg-[#E60054] rounded-2xl font-medium text-white hover:bg-[#C20038]"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>

      <div className="pb-8 md:pb-24 px-5">
        <div className="max-w-[985px] w-full m-auto">
          <div className=" w-full bg-[#1A5EF4] inline-flex gap-5 rounded-3xl px-4 py-[70px] md:p-[80px] lg:p-[120px] flex-col justify-center items-center">
            <h2 className="max-w-[550px] text-[32px] leading-[32px] md:text-[45px] text-[#F5F3EF] font-medium text-center">
              Join us in making a change
            </h2>
            <p className="max-w-[484px] text-base text-[#F5F3EF] font-medium text-center">
              Whether you&apos;re a seasoned volunteer, a nonprofit
              organization, or an individual with a passion for making a
              difference, Giverr is your platform to connect, collaborate, and
              create positive change.
            </p>

            <p className="max-w-[484px] text-base text-[#F5F3EF] font-medium text-center">
              Together, we can – one act of kindness at a time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
