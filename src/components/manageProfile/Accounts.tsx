import React, { useState } from 'react';
import Image from 'next/image'; // Import Image from next/image
import chevronDown from '/public/images/chevron-down.svg';
import { useForm } from 'react-hook-form';
import { fullNameregex } from '@/utils/regex';
import { useCookies } from 'react-cookie';
import { FIRESTORE_IMG_BASE_START_URL } from '@/constants/constants';
import { encodeUrl } from '@/services/frontend/commonServices';
import { getInitialOfEmail } from '@/services/frontend/userService';
import { uploadFile } from '@/services/frontend/opportunityService';
import { useDispatch } from 'react-redux';
import { setLoader } from '@/app/redux/slices/loaderSlice';
import callApi from '@/services/frontend/callApiService';
import { sweetAlertToast } from '@/services/frontend/toastServices';
import CommonDeleteModal from '../common/modal/CommonDeleteModal';
import DeleteAcoountModalContent from '../common/settings/DeleteAcoountModalContent';

const OpportunitiesBanner: React.FC = () => {
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [profileFile, setProfileFile] = useState<any>();
  const [profileFileUrl, setProfileFileUrl] = useState<string>();
  const [fileError, setFileError] = useState<string>('');

  const [cookies] = useCookies();
  const { email, profileUrl, fullName, username } = cookies.userDetails;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const updateDetails = async (data: any) => {
    if (!profileUrl && !profileFile) {
      setFileError('Profile picture is required.');
      return;
    }
    dispatch(setLoader(true));
    if (profileFile) {
      const filePathName = `users/${profileFile.name}`;
      const pathOfFile = await uploadFile(profileFile, filePathName);
      data.profileUrl = `${pathOfFile}?alt=media`;
    }
    data.profileUrl = data.profileUrl || profileUrl;
    try {
      const response = await callApi('/update-profile', 'put', data);
      const { message } = response;
      sweetAlertToast('success', message, 3000);
      dispatch(setLoader(false));
    } catch (error: any) {
      dispatch(setLoader(false));
      const { message } = error.data;
      sweetAlertToast('error', message);
    }
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      // Check if the file format is allowed (png, svg, jpg, jpeg)
      const allowedFormats = ['png', 'jpg', 'jpeg'];
      const fileFormat = file.name.split('.').pop().toLowerCase();

      if (allowedFormats.includes(fileFormat)) {
        const maxFileSize = 10 * 1024 * 1024; // 10 MB in bytes
        if (file.size <= maxFileSize) {
          const imageUrl = URL.createObjectURL(file);

          // Update profile file state
          setProfileFile(file);
          setProfileFileUrl(imageUrl);
          setFileError('');
        } else {
          // If file size is greater than 10 MB
          setProfileFile(null);
          setProfileFileUrl('');
          setFileError('File size must be less than or equal to 10 MB');
        }
      } else {
        // If file format is not allowed, set values to empty
        setProfileFile(null);
        setProfileFileUrl('');
        setFileError('Please choose either jpg or png');
      }
    }
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
        <div className="inline-flex items-center w-full rounded-xl bg-[#EDEBE3] p-5 border border-[#E6E3D6] gap-5">
          <div className="w-20 h-20 rounded-full bg-[#BAA388] flex items-center justify-center text-3xl text-[#24181B] overflow-hidden">
            {profileUrl || profileFileUrl ? (
              <Image
                width={20}
                height={20}
                src={
                  profileFileUrl
                    ? profileFileUrl
                    : `${FIRESTORE_IMG_BASE_START_URL}${encodeUrl(profileUrl)}`
                }
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              getInitialOfEmail(email)
            )}
          </div>
          <div className="flex-1 inline-flex gap-1.5 flex-wrap ">
            <label className="cursro-pointer text-base h-11 px-4 py-3 inline-flex justify-center items-center bg-inherit rounded-xl font-medium text-[#E60054]  border border-[#E6005433] hover:bg-[#E600540D]">
              Upload image{' '}
              <input
                onChange={(e) => handleFileChange(e)}
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
        {fileError && <span className="text-red-500">{fileError}</span>}
        <div className="relative w-full">
          <input
            defaultValue={fullName}
            {...register('fullName', {
              required: 'Fullname is required',
              min: {
                value: 3,
                message: 'Minimum 3 characters required.',
              },
              pattern: {
                value: fullNameregex,
                message: 'Full name must contain only alphabets.',
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
          {errors.fullName && (
            <span className="text-red-500">
              {(errors.fullName as { message: string }).message}
            </span>
          )}
        </div>

        <div className="relative w-full">
          <input
            disabled
            defaultValue={email}
            type="text"
            id="email"
            className="block rounded-xl px-5 pb-3 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer cursor-not-allowed"
            placeholder=" "
          />
          <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[18px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
            Email
          </label>
        </div>

        <div className="relative w-full">
          <input
            defaultValue={username}
            disabled
            type="text"
            id="username"
            className="block rounded-xl px-5 pb-3 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer cursor-not-allowed"
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
      <hr className="mb-[60px]"></hr>
      <div className="inline-flex w-full items-center gap-4 justify-between">
        <div className="inline-flex w-full items-center gap-4">
          <h2 className="flex-grow font-medium text-2xl">Danger Zone</h2>{' '}
          <button
            onClick={() => setShowDeleteModal(true)}
            type="button"
            className="text-base  h-11 px-4 py-3 justify-end flex items-center bg-inherit rounded-xl font-medium text-[#E60054]  border border-[#E6005433] hover:bg-[#E600540D]"
          >
            Delete Account
          </button>
        </div>
      </div>
      {showDeleteModal && (
        <CommonDeleteModal
          heading={'Permanently delete account'}
          showModal={showDeleteModal}
          setShowModal={setShowDeleteModal}
        >
          <DeleteAcoountModalContent setShowModal={setShowDeleteModal} />
        </CommonDeleteModal>
      )}
    </div>
  );
};

export default OpportunitiesBanner;
