import React from 'react';
import Cards from '../common/cards/Cards';

const ActivityTabs: React.FC = () => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <div className="p-5 relative border-t border-[#E6E3D6]">
      <h1 className="text-[#24181B] font-medium text-[32px] mb-5">
        All Activity
      </h1>

      <div className="w-full flex flex-col">
        <ul
          className="flex gap-[5px] mb-0 list-none  w-full relative"
          role="tablist"
        >
          <li className="">
            <a
              className={
                'px-3 py-2.5 inline-flex items-center rounded-xl text-[#24181B80]  ' +
                (openTab === 1 ? 'text-white bg-[#24181B]' : '')
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(1);
              }}
              data-toggle="tab"
              href="#link1"
              role="tablist"
            >
              Events
            </a>
          </li>
          <li className="">
            <a
              className={
                'px-3 py-2.5 inline-flex items-center rounded-xl text-[#24181B80]  ' +
                (openTab === 2 ? 'text-white bg-[#24181B]' : '')
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(2);
              }}
              data-toggle="tab"
              href="#link2"
              role="tablist"
            >
              Wishlist
            </a>
          </li>
          <li className="">
            <a
              className={
                'px-3 py-2.5 inline-flex items-center rounded-xl text-[#24181B80]  ' +
                (openTab === 3 ? 'text-white bg-[#24181B]' : '')
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(3);
              }}
              data-toggle="tab"
              href="#link3"
              role="tablist"
            >
              Pending
            </a>
          </li>
        </ul>
        <div className="relative flex flex-col min-w-0 break-words w-full">
          <div className=" py-5 flex-auto">
            <div className="tab-content tab-space">
              <div className={openTab === 1 ? 'block' : 'hidden'} id="link1">
                <Cards />
              </div>
              <div className={openTab === 2 ? 'block' : 'hidden'} id="link2">
                Wishlist
              </div>
              <div className={openTab === 3 ? 'block' : 'hidden'} id="link3">
                Pending
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityTabs;
