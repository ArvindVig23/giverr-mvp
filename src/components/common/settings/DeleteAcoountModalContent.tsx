import { setLoader } from '@/app/redux/slices/loaderSlice';
import { updateOrganizationList } from '@/app/redux/slices/organizationSlice';
import { updateOrgDetails } from '@/app/redux/slices/userOrgDetails';
import { auth } from '@/firebase/config';
import { sweetAlertToast } from '@/services/frontend/toastServices';
import { deleteAccountApi } from '@/services/frontend/userService';
import { defaultUserOrgDetail } from '@/utils/initialStates/userInitialStates';
import { deleteUser } from 'firebase/auth';
import React from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const DeleteAcoountModalContent = ({ setShowModal }: any) => {
  const [cookies, , removeCookie] = useCookies();
  const { register, watch } = useForm();
  const usernameValue = watch('username');
  const dispatch = useDispatch();
  const deleteAccount = async () => {
    try {
      dispatch(setLoader(true));
      //   remove user from the firestore
      const user: any = auth.currentUser;
      deleteUser(user);
      await deleteAccountApi();
      dispatch(updateOrganizationList([]));
      dispatch(updateOrgDetails(defaultUserOrgDetail));
      dispatch(setLoader(false));
      sweetAlertToast('success', 'Account Deleted Successfully', 1000);
      removeCookie('userDetails');
      removeCookie('userToken');
    } catch (error) {
      dispatch(setLoader(false));
      console.log(error, 'Error in deleting account');
      sweetAlertToast('error', 'Error in deleting account');
    }
  };
  return (
    <div>
      <div className="relative p-5 pt-2.5 flex-auto flex flex-col gap-5 overflow-auto">
        <p className="text-base text-[#24181B] m-0">
          By deleting your account you and your organization will lose access to
          Giverr and all data will be lost. This is a permanent action and
          cannot be undone.
        </p>
        <div>
          <p className="text-xs mb-2">
            Please type your username &apos;
            <span className="font-medium">{cookies.userDetails.username}</span>
            &apos; below to confirm deletion.
          </p>
          <div className="relative w-full">
            <input
              {...register('username')}
              type="username"
              id="name"
              className="block rounded-xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
              placeholder=" "
            />
            <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
              {cookies.userDetails.username}
            </label>
          </div>
        </div>
      </div>
      {/*footer*/}
      <div className="flex flex-col items-center justify-end p-6 pt-5  rounded-b gap-2.5">
        <button
          className="text-base text-[#24181B]  w-full h-11 px-4 py-3 flex justify-center items-center bg-inherit rounded-xl font-medium   border border-[#E6E3D6] hover:bg-[#EDEBE3]"
          type="button"
          onClick={() => setShowModal(false)}
        >
          Continue using Giverr
        </button>
        <button
          disabled={usernameValue !== cookies.userDetails.username}
          className={`text-base w-full h-11 py-3 flex justify-center items-center bg-[#E60054] rounded-xl font-medium text-white hover:bg-[#C20038] ${usernameValue !== cookies.userDetails.username ? 'cursor-not-allowed' : ''}`}
          type="button"
          onClick={() => deleteAccount()}
        >
          Permanently delete account
        </button>
      </div>
    </div>
  );
};

export default DeleteAcoountModalContent;
