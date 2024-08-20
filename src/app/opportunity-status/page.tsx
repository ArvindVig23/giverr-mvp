'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import logo from '/public/images/logo.svg';
import mobleftshape from '/public/images/mobile-close-left1.svg';
import mobCloseRight from '/public/images/mobile-close-right1.svg';
import leftCloseShape from '/public/images/login-left-shape-2.svg';
import rightCloseShape from '/public/images/login-right-shape-2.svg';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { min4CharWithoutSpace } from '@/utils/regex';
import { useRouter, useSearchParams } from 'next/navigation';
import callApi from '@/services/frontend/callApiService';
import { sweetAlertToast } from '@/services/frontend/toastServices';
import { setLoader } from '../redux/slices/loaderSlice';
import successRejected from '/public/images/success-rejected.svg';
const SignInStep2: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  if (!token) {
    router.push('/');
    return null;
  }

  const handleReject = async (formData: any) => {
    const { reason } = formData;
    try {
      dispatch(setLoader(true));
      await callApi(
        `/opportunity-status?token=${token}&status=REJECTED&reason=${reason.trim()}`,
        'get',
      );
      setShowSuccess(true);
      dispatch(setLoader(false));
    } catch (error: any) {
      dispatch(setLoader(false));
      const { message } = error.data;
      sweetAlertToast('error', message);
    }
  };

  return (
    <div className="flex w-full overflow-auto min-h-screen items-center md:justify-center flex-col bg-[#F5F3EF] relative p-6 pb-32 md:pb-0">
      <div className="w-full text-center relative md:absolute md:top-16 md:m-0 z-10">
        <Link className="inline-block" href="/">
          <Image className="h-8 md:h-auto" src={logo} alt="Logo" />
        </Link>
      </div>

      <div className="max-w-[270px] sm:max-w-[484px] w-full py-2">
        {showSuccess ? (
          <div className="flex items-center justify-center min-h-screen bg-[#F5F3EF]">
            <div className="text-center max-w-md w-full px-4">
              <div className="mb-6">
                <Image
                  src={successRejected}
                  alt="success"
                  className="mx-auto"
                />
              </div>
              <h2 className="text-2xl font-bold text-[#E60054] mb-4">
                Opportunity Rejected
              </h2>
              <p className="text-[#1E1E1E] mb-3">
                Your decision has been recorded successfully.
              </p>
              <p className="text-[#1E1E1E] mb-3">
                The opportunity has been removed from the active list.
              </p>
              <p className="text-[#1E1E1E] mb-6">
                This action can&apos;t be undone.
              </p>
              <Link
                href="/"
                className="mt-4 text-base w-full h-[58px] p-2 flex justify-center items-center bg-[#E60054] rounded-2xl font-medium text-white hover:bg-[#C20038]"
              >
                Return to Home
              </Link>
            </div>
          </div>
        ) : (
          <form
            className="flex gap-4 w-full flex-col relative"
            onSubmit={handleSubmit(handleReject)}
          >
            <div className="relative w-full">
              <input
                autoFocus
                {...register('reason', {
                  required: 'Rejection reason is required',
                  min: {
                    value: 4,
                    message: 'Minimum 4 characters required.',
                  },
                  pattern: {
                    value: min4CharWithoutSpace,
                    message: 'Minimum 4 characters required.',
                  },
                })}
                type="text"
                id="reason"
                className="block rounded-2xl px-5 pb-3 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3] border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                placeholder=" "
              />
              <label
                htmlFor="reason"
                className="absolute text-base text-[#1E1E1E80] duration-300 transform -translate-y-4 scale-75 top-[18px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Reason for Rejection
              </label>
              {errors.reason && (
                <span className="text-red-500">
                  {(errors.reason as { message: string }).message}
                </span>
              )}
            </div>

            <button
              className="mt-4 text-base w-full h-[58px] p-2 flex justify-center items-center bg-[#E60054] rounded-2xl font-medium text-white hover:bg-[#C20038]"
              type="submit"
            >
              Reject Opportunity
            </button>
          </form>
        )}
      </div>

      <div className="absolute left-0 bottom-0">
        <Image
          className="hidden md:block h-40 lg:h-auto w-auto"
          src={leftCloseShape}
          alt="shapes"
        />
        <Image className="block md:hidden" src={mobleftshape} alt="shapes" />
      </div>

      <div className="absolute right-0 bottom-0">
        <Image
          className="hidden md:block h-40 lg:h-auto w-auto"
          src={rightCloseShape}
          alt="shapes"
        />
        <Image className="block md:hidden" src={mobCloseRight} alt="shapes" />
      </div>
    </div>
  );
};

export default SignInStep2;
