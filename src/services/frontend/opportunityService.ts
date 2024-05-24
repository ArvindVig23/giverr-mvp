import { updateEventDetails } from '@/app/redux/slices/eventType';
import callApi from './callApiService';
import { storage } from '@/firebase/config';
import { ref, uploadBytes } from '@firebase/storage';
import { updateOrganizationList } from '@/app/redux/slices/organizationSlice';

export const getEventList = async (dispatch: any) => {
  try {
    const list = await callApi('/opportunity-type', 'get');
    dispatch(updateEventDetails(list.data));
  } catch (error) {
    console.log(error, 'error in getting the event list');
  }
};

export const createFileUrl = (file: any) => {
  const url = URL.createObjectURL(file);
  return url;
};

// upload file
export const uploadFile = async (file: any, path: string) => {
  try {
    const fileRef = ref(storage, `${path}?alt=media`);
    const upload = await uploadBytes(fileRef, file);
    return upload.metadata.fullPath;
  } catch (error) {
    console.log(error, 'error in uploading image');
  }
};

// get organization list
export const getOrganizationList = async (dispatch: any) => {
  try {
    const list = await callApi('/organization', 'get');
    console.log(list, '---list');

    dispatch(updateOrganizationList(list.data));
  } catch (error) {
    console.log(error, 'error in getting the organization list');
  }
};

//  get opportunity list
export const getOpportunityList = async (
  opportunityIds: string,
  currrentPage?: number,
) => {
  try {
    const response = await callApi(
      `/opportunity?page=${currrentPage}&opportunity=${opportunityIds}`,
      'get',
    );
    return response.data;

    // setLimit(limit);
  } catch (error) {
    console.log(error, 'error');
  }
};
