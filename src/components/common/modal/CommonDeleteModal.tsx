import React from 'react';
import Image from 'next/image';
import close from '/public/images/close.svg';

const CommonDeleteModal = ({
  heading,
  showModal,
  setShowModal,
  children,
}: any) => {
  return (
    <div>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-[484px]">
              {/*content*/}
              <div className="border-0 rounded-3xl shadow-lg relative flex flex-col w-full bg-[#F5F3EF] outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-between p-5 border-b border-solid border-[#1E1E1E0D] rounded-t">
                  <h3 className="text-base font-semibold">{heading}</h3>
                  <button
                    className="w-[30px] h-[30px] ml-auto bg-[#24181B] hover:bg-[#454545] border-0 text-white rounded-[10px] flex items-center justify-center float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <Image src={close} alt="close" />
                  </button>
                </div>
                {/*body*/}
                {children}
              </div>
            </div>
          </div>
          <div className="opacity-80 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </div>
  );
};

export default CommonDeleteModal;
