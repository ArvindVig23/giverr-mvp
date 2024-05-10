'use client';
import React, { useState } from 'react';
import { auth } from '@/firebase/config';
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import Link from 'next/link';
import axios from 'axios';
import Toast from '../notification/ToastNotification';
import { userDetail } from '@/interface/user';
import { ToastData } from '@/interface/notification';
import Image from 'next/image'; // Import Image from next/image
import logo from '../../public/images/logo.svg';
import apple from '../../public/images/apple.svg';
import google from '../../public/images/Google.svg';
import mobleftshape from '../../public/images/left-mob-shape.svg';
import mobrightshape from '../../public/images/right-mob-shape.svg';
import leftshape from '../../public/images/left-shapes.svg';
import rightshape from '../../public/images/right-shapes.svg';

const SignUpStep1: React.FC = () => {
  const [toastData, setToastData] = useState<ToastData>({
    status: 'success',
    message: '',
    show: false,
  });
  const initialValueOfUser: userDetail = {
    username: '',
    fullName: '',
    email: '',
    location: '',
    isGoogleAuth: false,
    isAppleAuth: false,
    isEmailAuth: false,
    status: true,
  };
  const [userDetails, setUserDetails] =
    useState<userDetail>(initialValueOfUser);

  const handleGoogleSignUp = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { user } = result;
      // const uid = user.uid;
      const { email } = user;
      const token = await user.getIdToken();
      const userData = {
        ...userDetails,
        email,
        isGoogleAuth: true,
      };

      const formData = new FormData();
      formData.append('userDetails', JSON.stringify(userData));
      formData.append('token', token);
      const response = await axios.post('/api/sign-up', formData);
      console.log(response, 'response');
      setUserDetails({ ...userDetails, email: email });
      setToastData({
        status: 'success',
        message: 'Login Successfully',
        show: true,
      });
    } catch (error: any) {
      console.log('Error in sign up with google', error);
      const { message } = error.response.data;
      setToastData({
        status: 'error',
        message,
        show: true,
      });
    }
  };
  return (
    <div className="flex w-full overflow-auto min-h-screen items-center md:justify-center flex-col bg-[#F5F3EF] relative p-6 pb-32 md:pb-0">
      {/* Use next/image component */}
      <div className="w-full text-center relative md:absolute md:top-16 mb-8 md:m-0">
        <Link className="inline-block" href="#">
          <Image className="h-8 md:h-auto" src={logo} alt="Logo" />
        </Link>
      </div>

      <div className="max-w-[270px] sm:max-w-[484px] w-full py-2">
        <div className="flex flex-col gap-4">
          <button className="w-full flex items-center justify-center gap-2 bg-[#EDEBE3] hover:bg-[#E6E3D6] rounded-2xl border border-[#E6E3D6] py-4 text-black">
            <Image src={apple} alt="Logo" /> Continue with Apple
          </button>
          <button
            className="w-full flex items-center justify-center gap-2 bg-[#EDEBE3] hover:bg-[#E6E3D6] rounded-2xl border border-[#E6E3D6] py-4 text-black"
            onClick={handleGoogleSignUp}
          >
            <Image src={google} alt="Logo" /> Continue with Google
          </button>
        </div>

        <div className="relative text-center my-12">
          <span className="absolute left-0 right-0 text-center  -top-3 px-3 z-10 text-[#1E1E1E]">
            <span className="bg-[#F5F3EF]  -top-3 px-3 z-10 text-[#1E1E1E]">
              Or
            </span>
          </span>
          <div className="h-px w-full bg-[#1E1E1E] opacity-20"></div>
        </div>

        <form className="flex gap-4 w-full flex-col">
          <div className="relative w-full">
            <input
              type="text"
              id="floating_filled"
              className="block rounded-2xl px-5 pb-3 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
              placeholder=" "
            />
            <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[18px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
              Email
            </label>
          </div>

          <button className="mt-4 text-base  w-full h-[58px] p-2 flex justify-center items-center bg-[#E60054] rounded-2xl font-medium text-white hover:bg-[#C20038]">
            Continue
          </button>

          <p className="mt-2 text-center w-full text-[#1E1E1E80]">
            If you don&apos;t have an account, we&apos;ll create one.
          </p>
        </form>
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
      <Toast {...toastData} />
    </div>
  );
};

export default SignUpStep1;
