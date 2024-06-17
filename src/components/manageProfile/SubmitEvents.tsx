import React, { useState } from 'react';
// import CommonModal from '@/components/common/modal/CommonModal';
// import EventForm from '@/components/common/event/EventForm';
import CreateEventModal from '../common/modal/CreateEventModal';
import CreateEventStep1 from '../common/event/CreateEventStep1';
// import CreateEventStep2 from '../common/event/CreateEventStep2';
// import CreateEventStep3 from '../common/event/CreateEventStep3';
// import CreateEventStep4 from '../common/event/CreateEventStep4';
// import dog from '/public/images/dog-walking.jpg';
// import SuccesModal from '../manageProfile/SuccesModal';

const SubmitEvents = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  // const [showOldModal, setShowOldModal] = useState<boolean>(false);
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
        <CreateEventModal
          heading={'Submit event'}
          showModal={showModal}
          setShowModal={setShowModal}
        >
          <CreateEventStep1 />
          {/* <CreateEventStep2/> */}
          {/* <CreateEventStep3/> */}
          {/* <CreateEventStep4 /> */}
        </CreateEventModal>
      )}
      {/* {
        showOldModal && (
          <CommonModal
          heading={'Submit Event'}
          showModal={showOldModal}
          setShowModal={setShowOldModal}
        >
          <EventForm setShowModal={setShowModal} />
        </CommonModal>
        )
      } */}
    </>
  );
};

export default SubmitEvents;
