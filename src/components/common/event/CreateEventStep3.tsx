'use client';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import OneTimeCommitment from './OneTimeCommitment';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import DatesCommitment from './DatesCommitment';
import OnGoingCommitment from './OnGoingCommitment';
const CreateEventStep3 = () => {
  const searchParams = useSearchParams();
  const commitment = searchParams.get('commitment');
  return (
    <div>
      <div className="flex  w-full py-5 flex-col relative px-5 max-h-modal overflow-auto">
        <h4 className="text-[#24181B] text-2xl font-medium mb-5">Commitment</h4>

        <div className="w-full flex flex-col">
          <ul
            className="flex gap-[5px] mb-0 list-none  w-full relative"
            role="tablist"
          >
            <li className="">
              <Link
                className={
                  'px-3 py-2.5 inline-flex items-center rounded-xl text-[#24181B80]  ' +
                  (commitment === 'ONETIME' ? 'text-white bg-[#24181B]' : '')
                }
                href="?submit-event=true&step=3&commitment=ONETIME"
                role="tablist"
              >
                One-time
              </Link>
            </li>
            <li className="">
              <Link
                className={
                  'px-3 py-2.5 inline-flex items-center rounded-xl text-[#24181B80]  ' +
                  (commitment === 'DATES' ? 'text-white bg-[#24181B]' : '')
                }
                data-toggle="tab"
                href="?submit-event=true&step=3&commitment=DATES"
                role="tablist"
              >
                Dates
              </Link>
            </li>

            <li className="">
              <Link
                className={
                  'px-3 py-2.5 inline-flex items-center rounded-xl text-[#24181B80]  ' +
                  (commitment === 'ONGOING' ? 'text-white bg-[#24181B]' : '')
                }
                href="?submit-event=true&step=3&commitment=ONGOING"
                role="tablist"
              >
                Ongoing
              </Link>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words w-full">
            <div className=" py-5 flex-auto">
              <div className="tab-content tab-space">
                <div
                  className={commitment === 'ONETIME' ? 'block' : 'hidden'}
                  id="link1"
                >
                  <OneTimeCommitment />
                </div>
                <div
                  className={commitment === 'DATES' ? 'block' : 'hidden'}
                  id="link2"
                >
                  <DatesCommitment />
                </div>

                <div
                  className={commitment === 'ONGOING' ? 'block' : 'hidden'}
                  id="link3"
                >
                  <OnGoingCommitment />
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
