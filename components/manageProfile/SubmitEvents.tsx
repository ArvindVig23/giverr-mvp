import React, { useState } from 'react';
import EventFormModal from '../common/opportunity/EventFormModal';
import { closeModal, uploadFile } from '@/services/opportunityServices';
import callApi from '@/services/callApiService';
import { useCookies } from 'react-cookie';
import { sweetAlertToast } from '@/services/toastServices';
import { useForm } from 'react-hook-form';
import moment from 'moment-timezone';
// import dog from '../../public/images/dog-walking.jpg';
// import SuccesModal from '../manageProfile/SuccesModal';

const SubmitEvents = () => {
  const { reset } = useForm();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [thumbnailFile, setThumbnailFile] = useState<any>('');
  const [fileError, setFileError] = useState<string>('');
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  const [cookies] = useCookies();
  const handleFormSubmit = async (data: any) => {
    if (!thumbnailFile) {
      setFileError('Pleae select thumbnail');
      return;
    }
    if (thumbnailFile) {
      const filePathName = `opportunities/${thumbnailFile.name}`;
      const pathOfFile = await uploadFile(thumbnailFile, filePathName);
      data.imageLink = pathOfFile;
    }
    data.createdBy = cookies.userDetails.id;
    const eventDate = data.eventDate;
    const eventTime = data.eventTime;
    // 1. Convert eventDate to UTC
    const utcEventDate = moment.tz(eventDate, moment.locale()).utc();
    // 2. Convert eventTime to UTC
    const utcEventTime = moment.tz(eventTime, moment.locale()).utc();
    // 3. Replace the time in utcEventDate with the time of utcEventTime
    utcEventDate.set({
      hour: utcEventTime.hour(),
      minute: utcEventTime.minute(),
      second: utcEventTime.second(),
      millisecond: utcEventTime.millisecond(),
    });
    const eventDateTime = utcEventDate.format();
    data.eventDate = eventDateTime;
    const formData = new FormData();
    formData.append('eventDetails', JSON.stringify(data));
    try {
      const response = await callApi('/opportunity', 'post', formData);
      const { message } = response;
      sweetAlertToast('success', message);
      closeModal(
        reset,
        setShowModal,
        setFileError,
        setThumbnailUrl,
        setThumbnailFile,
      );
    } catch (error: any) {
      const { message } = error.data;
      sweetAlertToast('error', message);
    }
  };
  return (
    <>
      <button
        className="text-base  w-[140px] h-11 px-4 py-3 flex justify-center items-center bg-[#E60054] rounded-xl font-medium text-white hover:bg-[#C20038]"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Submit event
      </button>
      {showModal && (
        <EventFormModal
          showModal={showModal}
          setShowModal={setShowModal}
          setThumbnailFile={setThumbnailFile}
          fileError={fileError}
          setFileError={setFileError}
          thumbnailUrl={thumbnailUrl}
          setThumbnailUrl={setThumbnailUrl}
          handleFormSubmit={handleFormSubmit}
        />
      )}
    </>
  );
};

export default SubmitEvents;
