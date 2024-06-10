'use client';
import React, { useState } from 'react';
import InviteSection from './InviteSection';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  min4CharWithoutSpace,
  userNameRegex,
  websiteLinkRegex,
} from '@/utils/regex';
import { getInitialOfEmail } from '@/services/frontend/userService';
import { FIRESTORE_IMG_BASE_START_URL } from '@/constants/constants';
import { encodeUrl } from '@/services/frontend/commonServices';
import Image from 'next/image';
import { uploadFile } from '@/services/frontend/opportunityService';
import { setLoader } from '@/app/redux/slices/loaderSlice';
import { sweetAlertToast } from '@/services/frontend/toastServices';
import { createOrg, updateOrg } from '@/services/frontend/organization';
import { updateOrgDetails } from '@/app/redux/slices/userOrgDetails';
import { useCookies } from 'react-cookie';

const OrganizationForm: React.FC<any> = ({ setShowModal }) => {
  const userOrgDetails = useSelector((state: any) => state.userOrgReducer);
  const [cookies]: any = useCookies();
  const defaultOwner = {
    id: cookies?.userDetails?.id,
    email: cookies?.userDetails?.email,
    username: cookies?.userDetails?.username,
    fullName: cookies?.userDetails?.fullName,
    profileUrl: cookies?.userDetails?.profileUrl,
  };
  const [memberList, setMemberList] = useState<any[]>([defaultOwner]);
  const [avatarFile, setAvatarFile] = useState<any>();
  const [avatarLink, setAvatarLink] = useState<string>('');
  const [avatarErr, setAvatarErr] = useState<string>('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const watchOrganizationName = watch('name');

  const handleSaveChanges = async (formData: any) => {
    formData.avatarLink = '';
    dispatch(setLoader(true));
    if (avatarFile) {
      const filePathName = `organizations/${avatarFile.name}`;
      const pathOfFile = await uploadFile(avatarFile, filePathName);
      formData.avatarLink = `${pathOfFile}?alt=media`;
    }
    const filteredIds = memberList.map((member) => member.id);
    formData.members = filteredIds;
    try {
      const response = await createOrg(formData);
      const { message, data } = response;
      sweetAlertToast('success', message);
      setShowModal(false);
      dispatch(updateOrgDetails(data));
      dispatch(setLoader(false));
    } catch (error: any) {
      dispatch(setLoader(false));
      const { message } = error;
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
          setAvatarFile(file);
          setAvatarLink(imageUrl);
          setAvatarErr('');
        } else {
          // If file size is greater than 10 MB
          setAvatarFile(null);
          setAvatarLink('');
          setAvatarErr('File size must be less than or equal to 10 MB');
        }
      } else {
        // If file format is not allowed, set values to empty
        setAvatarFile(null);
        setAvatarLink('');
        setAvatarErr('Please choose either jpg or png');
      }
    }
  };

  // update form
  const handleUpdateOrg = async (formData: any) => {
    dispatch(setLoader(true));
    formData.avatarLink = userOrgDetails.avatarLink || '';
    formData.orgId = userOrgDetails.id;
    if (avatarFile) {
      dispatch(setLoader(true));
      const filePathName = `organizations/${avatarFile.name}`;
      const pathOfFile = await uploadFile(avatarFile, filePathName);
      formData.avatarLink = `${pathOfFile}?alt=media`;
    }
    try {
      const response = await updateOrg(formData);
      const { message, data } = response;
      sweetAlertToast('success', message, 1000);
      setShowModal(false);
      const updatedData = { ...userOrgDetails, ...data };
      dispatch(updateOrgDetails(updatedData));
      dispatch(setLoader(false));
    } catch (error: any) {
      dispatch(setLoader(false));
      const { message } = error;
      sweetAlertToast('error', message);
    }
  };
  return (
    <form
      className="flex gap-5 w-full flex-col relative px-5"
      onSubmit={handleSubmit(
        userOrgDetails.id ? handleUpdateOrg : handleSaveChanges,
      )}
    >
      <div className="inline-flex w-full items-center rounded-xl bg-[#EDEBE3] p-5 border border-[#E6E3D6] gap-5 ">
        <div className="w-20 h-20 rounded-full bg-[#BAA388] flex items-center justify-center text-3xl text-[#24181B] overflow-hidden">
          {avatarLink || userOrgDetails?.avatarLink ? (
            <Image
              width={20}
              height={20}
              src={
                avatarLink
                  ? avatarLink
                  : `${FIRESTORE_IMG_BASE_START_URL}${encodeUrl(userOrgDetails?.avatarLink)}`
              }
              alt="profile"
              className="w-full h-full object-cover"
            />
          ) : (
            getInitialOfEmail(
              watchOrganizationName
                ? watchOrganizationName
                : userOrgDetails.name
                  ? userOrgDetails.name
                  : 'O',
            )
          )}
        </div>
        <div className="flex-1 inline-flex gap-1.5 flex-wrap">
          <label className="cursro-pointer text-base h-11 px-4 py-3 inline-flex justify-center items-center border border-[#ff000040] bg-inherit rounded-xl font-medium text-[#E60054]  hover:bg-[#ff000017]">
            Upload image{' '}
            <input
              accept=".jpg, .png"
              className="hidden"
              onChange={(e) => handleFileChange(e)}
              type="file"
            ></input>
          </label>
          <p className="text-[#24181B80] text-xs w-full">
            We support PNGs and JPGs under 10MB
          </p>
        </div>
      </div>
      {avatarErr && <span className="text-red-500">{avatarErr}</span>}
      <div className="relative w-full">
        <input
          defaultValue={userOrgDetails.name}
          {...register('name', {
            required: 'Organization Name is required',
            min: {
              value: 4,
              message: 'Minimum 4 characters required.',
            },
            pattern: {
              value: min4CharWithoutSpace,
              message: 'Minimum 4 characters required.',
            },
          })}
          type="type"
          id="name"
          className="block rounded-xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
          placeholder=" "
        />
        <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
          Organization name
        </label>
        {errors.name && (
          <span className="text-red-500">
            {(errors.name as { message: string }).message}
          </span>
        )}
      </div>

      <div className="relative w-full">
        <input
          defaultValue={userOrgDetails.username}
          {...register('username', {
            required: 'Username is required',
            pattern: {
              value: userNameRegex,
              message:
                'Username should not contain spaces & must contain 4 characters',
            },
          })}
          type="type"
          id="username"
          className="block rounded-xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
          placeholder=" "
        />
        <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
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
          defaultValue={userOrgDetails.website}
          {...register('website', {
            required: 'Website link is required.',
            pattern: {
              value: websiteLinkRegex,
              message: 'Enter valid website link',
            },
          })}
          type="type"
          id="website"
          className="block rounded-xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
          placeholder=" "
        />
        <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
          Website
        </label>
        {errors.website && (
          <span className="text-red-500">
            {(errors.website as { message: string }).message}
          </span>
        )}
      </div>
      {!userOrgDetails.id ? (
        <InviteSection memberList={memberList} setMemberList={setMemberList} />
      ) : null}
      <div className="flex items-center justify-end p-6 border-t border-solid border-[#1E1E1E0D] rounded-b">
        <button
          className="text-base  w-full h-[60px] py-3 flex justify-center items-center bg-[#E60054] rounded-xl font-medium text-white hover:bg-[#C20038]"
          type="submit"
        >
          {userOrgDetails.id ? 'Update' : 'Save'} Changes
        </button>
      </div>
    </form>
  );
};

export default OrganizationForm;
