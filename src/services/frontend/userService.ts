import { signOut } from 'firebase/auth';
import callApi from './callApiService';
import { auth } from '@/firebase/config';
import { sweetAlertToast } from './toastServices';

export const checkUsernameAndEmail = async (body: any) => {
  try {
    const response = await callApi('/check-duplicate-user', 'post', body);
    return response;
  } catch (error: any) {
    throw error.data;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    const response = await callApi('/logout', 'get');
    console.log(response);
    const { message } = response;
    sweetAlertToast('success', message);
  } catch (error: any) {
    const { message } = error.data;
    sweetAlertToast('error', message);
  }
};
