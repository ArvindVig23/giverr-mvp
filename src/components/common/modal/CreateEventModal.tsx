'use client';
import React, { useEffect, useState } from 'react';
import close from '/public/images/close.svg';
import right from '/public/images/chevron-right-black.svg';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { updateSubmitOppDetails } from '@/app/redux/slices/submitOpportunity';
import { submitEventState } from '@/utils/initialStates/submitOppInitalState';

const CreateEventModal = ({
  heading,
  showModal,
  setShowModal,
  children,
}: any) => {
  const [isEscPressed, setIsEscPressed] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const currentStep = parseInt(searchParams.get('step') || '1');
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === 'Escape') {
        setIsEscPressed(true);
      }
    };

    const handleWindowFocus = () => {
      setIsEscPressed(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, []);

  useEffect(() => {
    if (isEscPressed && showModal) {
      closeModal();
    } // eslint-disable-next-line
  }, [isEscPressed, showModal]);

  const updateStep = (increment: number) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const newStep = Math.min(Math.max(1, currentStep + increment), 4);
    current.set('step', newStep.toString());
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${window.location.pathname}${query}`);
  };

  const closeModal = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.delete('submit-event');
    current.delete('step');
    current.delete('commitment');
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${window.location.pathname}${query}`);
    setShowModal(false);
    setIsEscPressed(false);
    dispatch(updateSubmitOppDetails(submitEventState));
  };
  return (
    <>
      {showModal && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className={`relative w-full my-6 mx-auto max-w-[652px]`}>
            <div className="border-0 rounded-3xl shadow-lg relative flex flex-col w-full bg-[#F5F3EF] outline-none focus:outline-none overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-solid border-[#1E1E1E0D] rounded-t">
                <div className="gap-5 flex items-center ">
                  <div className="flex gap-2.5">
                    <button
                      onClick={() => currentStep !== 1 && updateStep(-1)}
                      disabled={currentStep === 1}
                      type="button"
                      className="w-[30px] h-[30px] min-w-[30px] flex justify-center items-center rounded-xl border border-[#E6E3D6] hover:bg-[#edebe3]"
                    >
                      <Image className="rotate-180" src={right} alt=""></Image>
                    </button>
                    <button
                      disabled={currentStep === 4}
                      onClick={() => updateStep(1)}
                      type="button"
                      className="w-[30px] h-[30px] min-w-[30px] flex justify-center items-center rounded-xl border border-[#E6E3D6] hover:bg-[#edebe3]"
                    >
                      <Image src={right} alt=""></Image>
                    </button>
                  </div>
                  <h3 className="text-base font-semibold">{heading}</h3>
                </div>
                <div className="flex gap-5 items-center">
                  <span className="text-[#24181B80] font-medium">
                    {currentStep} of 4
                  </span>
                  <button
                    className="w-[30px] h-[30px] ml-auto bg-[#24181B] hover:bg-[#454545] border-0 text-white rounded-[10px] flex items-center justify-center float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={closeModal}
                  >
                    <Image src={close} alt="close" />
                  </button>
                </div>
              </div>
              <div className="relative flex-auto flex flex-col gap-5">
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="opacity-80 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
export default CreateEventModal;
