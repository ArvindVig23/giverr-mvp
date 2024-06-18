import React, { useState } from 'react';
// import CommonModal from '@/components/common/modal/CommonModal';
// import EventForm from '@/components/common/event/EventForm';
import CreateEventModal from '../common/modal/CreateEventModal';
import CreateEventStep1 from '../common/event/CreateEventStep1';
import { CreateOppDetails } from '@/interface/opportunity';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import CreateEventStep2 from '../common/event/CreateEventStep2';
import CreateEventStep3 from '../common/event/CreateEventStep3';
import CreateEventStep4 from '../common/event/CreateEventStep4';
// import dog from '/public/images/dog-walking.jpg';
// import SuccesModal from '../manageProfile/SuccesModal';

const SubmitEvents = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [eventDetails, setEventDetails] = useState<CreateOppDetails>({
    imageLink: '',
    createdBy: '',
    name: '',
    opportunityType: '',
    description: '',
    activities: '',
    volunteerRequirements: '',
    thumbnailFile: null,
    virtualLocationLink: '',
    physicalLocations: [
      { address: '', city: '', province: '', postalCode: '' },
    ],
    registrationType: '1',
    registrationWebsiteLink: '',
    spots: 0,
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const step = searchParams.get('step') || '1';
  // const step = searchParams.get('step');
  const openModal = () => {
    setShowModal(true);
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('submit-event', 'true');
    current.set('step', '1');
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${pathname}${query}`);
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
            <CreateEventStep1
              eventDetails={eventDetails}
              setEventDetails={setEventDetails}
            />
          ) : step === '2' ? (
            <CreateEventStep2
              eventDetails={eventDetails}
              setEventDetails={setEventDetails}
            />
          ) : step === '3' ? (
            <CreateEventStep3 />
          ) : step === '4' ? (
            <CreateEventStep4
              eventDetails={eventDetails}
              setEventDetails={setEventDetails}
            />
          ) : null}
        </CreateEventModal>
      )}
    </>
  );
};

export default SubmitEvents;
