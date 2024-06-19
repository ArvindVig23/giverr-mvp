import React, { useState } from 'react';
// import CommonModal from '@/components/common/modal/CommonModal';
// import EventForm from '@/components/common/event/EventForm';
import CreateEventModal from '../common/modal/CreateEventModal';
import CreateEventStep1 from '../common/event/CreateEventStep1';
import { SearchParam } from '@/interface/opportunity';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import CreateEventStep2 from '../common/event/CreateEventStep2';
import CreateEventStep3 from '../common/event/CreateEventStep3';
import CreateEventStep4 from '../common/event/CreateEventStep4';
import { updateSearchParams } from '@/services/frontend/commonServices';
// import dog from '/public/images/dog-walking.jpg';
// import SuccesModal from '../manageProfile/SuccesModal';

const SubmitEvents = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const step = searchParams.get('step') || '1';
  // const step = searchParams.get('step');
  const openModal = () => {
    setShowModal(true);
    const params: SearchParam[] = [
      {
        key: 'submit-event',
        value: 'true',
      },
      {
        key: 'step',
        value: '1',
      },
    ];
    updateSearchParams(searchParams, pathname, router, params);
  };
  return (
    <>
      <button
        className="text-base  w-[140px] h-11 px-4 py-3 flex justify-center items-center bg-[#E60054] rounded-xl font-medium text-white hover:bg-[#C20038]"
        type="button"
        onClick={openModal}
      >
        Submit event
      </button>
      {showModal && (
        <CreateEventModal
          heading={'Submit event'}
          showModal={showModal}
          setShowModal={setShowModal}
        >
          {step === '1' ? (
            <CreateEventStep1 />
          ) : step === '2' ? (
            <CreateEventStep2 />
          ) : step === '3' ? (
            <CreateEventStep3 />
          ) : step === '4' ? (
            <CreateEventStep4 />
          ) : null}
        </CreateEventModal>
      )}
    </>
  );
};

export default SubmitEvents;
