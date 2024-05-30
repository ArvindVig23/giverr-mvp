import React from 'react';
import Image from 'next/image'; // Import Image from next/image
import chevronDown from '/public/images/chevron-down.svg';
import { useForm } from 'react-hook-form';
import { emailregex, fullNameregex, userNameRegex } from '@/utils/regex';
import { useCookies } from 'react-cookie';
import { FIRESTORE_IMG_BASE_START_URL } from '@/constants/constants';
import { encodeUrl } from '@/services/frontend/commonServices';

const OpportunitiesBanner: React.FC = () => {
  // const [profileFile, setProfileFile] = useState<any>();
  // const [profileFileUrl, setProfileFileUrl] = useState<string>();
  // const [fileError, setFileError] = useState<string>('');

  const [cookies] = useCookies();
  const { email, profileUrl, fullName, username } = cookies.userDetails;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const updateDetails = (formdata: any) => {
    console.log(formdata, 'data');
  };

  return (
    <div className="w-full">
      <h3 className="text-[32px] font-medium mb-5 mt-0 leading-[36px]">
        Account
      </h3>

      <form
        className="flex gap-5 w-full flex-col"
        onSubmit={handleSubmit(updateDetails)}
      >
        <div className="inline-flex w-full rounded-xl bg-[#EDEBE3] p-5 border border-[#E6E3D6] gap-5 mb-5">
          <div className="w-20 h-20 rounded-full bg-[#BAA388] flex items-center justify-center text-3xl text-[#24181B] overflow-hidden">
            A
            {profileUrl ? (
              <Image
                src={`${FIRESTORE_IMG_BASE_START_URL}${encodeUrl(profileUrl)}`}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : null}
          </div>
          <div className="flex-1 inline-flex gap-2.5 flex-wrap">
            <label className="cursro-pointer text-base h-11 px-4 py-3 inline-flex justify-center items-center border border-[#E60054] bg-inherit rounded-xl font-medium text-[#E60054] hover:text-white hover:bg-[#E60054]">
              Upload image{' '}
              <input
                className="hidden"
                accept=".jpg, .png"
                type="file"
                name="uploadImage"
              ></input>
            </label>
            <p className="text-[#24181B80] text-xs w-full">
              We support PNGs and JPGs under 10MB
            </p>
          </div>
        </div>
        <div className="relative w-full">
          <input
            defaultValue={fullName}
            {...register('fullname', {
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
            className="block rounded-xl px-5 pb-3 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
            placeholder=" "
          />
          <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[18px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
            Full Name
          </label>
          {errors.fullname && (
            <span className="text-red-500">
              {(errors.fullname as { message: string }).message}
            </span>
          )}
        </div>

        <div className="relative w-full">
          <input
            defaultValue={email}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: emailregex,
                message: 'Enter a valid email',
              },
            })}
            type="text"
            id="email"
            className="block rounded-xl px-5 pb-3 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
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

        <div className="relative w-full">
          <input
            defaultValue={username}
            {...register('username', {
              pattern: {
                value: userNameRegex,
                message:
                  'Username should not contain spaces & must contain 4 characters',
              },
            })}
            type="text"
            id="username"
            className="block rounded-xl px-5 pb-3 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
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

          <p className="mt-2 mb-0 text-[#24181B80] text-xs">
            Your Giverr URL: https://giverr.com/anna.smith
          </p>
        </div>

        <div className="relative w-full">
          <select className="block rounded-xl px-5 pb-4 pt-4 w-full text-base text-[#24181B80] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer">
            <option>Select location (optional)</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <Image
            src={chevronDown}
            alt="arrow"
            className="absolute top-[17px] right-4 pointer-events-none"
          />
        </div>
        <button
          type="submit"
          className="text-base  w-full h-[60px] py-3 flex justify-center items-center bg-[#E60054] rounded-xl font-medium text-white hover:bg-[#C20038]"
        >
          Update Details
        </button>
      </form>
    </div>
  );
};

export default OpportunitiesBanner;
