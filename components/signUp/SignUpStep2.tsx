import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image'; // Import Image from next/image
import logo from '../../public/images/logo.svg';
import eye from '../../public/images/eye.svg';
import eyeSlash from '../../public/images/eye-slash.svg';
import mobleftshape from '../../public/images/left-mob-shape.svg';
import mobCloseRight from '../../public/images/mobile-close-right.svg';
import mobCloseLeft from '../../public/images/mobile-close-left.svg';
import mobrightshape from '../../public/images/right-mob-shape.svg';
import leftshape from '../../public/images/left-shapes.svg';
import leftCloseShape from '../../public/images/show-pass-left.svg';
import rightCloseShape from '../../public/images/show-pass-right.svg';
import rightshape from '../../public/images/right-shapes.svg';
import { useForm } from 'react-hook-form';
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
const SignUpStep2: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
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
    const { password, username, fullname } = formdetails;
    setLoading(true);
    // check userName exist or not
    try {
      const user = await checkUsernameAndEmail({ username });
      console.log(user, ' ');
    } catch (error: any) {
      setLoading(false);
      const { message } = error;
      sweetAlertToast('error', message);
      return;
    }
    // firebase authenticator for email & password
    try {
      await createUserWithEmailAndPassword(auth, user.email, password);
    } catch (error: any) {
      setLoading(false);
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
        fullname,
        isEmailAuth: true,
        status: true,
      };
      formData.append('userDetails', JSON.stringify(newUserDetails));
      const response = await callApi('/sign-up', 'post', formData);
      const message = response.message;
      sweetAlertToast('success', message);
      dispatch(updateUserDetails(resetGlobalState));
      router.push('/sign-in');
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log(error, 'error');
      const { message } = error.data;
      sweetAlertToast('error', message);
    }
  };
  return (
    <div className="flex w-full overflow-auto min-h-screen items-center md:justify-center flex-col bg-[#F5F3EF] relative p-6 pb-32 md:pb-0">
      <div className="w-full text-center relative md:absolute md:top-16 mb-8 md:m-0">
        <Link className="inline-block" href="#">
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
            <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[18px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
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
            <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[18px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
              Username
            </label>
            {errors.username && (
              <span className="text-red-500">
                {(errors.username as { message: string }).message}
              </span>
            )}
          </div>

          <div className="relative w-full">
            <input
              {...register('fullname', {
                required: 'Fullname is required',
                pattern: {
                  value: fullNameregex,
                  message:
                    'Full name must contain only alphabets and be at least 3 characters long.',
                },
                minLength: {
                  value: 3, // Minimum length you desire
                  message: 'Fullname must be at least 3 characters long.',
                },
              })}
              type="text"
              id="fullname"
              className="block rounded-2xl px-5 pb-3 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
              placeholder=" "
            />
            <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[18px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
              Full name
            </label>
            {errors.fullname && (
              <span className="text-red-500">
                {(errors.fullname as { message: string }).message}
              </span>
            )}
          </div>

          <button
            disabled={loading}
            type="submit"
            className="mt-4 text-base  w-full h-[58px] p-2 flex justify-center items-center bg-[#E60054] rounded-2xl font-medium text-white hover:bg-[#C20038]"
          >
            Join
          </button>

          <p className="mt-2 text-center w-full text-[#1E1E1E80]">
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

export default SignUpStep2;
