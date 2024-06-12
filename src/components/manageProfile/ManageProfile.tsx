import React from 'react';
import Accounts from './Accounts';
import Myorganization from './Myorganization';
import Notifications from './Notifications';
import Organizations from './Organizations';
import Settings from './Settings';

const ManageProfile: React.FC = () => {
  const [openTab, setOpenTab] = React.useState(1);

  return (
    <div className="border-t border-[#E6E3D6]">
      <div className="w-full max-w-[944px] m-auto">
        <div className="flex flex-wrap">
          <div className="w-full flex">
            <ul
              className="flex flex-col mb-0 list-none max-w-[252px] w-full py-5 border-r border-[#E6E3D6] min-h-[800px] relative before:absolute before:h-6 before:w-1 before:border-r before:border-[#E6E3D6] before:content:[''] before:-bottom-[24px] before:-right-[1px] z-[1]"
              role="tablist"
            >
              <li className="">
                <a
                  className={
                    'p-[5px] w-full text-base inline-flex text-[#24181B80] hover:text-[#24181B] ' +
                    (openTab === 1 ? 'text-[#24181B]' : '')
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(1);
                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                >
                  Accounts
                </a>
              </li>
              <li className="">
                <a
                  className={
                    'p-[5px] w-full text-base inline-flex text-[#24181B80] hover:text-[#24181B] ' +
                    (openTab === 2 ? 'text-[#24181B]' : '')
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  My Organization
                </a>
              </li>
              <li className="">
                <a
                  className={
                    'p-[5px] w-full text-base inline-flex text-[#24181B80] hover:text-[#24181B] ' +
                    (openTab === 3 ? 'text-[#24181B]' : '')
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(3);
                  }}
                  data-toggle="tab"
                  href="#link3"
                  role="tablist"
                >
                  Organizations
                </a>
              </li>

              <li className="">
                <a
                  className={
                    'p-[5px] w-full text-base inline-flex text-[#24181B80] hover:text-[#24181B] ' +
                    (openTab === 4 ? 'text-[#24181B]' : '')
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(4);
                  }}
                  data-toggle="tab"
                  href="#link3"
                  role="tablist"
                >
                  Notifications
                </a>
              </li>

              <li className="">
                <a
                  className={
                    'p-[5px] w-full text-base inline-flex text-[#24181B80] hover:text-[#24181B] ' +
                    (openTab === 5 ? 'text-[#24181B]' : '')
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(5);
                  }}
                  data-toggle="tab"
                  href="#link3"
                  role="tablist"
                >
                  Settings
                </a>
              </li>
            </ul>
            <div className="relative flex flex-col min-w-0 break-words w-full">
              <div className="px-5 py-5 flex-auto">
                <div className="tab-content tab-space">
                  <div
                    className={openTab === 1 ? 'block' : 'hidden'}
                    id="link1"
                  >
                    <Accounts />
                  </div>
                  <div
                    className={openTab === 2 ? 'block' : 'hidden'}
                    id="link2"
                  >
                    <Myorganization />
                  </div>
                  <div
                    className={openTab === 3 ? 'block' : 'hidden'}
                    id="link3"
                  >
                    <Organizations />
                  </div>

                  <div
                    className={openTab === 4 ? 'block' : 'hidden'}
                    id="link5"
                  >
                    <Notifications />
                  </div>

                  <div
                    className={openTab === 5 ? 'block' : 'hidden'}
                    id="link5"
                  >
                    <Settings />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProfile;
