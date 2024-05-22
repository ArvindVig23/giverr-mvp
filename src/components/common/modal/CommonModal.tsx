import React from 'react';
import close from '/public/images/close.svg';
import Image from 'next/image';

const CommonModal = ({
  heading,
  showModal,
  setShowModal,
  subHeading,
  children,
}: any) => {
  return (
    <>
      {showModal && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-full my-6 mx-auto max-w-[652px]">
            <div className="border-0 rounded-3xl shadow-lg relative flex flex-col w-full bg-[#F5F3EF] outline-none focus:outline-none overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-solid border-[#1E1E1E0D] rounded-t">
                <h3 className="text-base font-semibold">{heading}</h3>
                <button
                  className="w-[30px] h-[30px] ml-auto bg-[#24181B] hover:bg-[#454545] border-0 text-white rounded-[10px] flex items-center justify-center float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <Image src={close} alt="close" />
                </button>
              </div>
              <div className="relative py-5 flex-auto flex flex-col gap-5 max-h-modal overflow-auto">
                <h4 className="text-[#24181B] text-2xl font-medium px-5">
                  {subHeading}
                </h4>
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
