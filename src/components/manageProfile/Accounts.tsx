import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image'; // Import Image from next/image
import chevronDown from '/public/images/chevron-down.svg';
import { useForm } from 'react-hook-form';
import {
  fullNameregex,
  passwordValidationPattern,
  userNameRegex,
} from '@/utils/regex';
import { useCookies } from 'react-cookie';
import {
  FIRESTORE_IMG_BASE_START_URL,
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
} from '@/constants/constants';
import { encodeUrl } from '@/services/frontend/commonServices';
import { getInitialOfEmail } from '@/services/frontend/userService';
import { uploadFile } from '@/services/frontend/opportunityService';
import { useDispatch } from 'react-redux';
import { setLoader } from '@/app/redux/slices/loaderSlice';
import callApi from '@/services/frontend/callApiService';
import { sweetAlertToast } from '@/services/frontend/toastServices';
import CommonDeleteModal from '../common/modal/CommonDeleteModal';
import DeleteAcoountModalContent from '../common/settings/DeleteAcoountModalContent';
import { auth } from '@/firebase/config';
import { updatePassword } from 'firebase/auth';
import { Autocomplete, Libraries, useLoadScript } from '@react-google-maps/api';

const OpportunitiesBanner: React.FC = () => {
  // google api load and autocomplete state
  const [autocompletes, setAutocompletes] = useState<any>([]);

  // to resolve the warning from console useMemo to memoize both the libraries array and the options object
  const libraries = useMemo<Libraries>(() => ['places'], []);

  const { isLoaded } = useLoadScript(
    useMemo(
      () => ({
        googleMapsApiKey: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        libraries: libraries,
      }),
      [libraries],
    ),
  );

  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [profileFile, setProfileFile] = useState<any>();
  const [profileFileUrl, setProfileFileUrl] = useState<string>();
  const [fileError, setFileError] = useState<string>('');

  const [cookies] = useCookies();
  const { email, profileUrl, fullName, username, locationName } =
    cookies.userDetails;
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const updateDetails = async (data: any) => {
    if (fileError) {
      return;
    }
    dispatch(setLoader(true));

    if (profileFile) {
      const filePathName = `users/${profileFile.name}`;
      const pathOfFile = await uploadFile(profileFile, filePathName);
      data.profileUrl = `${pathOfFile}?alt=media`;
    }
    data.profileUrl = data.profileUrl || profileUrl;
    if (data.password) {
      try {
        const user = auth.currentUser;
        const updatepass = await updatePassword(user!, data.password);
        console.log(updatepass, 'success');
      } catch (error) {
        sweetAlertToast('error', 'Error in updating details.');
        dispatch(setLoader(false));
        return;
      }
    }
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

  useEffect(() => {
    if (showDeleteModal) {
      document.body.classList.add('delete-modal-open');
    } else {
      document.body.classList.remove('delete-modal-open');
    }
  }, [showDeleteModal]);

  const locationWatch = watch('locationName');
  const onPlaceChanged = () => {
    const place = autocompletes.getPlace();
    if (place.geometry && place.geometry.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setValue('locationName', place.formatted_address);
      setValue('lat', lat);
      setValue('long', lng);
    }
  };

  useEffect(() => {
    if (!locationWatch) {
      setValue('lat', null);
      setValue('long', null);
    }
  }, [locationWatch]);
  return (
    <div className="w-full">
      <h3 className="text-[20px] md:text-[32px] font-medium mb-5 mt-0 leading-[36px] text-center md:text-left border-b-[0.5px] border-[#E6E3D6] py-4 md:py-0 md:border-none">
        Account
      </h3>
      <div className="px-4 pb-4 md:p-0">
        <form
          className="flex gap-5 w-full flex-col "
          onSubmit={handleSubmit(updateDetails)}
        >
          <div className="inline-flex items-center w-full rounded-2xl bg-[#EDEBE3] p-4 md:p-5 border border-[#E6E3D6] gap-4 md:gap-5">
            <div className="w-16 h-16 min-w-16 md:w-20 md:min-w-20 md:h-20 rounded-full bg-[#BAA388] flex items-center justify-center text-3xl text-[#24181B] overflow-hidden">
              {profileUrl || profileFileUrl ? (
                <Image
                  width={20}
                  height={20}
                  unoptimized={true}
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
                />
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
              className="block rounded-2xl px-5 pb-3 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
              placeholder=" "
            />
            <label
              htmlFor="fullname"
              className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[18px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
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
                pattern: {
                  value: passwordValidationPattern,
                  message:
                    'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
                },
              })}
              type="password"
              id="password"
              className="block rounded-2xl px-5 pb-3 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
              placeholder="********"
            />
            <label
              htmlFor="password"
              className="absolute text-[12px] text-[#1E1E1E80] duration-300  top-[2px] z-10 origin-[0] start-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 translate-x-1/4 !left-[9px]"
            >
              Password
            </label>
            {errors.password && (
              <span className="text-red-500">
                {(errors.password as { message: string }).message}
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

            <p className="mt-2 mb-0 text-[#24181B80] text-xs">
              {`Your Giverr URL: https://giverr.com/${username}`}
            </p>
          </div>

          <div className="relative w-full">
            {isLoaded ? (
              <Autocomplete
                onLoad={(autocomplete) => {
                  let newAutocompletes: any = [...autocompletes];
                  newAutocompletes = autocomplete;
                  setAutocompletes(newAutocompletes);
                }}
                onPlaceChanged={onPlaceChanged}
              >
                <input
                  defaultValue={locationName}
                  {...register(`locationName`, {
                    onChange: () => trigger(`locationName`),
                  })}
                  type="text"
                  id={`locationName`}
                  className="block rounded-2xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3] border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                  placeholder="Select location (optional)"
                />
              </Autocomplete>
            ) : (
              <>
                <select className="block rounded-2xl px-5 pb-4 pt-4 w-full text-base text-[#24181B80] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer">
                  <option>Select location (optional)</option>
                </select>
                <Image
                  src={chevronDown}
                  alt="arrow"
                  className="absolute top-[17px] right-4 pointer-events-none"
                />
              </>
            )}
          </div>
          <button
            type="submit"
            className="text-base  w-full h-[60px] py-3 flex justify-center items-center bg-[#E60054] rounded-2xl font-medium text-white hover:bg-[#C20038]"
          >
            Update Details
          </button>
        </form>
        <hr className="my-[40px] md:my-[60px]"></hr>
        <div className="inline-flex w-full items-center gap-4 justify-between mb-8">
          <div className="inline-flex w-full items-center gap-4">
            <h2 className="flex-grow font-medium md:text-2xl">Danger Zone</h2>{' '}
            <button
              onClick={() => setShowDeleteModal(true)}
              type="button"
              className="text-base  h-11  px-3 md:px-4 py-3 justify-end flex items-center bg-inherit rounded-xl font-medium text-[#E60054]  border border-[#E6005433] hover:bg-[#E600540D]"
            >
              Delete Account
            </button>
          </div>
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
