import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image'; // Import Image from next/image
import logo from '/public/images/logo.svg';
import eye from '/public/images/eye.svg';
import eyeSlash from '/public/images/eye-slash.svg';
import mobleftshape from '/public/images/left-mob-shape1.svg';
import mobrightshape from '/public/images/right-mob-shape1.svg';
import leftshape from '/public/images/login-left-shape-1.svg';
import rightshape from '/public/images/login-right-shape-1.svg';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {
  fullNameregex,
  passwordValidationPattern,
  userNameRegex,
} from '@/utils/regex';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserDetails } from '@/app/redux/slices/userDetailSlice';
import { tooglePassword } from '@/utils/signUpEvent';
import { resetGlobalState } from '@/utils/initialStates/userInitialStates';
import { sweetAlertToast } from '@/services/frontend/toastServices';
import callApi from '@/services/frontend/callApiService';
import { checkUsernameAndEmail } from '@/services/frontend/userService';
import { setLoader } from '@/app/redux/slices/loaderSlice';

const SignUpStep2: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const user: any = useSelector((state: any) => state.userDetailReducer);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    // if user tries to go on step 2 directly by entering url
    if (!user.email) {
      router.push('/sign-up');
      return;
    } // eslint-disable-next-line
  }, []);

  const handleJoin = async (formdetails: any) => {
    const { password, username, fullName } = formdetails;
    dispatch(setLoader(true));
    // check userName exist or not
    try {
      await checkUsernameAndEmail({ username });
    } catch (error: any) {
      dispatch(setLoader(false));
      const { message } = error;
      sweetAlertToast('error', message);
      return;
    }
    // firebase authenticator for email & password
    try {
      await createUserWithEmailAndPassword(auth, user.email, password);
    } catch (error: any) {
      dispatch(setLoader(false));
      const string = error?.customData?._tokenResponse?.error?.message;
      if (string === 'EMAIL_EXISTS') {
        sweetAlertToast('error', 'User with this email already exist');
        return;
      }
    }
    // Api to create the entery in the firestore db
    try {
      const formData = new FormData();
      const newUserDetails = {
        ...user,
        password,
        username,
        fullName,
        isEmailAuth: true,
        status: true,
      };
      formData.append('userDetails', JSON.stringify(newUserDetails));
      const response = await callApi('/sign-up', 'post', formData);
      const message = response.message;
      sweetAlertToast('success', message);
      dispatch(updateUserDetails(resetGlobalState));
      router.push('/sign-in');
      dispatch(setLoader(false));
    } catch (error: any) {
      dispatch(setLoader(false));
      console.log(error, 'error');
      const { message } = error.data;
      sweetAlertToast('error', message);
    }
  };
  return (
    <div className="flex w-full overflow-auto min-h-screen items-center md:justify-center flex-col bg-[#F5F3EF] relative p-6 pb-32 md:pb-0">
      <div className="w-full text-center relative md:absolute md:top-16 mb-8 md:m-0 z-10">
        <Link className="inline-block" href="/">
          <Image className="h-8 md:h-auto" src={logo} alt="Logo" />
        </Link>
      </div>

      <div className="max-w-[270px] sm:max-w-[484px] w-full py-2">
        <form
          className="flex gap-4 w-full flex-col"
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
            <label
              htmlFor="email"
              className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[18px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Email
            </label>
          </div>

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
            <label
              htmlFor="password"
              className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[18px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
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

          <div className="relative w-full">
            <input
              {...register('username', {
                required: 'Username is required',
                pattern: {
                  value: userNameRegex,
                  message:
                    'Username should not contain spaces & must contain 4 characters',
                },
              })}
              type="text"
              id="username"
              className="block rounded-2xl px-5 pb-3 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
              placeholder=" "
            />
            <label
              htmlFor="username"
              className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[18px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Username
            </label>
            {errors.username && (
              <span className="text-red-500">
                {(errors.username as { message: string }).message}
              </span>
            )}
          </div>

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
              htmlFor="fullName"
              className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[18px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Full name
            </label>
            {errors.fullName && (
              <span className="text-red-500">
                {(errors.fullName as { message: string }).message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="mt-4 text-base  w-full h-[58px] p-2 flex justify-center items-center bg-[#E60054] rounded-2xl font-medium text-white hover:bg-[#C20038]"
          >
            Join
          </button>

          <p className="md:mt-2 text-center w-full text-[#1E1E1E80]">
            By creating an account, you accept our{' '}
            <Link className="underline" href="#">
              Terms
            </Link>
            .
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
    </div>
  );
};

export default SignUpStep2;
