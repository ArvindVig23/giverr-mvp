import React, { useEffect } from 'react';
import Image from 'next/image';
import close from '../../public/images/close.svg';
// import dog from '../../public/images/dog-walking.jpg';
// import SuccesModal from '../manageProfile/SuccesModal';

export default function Modal() {
  const [showModal, setShowModal] = React.useState(false);

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

  return (
    <>
      <button
        className="text-[#24181B] text-base font-medium bg-white px-4 py-2 rounded-e-xl	"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Delete
      </button>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-[484px]">
              {/*content*/}
              <div className="border-0 rounded-3xl shadow-lg relative flex flex-col w-full bg-[#F5F3EF] outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-between p-5 border-b border-solid border-[#1E1E1E0D] rounded-t">
                  <h3 className="text-base font-semibold">Delete event</h3>
                  <button
                    className="w-[30px] h-[30px] ml-auto bg-[#24181B] hover:bg-[#454545] border-0 text-white rounded-[10px] flex items-center justify-center float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <Image src={close} alt="close" />
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-5 flex-auto flex flex-col gap-5 max-h-modal overflow-auto">
                  <h4 className="text-[#24181B] text-2xl font-medium">
                    You are deleting an volunteer opportunity
                  </h4>
                  <p className="text-base text-[#24181B] m-0">
                    Are you sure you want to delete the &apos;Street Clean
                    Up&apos; event? It&apos;s a great chance to volunteer and
                    make our community cleaner.
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-[#1E1E1E0D] rounded-b gap-2.5">
                  <button
                    className="text-base  w-3/6 h-11 px-4 py-3 flex justify-center items-center bg-inherit rounded-xl font-medium text-[#E60054]  border border-[#E6005433] hover:bg-[#E600540D]"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-base w-3/6 h-11 py-3 flex justify-center items-center bg-[#E60054] rounded-xl font-medium text-white hover:bg-[#C20038]"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-80 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}
