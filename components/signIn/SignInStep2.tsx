'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image'; // Import Image from next/image
import logo from '../../public/images/logo.svg';
import eye from '../../public/images/eye.svg';
import eyeSlash from '../../public/images/eye-slash.svg';
import mobleftshape from '../../public/images/left-mob-shape.svg';
import mobrightshape from '../../public/images/right-mob-shape.svg';
import mobCloseRight from '../../public/images/mobile-close-right.svg';
import mobCloseLeft from '../../public/images/mobile-close-left.svg';
import leftshape from '../../public/images/left-shapes.svg';
import leftCloseShape from '../../public/images/show-pass-left.svg';
import rightshape from '../../public/images/right-shapes.svg';
import rightCloseShape from '../../public/images/show-pass-right.svg';
import back from '../../public/images/arrow-left.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { tooglePassword } from '@/utils/signUpEvent';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';
import { updateUserDetails } from '@/app/redux/slices/userDetailSlice';
import { resetGlobalState } from '@/utils/initialStates/userInitialStates';
import callApi from '@/services/frontend/callApiService';
import { sweetAlertToast } from '@/services/frontend/toastServices';

const SignInStep2: React.FC = () => {
  // Global state user details
  const user: any = useSelector((state: any) => state.userDetailReducer);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  // react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();
  const [, setCookie] = useCookies(['userToken']);
  // Submit function
  const handleJoin = async (formData: any) => {
    // check if user existed and with the email method
    setLoading(true);
    try {
      await callApi('/sign-in', 'post', { email: user.email });
    } catch (error: any) {
      const { message } = error.data;
      sweetAlertToast('error', message);
      setLoading(false);
      return;
    }

    // firebase authenticator
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        user.email,
        formData.password,
      );
      const token = await res.user.getIdToken();
      setCookie('userToken', token, { path: '/' });
      sweetAlertToast('success', 'Login Successfull');
      router.push('/');
      setLoading(false);
      dispatch(updateUserDetails(resetGlobalState));
    } catch (error: any) {
      console.error(JSON.stringify(error.code), 'Error in the firebase auth');
      const errString = error?.code;
      if (errString === 'auth/invalid-credential') {
        sweetAlertToast('error', 'Invalid Credentials');
      }
      reset();
      setLoading(false);
      return;
    }
  };

  useEffect(() => {
    // if user tries to go on step 2 directly by entering url
    if (!user.email) {
      router.push('/sign-in');
      return;
    } // eslint-disable-next-line
  }, []);

  return (
    <div className="flex w-full overflow-auto min-h-screen items-center md:justify-center flex-col bg-[#F5F3EF] relative p-6 pb-32 md:pb-0">
      {/* Use next/image component */}
      <div className="w-full text-center relative md:absolute md:top-16 mb-8 md:m-0">
        <Link className="inline-block" href="#">
          <Image className="h-8 md:h-auto" src={logo} alt="Logo" />
        </Link>
      </div>

      <div className="max-w-[270px] sm:max-w-[484px] w-full py-2">
        <form
          className="flex gap-4 w-full flex-col relative"
          onSubmit={handleSubmit(handleJoin)}
        >
          <div className="relative w-full">
            <input
              disabled
              defaultValue={user.email}
              type="email"
              id="email"
              className="block rounded-2xl px-5 pb-3 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer cursor-not-allowed"
              placeholder=" "
            />
            <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[18px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
              Email
            </label>
          </div>

          <div className="relative w-full">
            <input
              {...register('password', {
                required: 'Password is required',
              })}
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="block rounded-2xl px-5 pb-3 pt-6 pr-12 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
              placeholder=" "
            />
            <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[18px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
              Password
            </label>

            <Image
              onClick={() => tooglePassword(showPassword, setShowPassword)}
              src={showPassword ? eye : eyeSlash}
              alt="eye"
              className="cursor-pointer absolute right-5 top-5"
            />
            {errors.password && (
              <span className="text-red-500">
                {(errors.password as { message: string }).message}
              </span>
            )}
          </div>

          <button
            disabled={loading}
            className="mt-4 text-base  w-full h-[58px] p-2 flex justify-center items-center bg-[#E60054] rounded-2xl font-medium text-white hover:bg-[#C20038]"
            type="submit"
          >
            Join
          </button>

          <p className="mt-2 text-center w-full text-[#1E1E1E] ">
            <Link className="hover:underline" href="/forgot-password">
              Forgot password?
            </Link>
          </p>

          <div className="w-full text-center md:absolute mt-6 md:m-0 left-0 right-0 -bottom-32">
            <Link
              href={'/sign-in?step=1'}
              className="border border-[#E6E3D6] hover:bg-[#E6E3D6] rounded-lg w-11 h-11 inline-flex items-center justify-center"
            >
              <Image src={back} alt="back" />
            </Link>
          </div>
        </form>
      </div>

      <div className="absolute left-0 bottom-0">
        <Image
          className="hidden md:block h-40 lg:h-auto w-auto"
          src={showPassword ? leftshape : leftCloseShape}
          alt="shapes"
        />
        <Image
          className="block md:hidden"
          src={showPassword ? mobleftshape : mobCloseLeft}
          alt="shapes"
        />
      </div>

      <div className="absolute right-0 bottom-0">
        <Image
          className="hidden md:block h-40 lg:h-auto w-auto"
          src={showPassword ? rightshape : rightCloseShape}
          alt="shapes"
        />
        <Image
          className="block md:hidden"
          src={showPassword ? mobrightshape : mobCloseRight}
          alt="shapes"
        />
      </div>
    </div>
  );
};

export default SignInStep2;
