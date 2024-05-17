import React, { useEffect } from 'react';
import Image from 'next/image';
import close from '../../public/images/close.svg';
import chevronDown from '../../public/images/chevron-down.svg';
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
        className="text-base  w-[140px] h-11 px-4 py-3 flex justify-center items-center bg-[#E60054] rounded-xl font-medium text-white hover:bg-[#C20038]"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Submit event
      </button>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-[652px]">
              {/*content*/}
              <div className="border-0 rounded-3xl shadow-lg relative flex flex-col w-full bg-[#F5F3EF] outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-between p-5 border-b border-solid border-[#1E1E1E0D] rounded-t">
                  <h3 className="text-base font-semibold">Submit event</h3>
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
                    Event details
                  </h4>
                  <form className="flex gap-5 w-full flex-col relative">
                    <div className="w-full rounded-xl p-5 flex gap-5 bg-[#EDEBE3] flex-col border border-[#E6E3D6]">
                      <h4 className="text-base text-[#24181B] m-0">
                        Upload image thumbnail
                      </h4>
                      <div className="border border-dashed border-[#D1CFC7] rounded-lg h-[200px] w-full overflow-hidden relative">
                        {/* <button type='button' className="w-5 h-5 rounded-full bg-[#24181B] flex items-center justify-center absolute right-2.5 top-2.5 hover:bg-[#454545]">
                          <Image
                            className="object-cover h-2"
                            src={close}
                            alt="dog"
                          />
                        </button> */}
                        {/* <Image
                          className="h-full w-full object-cover"
                          src={dog}
                          alt="dog"
                        /> */}
                        <label className="flex items-center justify-center text-center h-full">
                          <input className="hidden" type="file" />
                          <div>
                            <span className="text-[#0C0D0D]">
                              <span className="text-[#E60054]">
                                Browse files
                              </span>{' '}
                              or drag & drop
                            </span>
                            <p className="text-[#24181B80] text-xs">
                              1068px (w) x 646px (h) <br></br>
                              .jpeg or .png, with maximum file size of 5MB.
                            </p>
                          </div>
                        </label>
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
                        Event name
                      </label>
                    </div>

                    <div className="flex gap-5">
                      <div className="relative w-full">
                        <input
                          type="type"
                          id="floating_filled"
                          className="block rounded-xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                          placeholder=" "
                        />
                        <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                          Date
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
                          Time
                        </label>
                      </div>
                    </div>

                    <div className="relative w-full mt-1">
                      <label className="text-xs text-[#24181B80] absolute top-[10px] left-5">
                        Select frequency
                      </label>
                      <select className="block rounded-xl px-5 pb-2 pt-6 w-full text-base text-[#24181B] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer">
                        <option value="" selected disabled hidden>
                          Select
                        </option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </select>
                      <Image
                        src={chevronDown}
                        alt="arrow"
                        className="absolute top-[18px] right-4 pointer-events-none"
                      />
                    </div>

                    <div className="relative w-full">
                      <input
                        type="type"
                        id="floating_filled"
                        className="block rounded-xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                        placeholder=" "
                      />
                      <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                        Location
                      </label>
                    </div>

                    <div className="relative w-full mt-1">
                      <label className="text-xs text-[#24181B80] absolute top-[10px] left-5">
                        Organization name
                      </label>
                      <select className="block rounded-xl px-5 pb-2 pt-6 w-full text-base text-[#24181B] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer">
                        <option value="" selected disabled hidden>
                          Select
                        </option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </select>
                      <Image
                        src={chevronDown}
                        alt="arrow"
                        className="absolute top-[18px] right-4 pointer-events-none"
                      />
                    </div>

                    <div className="relative w-full mt-1">
                      <label className="text-xs text-[#24181B80] absolute top-[10px] left-5">
                        Event type
                      </label>
                      <select className="block rounded-xl px-5 pb-2 pt-6 w-full text-base text-[#24181B] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer">
                        <option value="" selected disabled hidden>
                          Event type
                        </option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </select>
                      <Image
                        src={chevronDown}
                        alt="arrow"
                        className="absolute top-[18px] right-4 pointer-events-none"
                      />
                    </div>

                    <div className="relative w-full">
                      <textarea
                        id="floating_filled"
                        className="block rounded-xl px-5 pb-2.5 h-[120px] pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                        placeholder=" "
                      />
                      <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                        Description
                      </label>
                    </div>

                    <div className="relative w-full">
                      <textarea
                        id="floating_filled"
                        className="block rounded-xl px-5 pb-2.5 h-[120px] pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                        placeholder=" "
                      />
                      <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                        Activities (optional)
                      </label>
                    </div>
                    <div className="relative w-full">
                      <textarea
                        id="floating_filled"
                        className="block rounded-xl px-5 pb-2.5 h-[120px] pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                        placeholder=" "
                      />
                      <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                        Volunteer requirements (optional)
                      </label>
                    </div>

                    <div className="w-full flex flex-col gap-5 mt-10">
                      <h4 className="text-[#24181B] text-2xl font-medium">
                        Volunteer registration type
                      </h4>

                      <div className="w-full border border-[#E6E3D6] rounded-xl overflow-hidden">
                        <label className="relative w-full border-b border-[#1E1E1E0D] inline-flex  p-4 d-flex items-center gap-5 cursor-pointer">
                          <div>
                            <span className="text-[#24181B]">
                              Registration through Giverr platform
                            </span>
                            <p className="text-[#24181B80]">
                              For events that are space limited
                            </p>
                          </div>
                          <input
                            className="hidden peer"
                            name="type"
                            type="radio"
                          />
                          <div className="ml-auto border border[#E6E3D6] w-6 h-6 bg-white rounded-full relative flex items-center justify-center peer-checked:bg-[#E60054] peer-checked:border-[#E60054]">
                            <span className="w-2 h-2 absolute bg-white rounded-md peer-checked:bg-[#fff]"></span>
                          </div>
                        </label>

                        <label className="relative w-full border-b border-[#1E1E1E0D] inline-flex p-4 d-flex items-center gap-5 cursor-pointer">
                          <div>
                            <span className="text-[#24181B]">Just show up</span>
                            <p className="text-[#24181B80]">
                              There’s no limited space
                            </p>
                          </div>
                          <input
                            className="hidden peer"
                            name="type"
                            type="radio"
                          />
                          <div className="ml-auto border border[#E6E3D6] w-6 h-6 bg-white rounded-full relative flex items-center justify-center peer-checked:bg-[#E60054] peer-checked:border-[#E60054]">
                            <span className="w-2 h-2 absolute bg-white rounded-md peer-checked:bg-[#fff]"></span>
                          </div>
                        </label>

                        <label className="relative w-full  inline-flex p-4 d-flex items-center gap-5 cursor-pointer">
                          <div>
                            <span className="text-[#24181B]">Website link</span>
                            <p className="text-[#24181B80]">
                              The registration for the event will be handled by
                              the organization
                            </p>
                          </div>
                          <input
                            className="hidden peer"
                            name="type"
                            type="radio"
                          />
                          <div className="ml-auto border border[#E6E3D6] w-6 h-6 bg-white rounded-full relative flex items-center justify-center peer-checked:bg-[#E60054] peer-checked:border-[#E60054]">
                            <span className="w-2 h-2 absolute bg-white rounded-md peer-checked:bg-[#fff]"></span>
                          </div>
                        </label>

                        <div className="px-5 mb-5">
                          <div className="relative w-full ">
                            <input
                              type="type"
                              id="floating_filled"
                              className="block rounded-2xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3]  border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                              placeholder=" "
                            />
                            <label className="absolute text-base text-[#1E1E1E80]  duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                              Website link
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
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
