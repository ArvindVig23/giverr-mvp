'use client';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import OneTimeCommitment from './OneTimeCommitment';
import { useRouter, useSearchParams } from 'next/navigation';
import DatesCommitment from './DatesCommitment';
import OnGoingCommitment from './OnGoingCommitment';
const CreateEventStep3 = ({
  stepValidationShouldCheck,
  setStepValidationShouldCheck,
}: any) => {
  const searchParams = useSearchParams();
  const commitment = searchParams.get('commitment');
  const router = useRouter();
  const changeCommitmentTabs = (tabname: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('commitment', tabname);
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${window.location.pathname}${query}`);
  };
  return (
    <div>
      <div className="flex  w-full py-5 flex-col relative px-5 max-h-modal-new overflow-auto">
        <h4 className="text-[#24181B] text-2xl font-medium mb-5">Commitment</h4>

        <div className="w-full flex flex-col flex-1">
          <ul
            className="flex gap-[5px] mb-0 list-none  w-full relative"
            role="tablist"
          >
            <li className="">
              <button
                onClick={() => changeCommitmentTabs('ONETIME')}
                className={
                  'px-3 py-2.5 inline-flex items-center rounded-xl text-[#24181B80]  ' +
                  (commitment === 'ONETIME' ? 'text-white bg-[#24181B]' : '')
                }
                role="tablist"
              >
                One-time
              </button>
            </li>
            <li className="">
              <button
                onClick={() => changeCommitmentTabs('DATES')}
                className={
                  'px-3 py-2.5 inline-flex items-center rounded-xl text-[#24181B80]  ' +
                  (commitment === 'DATES' ? 'text-white bg-[#24181B]' : '')
                }
                data-toggle="tab"
                role="tablist"
              >
                Dates
              </button>
            </li>

            <li className="">
              <button
                onClick={() => changeCommitmentTabs('ONGOING')}
                className={
                  'px-3 py-2.5 inline-flex items-center rounded-xl text-[#24181B80]  ' +
                  (commitment === 'ONGOING' ? 'text-white bg-[#24181B]' : '')
                }
                role="tablist"
              >
                Ongoing
              </button>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words w-full flex-1">
            <div className=" py-5 flex-auto pb-0">
              <div className="tab-content tab-space h-full">
                <div
                  className={
                    commitment === 'ONETIME' ? 'block h-full' : 'hidden'
                  }
                  id="link1"
                >
                  <OneTimeCommitment
                    stepValidationShouldCheck={stepValidationShouldCheck}
                    setStepValidationShouldCheck={setStepValidationShouldCheck}
                  />
                </div>
                <div
                  className={commitment === 'DATES' ? 'block h-full' : 'hidden'}
                  id="link2"
                >
                  <DatesCommitment
                    stepValidationShouldCheck={stepValidationShouldCheck}
                    setStepValidationShouldCheck={setStepValidationShouldCheck}
                  />
                </div>

                <div
                  className={
                    commitment === 'ONGOING' ? 'block h-full' : 'hidden'
                  }
                  id="link3"
                >
                  <OnGoingCommitment
                    stepValidationShouldCheck={stepValidationShouldCheck}
                    setStepValidationShouldCheck={setStepValidationShouldCheck}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateEventStep3;
