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
    const fileRef = ref(storage, path);
    const upload = await uploadBytes(fileRef, file);
    return upload.metadata.fullPath;
  } catch (error) {
    console.log(error, 'error in uploading image');
  }
};

// get organization list
export const getOrganizationList = async (dispatch: any) => {
  try {
    const list = await callApi('/organization/get-all', 'get');

    dispatch(updateOrganizationList(list.data));
  } catch (error) {
    console.log(error, 'error in getting the organization list');
  }
};

//  get opportunity list
export const getOpportunityList = async (
  opportunityIds: string,
  currrentPage?: number,
  startDate?: string,
  endDate?: string,
  locationType?: string,
  eventType?: string,
  lat?: string,
  long?: string,
) => {
  try {
    const response = await callApi(
      `/opportunity?page=${currrentPage}&opportunity=${opportunityIds}&startDate=${startDate}&endDate=${endDate}&locationType=${locationType}&eventType=${eventType}
      &lat=${lat}&long=${long}`,
      'get',
    );
    return response.data;

    // setLimit(limit);
  } catch (error: any) {
    throw error.data;
  }
};

// get opportunity details
export const getOpportunityDetails = async (id: string) => {
  try {
    const response: any = await callApi(`/opportunity/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.data;
  }
};

export const volunteerOpportunity = async (oppId: string) => {
  try {
    const response: any = await callApi(`/join-opportunity`, 'post', { oppId });
    return response.data;
  } catch (error: any) {
    console.log(error, 'Error in joining event');
    throw error.data;
  }
};

export const getUserOpportunityList = async (
  userId: string,
  orgId: string,
  currrentPage?: number,
) => {
  try {
    const response = await callApi(
      `/opportunity?page=${currrentPage}&userId=${userId}&orgId=${orgId}`,
      'get',
    );
    return response.data;

    // setLimit(limit);
  } catch (error: any) {
    throw error.data;
  }
};

export const deleteOppApi = async (oppId: string) => {
  try {
    const response: any = await callApi(`/opportunity/${oppId}`, 'delete');
    return response;
  } catch (error: any) {
    throw error.data;
  }
};
