import React, { useState } from 'react';
import CommonModal from '@/components/common/modal/CommonModal';
import EventForm from '@/components/common/event/EventForm';
// import dog from '/public/images/dog-walking.jpg';
// import SuccesModal from '../manageProfile/SuccesModal';

const SubmitEvents = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
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
        <CommonModal
          heading={'Submit Event'}
          subHeading={'Event details'}
          showModal={showModal}
          setShowModal={setShowModal}
        >
          <EventForm setShowModal={setShowModal} />
        </CommonModal>
      )}
    </>
  );
};

export default SubmitEvents;
