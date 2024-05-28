import { signOut } from 'firebase/auth';
import callApi from './callApiService';
import { auth } from '@/firebase/config';
import { sweetAlertToast } from './toastServices';
import { updateOrganizationList } from '@/app/redux/slices/organizationSlice';

export const checkUsernameAndEmail = async (body: any) => {
  try {
    const response = await callApi('/check-duplicate-user', 'post', body);
    return response;
  } catch (error: any) {
    throw error.data;
  }
};

export const logOut = async (router: any, dispatch: any) => {
  try {
    await signOut(auth);
    const response = await callApi('/logout', 'get');
    const { message } = response;
    sweetAlertToast('success', message);
    router.push('/');
    dispatch(updateOrganizationList([]));
  } catch (error: any) {
    const { message } = error.data;
    sweetAlertToast('error', message);
  }
};
