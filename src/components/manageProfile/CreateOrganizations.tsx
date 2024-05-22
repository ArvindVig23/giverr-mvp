import React, { useEffect } from 'react';
import Image from 'next/image';
import close from '/public/images/close.svg';
import lightSearch from '/public/images/search-light.svg';
// import dog from '/public/images/dog-walking.jpg';
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
        className="cursro-pointer text-base h-11 px-4 py-3 inline-flex justify-center items-center border border-[#E60054] bg-inherit rounded-xl font-medium text-[#E60054] hover:text-white hover:bg-[#E60054]"
        type="button"
        onClick={() => setShowModal(true)}
      >
        New
      </button>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-[652px]">
              {/*content*/}
              <div className="border-0 rounded-3xl shadow-lg relative flex flex-col w-full bg-[#F5F3EF] outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-between p-5 border-b border-solid border-[#1E1E1E0D] rounded-t">
                  <h3 className="text-base font-semibold">
                    Create organization
                  </h3>
                  <button
                    className="w-[30px] h-[30px] ml-auto bg-[#24181B] hover:bg-[#454545] border-0 text-white rounded-[10px] flex items-center justify-center float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <Image src={close} alt="close" />
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-5 flex-auto flex flex-col gap-5 max-h-modal overflow-auto">
                  {/* <SuccesModal /> */}
                  <h4 className="text-[#24181B] text-2xl font-medium">
                    Details
                  </h4>
                  <form className="flex gap-5 w-full flex-col relative">
                    <div className="inline-flex w-full rounded-xl bg-[#EDEBE3] p-5 border border-[#E6E3D6] gap-5 ">
                      <div className="w-20 h-20 rounded-full bg-[#BAA388] flex items-center justify-center text-3xl text-[#24181B] overflow-hidden">
                        A
                        {/* <Image
            src={bannerBg}
            alt="profile"
            className="w-full h-full object-cover"
          /> */}
                      </div>
                      <div className="flex-1 inline-flex gap-2.5 flex-wrap">
                        <label className="cursro-pointer text-base h-11 px-4 py-3 inline-flex justify-center items-center border border-[#E60054] bg-inherit rounded-xl font-medium text-[#E60054] hover:text-white hover:bg-[#E60054]">
                          Upload image{' '}
                          <input className="hidden" type="file"></input>
                        </label>
                        <p className="text-[#24181B80] text-xs w-full">
                          We support PNGs and JPGs under 10MB
                        </p>
                      </div>
                    </div>
                    <div className="relative w-full">
                      <input
                        type="type"
                        id="floating_filled"
                        className="block rounded-xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                        placeholder=" "
                      />
                      <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                        Organization name
                      </label>
                    </div>

                    <div className="relative w-full">
                      <input
                        type="type"
                        id="floating_filled"
                        className="block rounded-xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                        placeholder=" "
                      />
                      <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                        Username
                      </label>
                    </div>

                    <div className="relative w-full">
                      <input
                        type="type"
                        id="floating_filled"
                        className="block rounded-xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                        placeholder=" "
                      />
                      <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                        Website
                      </label>
                    </div>
                  </form>
                  <div className="flex w-full flex-col gap-5 mt-5">
                    <h4 className="w-full text-[#24181B] text-2xl font-medium">
                      Members
                    </h4>
                    <div className="flex gap-5">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          className="w-full h-11 bg-[#EDEBE3] border border-[#E6E3D6] rounded-xl focus:outline-none px-10"
                          placeholder="Search Members"
                        ></input>
                        <Image
                          className="absolute top-3 left-3 pointer-events-none"
                          src={lightSearch}
                          alt="search"
                        />
                      </div>
                    </div>

                    <div className="w-full">
                      <div className="flex py-3 items-center gap-3 border-b border-[#E6E3D6]">
                        <div className="flex gap-2.5 items-center">
                          <div className="w-8 h-8 flex items-center justify-center font-medium overflow-hidden rounded-full text-xs bg-[#BAA388] text-[#24181B]">
                            A
                          </div>

                          <div className="text-base">Anna Danielle Smith</div>
                          <span className="text-[#24181B80]">@anna.smith</span>
                        </div>

                        <div className="ml-auto flex gap-2 items-center">
                          <span className="inline-flex  text-[#24181B80] border border-[#E6E3D6] py-1 px-2 text-sm gap-2.5 rounded-full">
                            Owner
                          </span>
                        </div>
                      </div>

                      <div className="flex py-3 items-center gap-3 border-b border-[#E6E3D6]">
                        <div className="flex gap-2.5 items-center">
                          <div className="w-8 h-8 flex items-center justify-center font-medium overflow-hidden text-xs rounded-full bg-[#D3D496] text-[#24181B]">
                            T
                          </div>

                          <div className="text-base">Terry Gouse Bator</div>
                          <span className="text-[#24181B80]">@terry.bator</span>
                        </div>

                        <div className="ml-auto flex gap-2 items-center">
                          <span className="inline-flex  text-[#24181B80] border border-[#E6E3D6] py-1 px-2 text-sm gap-2.5 rounded-full">
                            Owner
                          </span>
                        </div>
                      </div>

                      <div className="flex py-3 items-center gap-3 border-b border-[#E6E3D6]">
                        <div className="flex gap-2.5 items-center">
                          <div className="w-8 h-8 flex items-center justify-center font-medium overflow-hidden text-xs rounded-full bg-[#D3D496] text-[#24181B]">
                            T
                          </div>

                          <div className="text-base">Terry Gouse Bator</div>
                          <span className="text-[#24181B80]">@terry.bator</span>
                        </div>

                        <div className="ml-auto flex gap-2 items-center">
                          <span className="inline-flex  text-[#24181B80] border border-[#E6E3D6] py-1 px-2 text-sm gap-2.5 rounded-full">
                            Owner
                          </span>
                        </div>
                      </div>

                      <div className="flex py-3 items-center gap-3 border-b border-[#E6E3D6]">
                        <div className="flex gap-2.5 items-center opacity-50">
                          <div className="w-8 h-8 flex items-center justify-center font-medium overflow-hidden text-xs rounded-full bg-[#D3D496] text-[#24181B]">
                            T
                          </div>

                          <div className="text-base">Terry Gouse Bator</div>
                          <span className="text-[#24181B80]">@terry.bator</span>
                        </div>

                        <div className="ml-auto flex gap-2 items-center">
                          <span className="inline-flex  text-[#02088B] border border-[#D5D7FD] bg-[#D5D7FD] py-1 px-2 text-sm gap-2.5 rounded-full">
                            Invite pending
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-[#1E1E1E0D] rounded-b">
                  <button
                    className="text-base  w-full h-[60px] py-3 flex justify-center items-center bg-[#E60054] rounded-xl font-medium text-white hover:bg-[#C20038]"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
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
