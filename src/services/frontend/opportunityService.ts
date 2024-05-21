import { updateEventDetails } from '@/app/redux/slices/eventType';
import callApi from './callApiService';
import { storage } from '@/firebase/config';
import { ref, uploadBytes } from '@firebase/storage';

export const getEventList = async (dispatch: any) => {
  try {
    const list = await callApi('/get-event-type', 'get');
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
