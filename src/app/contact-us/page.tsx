'use client';
import { emailregex, fullNameregex } from '@/utils/regex';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useDispatch } from 'react-redux';
import { setLoader } from '../redux/slices/loaderSlice';
import callApi from '@/services/frontend/callApiService';
import { sweetAlertToast } from '@/services/frontend/toastServices';
import { useRouter } from 'next/navigation';

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const router = useRouter();
  const handleSubmitContact = async (data: any) => {
    console.log(data, 'data');
    try {
      dispatch(setLoader(true));
      const response = await callApi(`/contact-us`, 'post', data);
      dispatch(setLoader(false));
      const { message } = response;
      reset();
      sweetAlertToast('success', message);
      router.push('/');
    } catch (error: any) {
      dispatch(setLoader(false));
      const { message } = error.data;
      sweetAlertToast('error', message);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-scree">
      <div className="w-full max-w-md p-6 py-20 rounded-lg">
        <form onSubmit={handleSubmit(handleSubmitContact)}>
          <div className="flex flex-col gap-5 w-full">
            <h4 className="text-[#24181B] text-3xl text-center font-medium">
              Contact Us
            </h4>
            <div className="relative w-full">
              <Controller
                name="fullName"
                control={control}
                rules={{
                  required: 'Fullname is required',
                  pattern: {
                    value: fullNameregex,
                    message:
                      'Full name must contain only alphabets and be at least 3 characters long.',
                  },
                  minLength: {
                    value: 3,
                    message: 'Fullname must be at least 3 characters long.',
                  },
                  validate: (value) =>
                    value.trim().length >= 3 ||
                    'Fullname must be at least 3 characters long.',
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="fullName"
                    className="block rounded-2xl px-5 pb-3 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3] border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                    placeholder=" "
                    onChange={(e) => {
                      let value = e.target.value;
                      value = value.replace(/\s{2,}/g, ' ');
                      value = value.replace(/^\s+/, '');
                      e.target.value = value;
                      field.onChange(value);
                    }}
                  />
                )}
              />
              <label
                htmlFor="fullname"
                className="absolute text-base text-[#1E1E1E80] duration-300 transform -translate-y-4 scale-75 top-[18px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Full Name
              </label>
              {errors.fullName && (
                <span className="text-red-500 text-sm mt-1">
                  {(errors.fullName as { message: string }).message}
                </span>
              )}
            </div>
            <div className="relative w-full">
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: emailregex,
                    message: 'Enter a valid email',
                  },
                })}
                type="text"
                id="email"
                className="block rounded-2xl px-5 pb-3 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3] border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="absolute text-base text-[#1E1E1E80] duration-300 transform -translate-y-4 scale-75 top-[18px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Email
              </label>
              {errors.email && (
                <span className="text-red-500 text-sm mt-1">
                  {(errors.email as { message: string }).message}
                </span>
              )}
            </div>
            <div className="relative w-full z-[11] [&_.selected-flag]:!bg-transparent">
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: 'Phone number is required',
                  validate: (value) =>
                    value.length >= 6 || 'Invalid phone number',
                }}
                render={({ field: { onChange, value } }) => (
                  <PhoneInput
                    country={'ca'}
                    value={value}
                    onChange={onChange}
                    inputStyle={{
                      width: '100%',
                      height: '60px',
                      fontSize: '16px',
                      paddingLeft: '60px',
                      borderRadius: '16px',
                      backgroundColor: '#EDEBE3',
                      border: '1px solid #E6E3D6',
                    }}
                    inputClass="focus:outline-none focus:ring-0 focus:border-[#E60054]"
                    containerClass="w-full"
                    buttonStyle={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      paddingLeft: '15px',
                    }}
                  />
                )}
              />
              {errors.phone && (
                <span className="text-red-500 text-sm mt-1">
                  {(errors.phone as { message: string }).message}
                </span>
              )}
            </div>
            <div className="relative w-full">
              <textarea
                {...register('message', {
                  required: 'Please enter message',
                  min: {
                    value: 4,
                    message: 'Minimum 4 characters required.',
                  },
                  // pattern: {
                  //   value: min4CharWithoutSpace,
                  //   message: 'Minimum 4 characters required.',
                  // },
                })}
                id="message"
                className="block rounded-2xl px-5 pb-2.5 h-[120px] pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                placeholder=" "
              />
              <label
                htmlFor="message"
                className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Message
              </label>
              {errors.message && (
                <span className="text-red-500">
                  {(errors.message as { message: string }).message}
                </span>
              )}
            </div>
            <div className="flex items-center justify-end border-t border-solid border-[#1E1E1E0D] rounded-b">
              <button
                className="text-base  w-full h-[60px] py-3 flex justify-center items-center bg-[#E60054] rounded-2xl font-medium text-white hover:bg-[#C20038]"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
