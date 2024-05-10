'use client';
import { auth } from '@/firebase/config';
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import Link from 'next/link';
import React, { useState } from 'react';
import axios from 'axios';
import Toast from '../notification/ToastNotification';
import { userDetail } from '@/interface/user';
import { ToastData } from '@/interface/notification';

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
    <div className="flex flex-col justify-center items-center h-screen">
      <div></div>
      <div>
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          href={'/sign-up?step=2'}
        >
          Continue
        </Link>
      </div>

      <div className="mt-4">
        <button
          onClick={handleGoogleSignUp}
          type="button"
          className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
        >
          <div className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              className="w-6 h-6"
              viewBox="0 0 48 48"
            >
              <defs>
                <path
                  id="a"
                  d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                />
              </defs>
              <clipPath id="b">
                <use xlinkHref="#a" overflow="visible" />
              </clipPath>
              <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
              <path
                clipPath="url(#b)"
                fill="#EA4335"
                d="M0 11l17 13 7-6.1L48 14V0H0z"
              />
              <path
                clipPath="url(#b)"
                fill="#34A853"
                d="M0 37l30-23 7.9 1L48 0v48H0z"
              />
              <path
                clipPath="url(#b)"
                fill="#4285F4"
                d="M48 48L17 24l-4-3 35-10z"
              />
            </svg>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-apple"
              viewBox="0 0 16 16"
            >
              <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
              <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
            </svg> */}
            <span className="ml-4">Sign-up with Google</span>
          </div>
        </button>
      </div>
      <Toast {...toastData} />
    </div>
  );
};

export default SignUpStep1;
