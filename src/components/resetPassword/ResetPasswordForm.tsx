'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image'; // Import Image from next/image
import logo from '/public/images/logo.svg';
import eye from '/public/images/eye.svg';
import mobleftshape from '/public/images/left-mob-shape.svg';
import mobrightshape from '/public/images/right-mob-shape.svg';
import leftshape from '/public/images/left-shapes.svg';
import leftCloseShape from '/public/images/show-pass-left.svg';
import rightshape from '/public/images/right-shapes.svg';
import rightCloseShape from '/public/images/show-pass-right.svg';
import mobCloseRight from '/public/images/mobile-close-right.svg';
import mobCloseLeft from '/public/images/mobile-close-left.svg';
import back from '/public/images/arrow-left.svg';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { passwordValidationPattern } from '@/utils/regex';
import { confirmPasswordReset } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { sweetAlertToast } from '@/services/frontend/toastServices';
import { tooglePassword } from '@/utils/signUpEvent';
import eyeSlash from '/public/images/eye-slash.svg';
import callApi from '@/services/frontend/callApiService';

const ResetPasswordForm: React.FC = () => {
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [token, setToken] = useState<any>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    trigger,
    watch,
  } = useForm();
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const router = useRouter();
  const resetPassword = async (formData: any) => {
    try {
      const email: any = searchParams.get('email');
      await confirmPasswordReset(auth, token, formData.password);
      await callApi('/update-auth-method', 'post', { email });
      sweetAlertToast('success', 'Password reset successfully');
      router.push('/sign-in');
    } catch (error: any) {
      const errorMessage = error.code;
      if (errorMessage === 'auth/invalid-action-code') {
        sweetAlertToast(
          'error',
          'The password reset link has expired. Please request a new one',
        );
      }
      console.log(errorMessage, 'mest');
      router.push('/forgot-password');
    }
  };
  useEffect(() => {
    const token: any = searchParams.get('oobCode');
    if (token) {
      setToken(token);
    } else {
      router.push('/forgot-password');
    } // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (password && confirmPassword) {
      trigger('confirmPassword');
    }
  }, [password, trigger, confirmPassword]);
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
          onSubmit={handleSubmit(resetPassword)}
        >
          <div className="relative w-full">
            <input
              {...register('password', {
                required: 'Password is required',
                pattern: {
                  value: passwordValidationPattern,
                  message:
                    'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
                },
              })}
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="block rounded-2xl px-5 pb-3 pt-6 pr-12 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
              placeholder=" "
            />
            <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[18px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
              New Password
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

          <div className="relative w-full">
            <input
              {...register('confirmPassword', {
                required: 'Confirm Password is required',
                validate: (value) =>
                  value === getValues('password') || 'Passwords do not match',
                deps: [getValues('password')],
              })}
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              className="block rounded-2xl px-5 pb-3 pt-6 pr-12 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
              placeholder=" "
            />
            <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[18px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
              Confirm New Password
            </label>

            <Image
              onClick={() =>
                tooglePassword(showConfirmPassword, setShowConfirmPassword)
              }
              src={showConfirmPassword ? eye : eyeSlash}
              alt="eye"
              className="cursor-pointer absolute right-5 top-5"
            />
            {errors.confirmPassword && (
              <span className="text-red-500">
                {(errors.confirmPassword as { message: string }).message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="mt-4 text-base  w-full h-[58px] p-2 flex justify-center items-center bg-[#E60054] rounded-2xl font-medium text-white hover:bg-[#C20038]"
          >
            Reset
          </button>

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
          src={showPassword || showConfirmPassword ? leftshape : leftCloseShape}
          alt="shapes"
        />
        <Image
          className="block md:hidden"
          src={
            showPassword || showConfirmPassword ? mobleftshape : mobCloseLeft
          }
          alt="shapes"
        />
      </div>

      <div className="absolute right-0 bottom-0">
        <Image
          className="hidden md:block h-40 lg:h-auto w-auto"
          src={
            showPassword || showConfirmPassword ? rightshape : rightCloseShape
          }
          alt="shapes"
        />
        <Image
          className="block md:hidden"
          src={
            showPassword || showConfirmPassword ? mobrightshape : mobCloseRight
          }
          alt="shapes"
        />
      </div>
    </div>
  );
};

export default ResetPasswordForm;
