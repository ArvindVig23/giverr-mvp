import { signOut } from 'firebase/auth';
import callApi from './callApiService';
import { auth } from '@/firebase/config';
import { sweetAlertToast } from './toastServices';
import { updateOrganizationList } from '@/app/redux/slices/organizationSlice';
import { updateOrgDetails } from '@/app/redux/slices/userOrgDetails';
import { defaultUserOrgDetail } from '@/utils/initialStates/userInitialStates';
import { TimeZoneSettings } from '@/interface/settings';
import { updateSelectedOrgIdForMembers } from '@/app/redux/slices/selectedOrgIdForMembers';

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
    sweetAlertToast('success', message, 1000);
    router.push('/');
    dispatch(updateOrganizationList([]));
    dispatch(updateOrgDetails(defaultUserOrgDetail));
    dispatch(updateSelectedOrgIdForMembers(''));
  } catch (error: any) {
    const { message } = error.data;
    sweetAlertToast('error', message);
  }
};

// get the first letter of email
export const getInitialOfEmail = (email: string) => {
  return email[0].toUpperCase();
};

export const deleteAccountApi = async () => {
  try {
    const response = await callApi('/delete-account', 'delete');
    return response.data;
  } catch (error: any) {
    throw error.data;
  }
};

//  update users notification

export const updateUsersNotificationSetting = async (data: any) => {
  try {
    const response = await callApi('/notification-settings', 'put', data);
    return response.data;
  } catch (error: any) {
    throw error.data;
  }
};

// create options from the category  details
export const selectedOptionsFromCategory = (item: any) => {
  if (item.opportunityTypeId === '0') {
    return { label: 'All Categories', value: '0' };
  } else {
    return {
      label: item.opportunityTypeData?.name,
      value: item?.opportunityTypeId,
    };
  }
};

// update user settings
export const updateUserTimezoneSetting = async (data: TimeZoneSettings) => {
  try {
    const response: any = await callApi(`/timezone-settings`, 'put', data);
    return response;
  } catch (error: any) {
    console.log(error, 'Error in updating the users setting');
    throw error.data;
  }
};
