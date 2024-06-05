import { setLoader } from '@/app/redux/slices/loaderSlice';
import { updateOrgDetails } from '@/app/redux/slices/userOrgDetails';
import { deleteOrg } from '@/services/frontend/organization';
import { sweetAlertToast } from '@/services/frontend/toastServices';
import { defaultUserOrgDetail } from '@/utils/initialStates/userInitialStates';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

const DeleteModalContent = ({ setShowModal }: any) => {
  const userOrgDetails = useSelector((state: any) => state.userOrgReducer);
  const { register, watch } = useForm();
  const usernameValue = watch('username');
  const dispatch = useDispatch();
  const handleDeleteOrg = async () => {
    try {
      dispatch(setLoader(true));
      const response = await deleteOrg(userOrgDetails.id);
      const { message } = response;
      sweetAlertToast('success', message, 1000);
      dispatch(setLoader(false));
      setShowModal(false);
      dispatch(updateOrgDetails(defaultUserOrgDetail));
    } catch (error: any) {
      dispatch(setLoader(false));
      const { message } = error;
      sweetAlertToast('error', message);
    }
  };
  return (
    <div>
      <div className="relative p-5 flex-auto flex flex-col gap-5 max-h-modal overflow-auto">
        <p className="text-base text-[#24181B] m-0">
          By deleting your organization you and your members will lose access to
          Giverr and all data will be lost. This is a permanent action and
          cannot be undone.
        </p>
        <p>
          Please type your organization username &apos;{userOrgDetails.username}
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
            Organization username
          </label>
        </div>
      </div>
      {/*footer*/}
      <div className="flex items-center justify-end p-6 border-t border-solid border-[#1E1E1E0D] rounded-b gap-2.5">
        <button
          className="text-base  w-3/6 h-11 px-4 py-3 flex justify-center items-center bg-inherit rounded-xl font-medium text-[#E60054]  border border-[#E6005433] hover:bg-[#E600540D]"
          type="button"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>
        <button
          disabled={usernameValue !== userOrgDetails.username}
          className={`text-base w-3/6 h-11 py-3 flex justify-center items-center bg-[#E60054] rounded-xl font-medium text-white hover:bg-[#C20038] ${usernameValue !== userOrgDetails.username ? 'cursor-not-allowed' : ''}`}
          type="button"
          onClick={() => handleDeleteOrg()}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteModalContent;
