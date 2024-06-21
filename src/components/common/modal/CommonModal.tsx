'use client';
import React, { useEffect, useState } from 'react';
import close from '/public/images/close.svg';
import Image from 'next/image';

const CommonModal = ({
  heading,
  showModal,
  setShowModal,
  children,
  closeModalOptional,
}: any) => {
  const [isEscPressed, setIsEscPressed] = useState<boolean>(false);
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
      if (closeModalOptional) {
        closeModalOptional();
      } else {
        setShowModal(false);
        setIsEscPressed(false);
      }
    } // eslint-disable-next-line
  }, [isEscPressed, showModal]);
  return (
    <>
      {showModal && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div
            className={`relative w-full md:my-6 mx-auto max-w-[652px] ${heading === 'Invite Members' ? 'test' : ''}`}
          >
            <div className="border-0 md:rounded-3xl shadow-lg relative flex flex-col w-full bg-[#F5F3EF] outline-none focus:outline-none overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-solid border-[#1E1E1E0D] rounded-t">
                <h3 className="text-base font-semibold">{heading}</h3>
                <button
                  className="w-[30px] h-[30px] ml-auto bg-[#24181B] hover:bg-[#454545] border-0 text-white rounded-[10px] flex items-center justify-center float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() =>
                    closeModalOptional
                      ? closeModalOptional()
                      : setShowModal(false)
                  }
                >
                  <Image src={close} alt="close" />
                </button>
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
export default CommonModal;
