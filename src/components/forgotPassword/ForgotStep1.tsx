import Link from 'next/link';
import React from 'react';
import Image from 'next/image'; // Import Image from next/image
import logo from '/public/images/logo.svg';
import mobleftshape from '/public/images/left-mob-shape.svg';
import mobrightshape from '/public/images/right-mob-shape.svg';
import leftshape from '/public/images/left-shapes.svg';
import rightshape from '/public/images/right-shapes.svg';
import back from '/public/images/arrow-left.svg';
import { useForm } from 'react-hook-form';
import { emailregex } from '@/utils/regex';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { useRouter } from 'next/navigation';

const ForgotStep1: React.FC<{
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setEmail }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const handleForgotPassword = async (formData: any) => {
    try {
      const email: string = formData.email;
      await sendPasswordResetEmail(auth, email);
      setEmail(email);
      router.push('/forgot-password?step=2');
    } catch (error) {
      console.log(error, 'error');
    }
  };
  return (
    <div className="flex w-full overflow-auto min-h-screen items-center justify-center flex-col bg-[#F5F3EF] relative p-6 pb-32 md:pb-0">
      {/* Use next/image component */}
      <div className="w-full text-center  absolute top-16 ">
        <Link className="inline-block" href="#">
          <Image className="h-8 md:h-auto" src={logo} alt="Logo" />
        </Link>
      </div>

      <div className="max-w-[270px] sm:max-w-[484px] w-full py-2">
        <form
          className="flex gap-4 w-full flex-col relative"
          onSubmit={handleSubmit(handleForgotPassword)}
        >
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
              className="block rounded-2xl px-5 pb-3 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
              placeholder=" "
            />
            <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[18px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
              Email
            </label>
            {errors.email && (
              <span className="text-red-500">
                {(errors.email as { message: string }).message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="mt-4 text-base  w-full h-[58px] p-2 flex justify-center items-center bg-[#E60054] rounded-2xl font-medium text-white hover:bg-[#C20038]"
          >
            Send link to reset password
          </button>

          <div className="w-full text-center md:absolute mt-6 md:m-0 left-0 right-0 -bottom-32">
            <Link
              href={'/sign-in?step=2'}
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
export default ForgotStep1;
