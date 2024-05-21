import { updateEventDetails } from '@/app/redux/slices/eventType';
import callApi from './callApiService';
import { db, storage } from '@/firebase/config';
import { ref, uploadBytes } from '@firebase/storage';
import responseHandler from '../../lib/responseHandler';
import { addDoc, collection } from 'firebase/firestore';

export const fileTypes = ['JPG', 'PNG', 'JPEG'];
export const handleFile = (
  file: any,
  setThumbnailFile: any,
  setFileError: any,
  setThumbnailUrl: any,
) => {
  if (file) {
    setFileError('');
    const url = URL.createObjectURL(file);
    setThumbnailUrl(url);
    setThumbnailFile(file);
  }
};

export const validateFile = (
  error: string,
  setFileError: any,
  setThumbnailUrl: any,
  setThumbnailFile: any,
) => {
  if (error) {
    setFileError(
      'Unsupported format. Use PNG, JPG (under 5MB), 1068x646 pixels.',
    );
    setThumbnailUrl('');
    setThumbnailFile(null);
    return;
  } else {
    setFileError('');
  }
};

export const removeImg = (
  setFileError: any,
  setThumbnailUrl: any,
  setThumbnailFile: any,
) => {
  setFileError('Please choose thumbnail file.');
  setThumbnailUrl('');
  setThumbnailFile(null);
};

export const getEventList = async (dispatch: any) => {
  try {
    const list = await callApi('/get-event-type', 'get');
    dispatch(updateEventDetails(list.data));
  } catch (error) {
    console.log(error, 'error in getting the event list');
  }
};

export const closeModal = (
  reset: any,
  setShowModal: any,
  setFileError: any,
  setThumbnailUrl: any,
  setThumbnailFile: any,
) => {
  reset();
  setShowModal(false);
  setFileError('');
  setThumbnailUrl('');
  setThumbnailFile(null);
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

// create opportunity
export const createOpportunity = async (opportunity: any) => {
  try {
    const {
      name,
      registrationType,
      frequency,
      description,
      activities,
      volunteerRequirements,
      registrationWebsiteLink,
      organizationId,
      opportuntyType,
      eventDate,
      createdBy,
      imageLink,
      location,
    } = opportunity;
    const createOpportunity = await addDoc(collection(db, 'opportunities'), {
      name: name.trim(),
      registrationType,
      frequency,
      description,
      activities,
      volunteerRequirements,
      registrationWebsiteLink,
      organizationId,
      opportuntyType,
      eventDate,
      createdBy,
      imageLink,
      location,
      lowercaseName: name.toLowerCase().trim(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const response = responseHandler(
      200,
      true,
      createOpportunity,
      'Opportunity created Successfully',
    );
    return response;
  } catch (error) {
    const response = responseHandler(
      500,
      false,
      null,
      'Error in creating new opportunity.',
    );
    return response;
  }
};
