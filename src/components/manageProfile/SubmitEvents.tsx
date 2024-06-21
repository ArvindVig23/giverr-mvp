import React, { useEffect, useState } from 'react';
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
import CommonModal from '../common/modal/CommonModal';
import plus from '/public/images/plus1.svg';
import Image from 'next/image';
// import dog from '/public/images/dog-walking.jpg';
// import SuccesModal from '../manageProfile/SuccesModal';
import Succuss from '/public/images/img.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { updateSubmitOppDetails } from '@/app/redux/slices/submitOpportunity';
import { submitEventState } from '@/utils/initialStates/submitOppInitalState';

const SubmitEvents = () => {
  const eventDetails = useSelector((state: any) => state.submitOppReducer);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [thankYouModal, setThankYouModal] = useState<boolean>(false);
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
  useEffect(() => {
    if (thankYouModal) {
      setShowModal(false);
    }
  }, [thankYouModal]);

  const dispatch = useDispatch();
  const closeThankYouModal = () => {
    dispatch(updateSubmitOppDetails(submitEventState));
    setThankYouModal(false);
  };
  return (
    <>
      <button
        className="text-base  w-[140px] h-11 px-4 py-3 hidden md:flex justify-center items-center bg-[#E60054] rounded-xl font-medium text-white hover:bg-[#C20038]"
        type="button"
        onClick={openModal}
      >
        Submit event
      </button>

      <button
        className="block md:hidden mobile-btn"
        type="button"
        onClick={openModal}
      >
        <Image src={plus} alt="add" />
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
            <CreateEventStep4 setThankYouModal={setThankYouModal} />
          ) : null}
        </CreateEventModal>
      )}
      {thankYouModal && (
        <CommonModal
          heading={'Submit Event'}
          showModal={thankYouModal}
          setShowModal={setThankYouModal}
          closeModalOptional={closeThankYouModal}
        >
          <div className="flex flex-col gap-5">
            <div className="p-5 flex flex-col gap-5 submit-events">
              {' '}
              <h4 className="text-[#24181B] text-2xl font-medium">
                You are all set!
              </h4>
              <div className="overflow-hidden rounded-lg w-full">
                <Image className="w-full" src={Succuss} alt="success" />
              </div>
              <p>
                Your submission for the event &apos;{eventDetails.name}&apos;
                has been received. We&apos;re thrilled to start reviewing your
                details and will provide you with updates shortly.
              </p>
              <p>Please expect to hear from us within 1 to 3 days.</p>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-[#1E1E1E0D] rounded-b">
              <button
                onClick={closeThankYouModal}
                className="text-base  w-full h-[60px] py-3 flex justify-center items-center bg-[#E60054] rounded-xl font-medium text-white hover:bg-[#C20038]"
                type="button"
              >
                Close
              </button>{' '}
            </div>
          </div>
        </CommonModal>
      )}
    </>
  );
};

export default SubmitEvents;
