import React, { useEffect, useState } from 'react';
import Accounts from './Accounts';
import Myorganization from './Myorganization';
import Notifications from './Notifications';
import Organizations from './Organizations';
import Settings from './Settings';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import ManageOrgMemebers from './ManageOrgMemebers';
import Image from 'next/image';
import herobeige from '/public/images/herobeige.png';
import account from '/public/images/account.svg';
// import members from '/public/images/members.svg';
import notifications from '/public/images/notifications.svg';
import setting from '/public/images/settings.svg';
import chevronRight from '/public/images/chevron-right-black.svg';

const ManageProfile: React.FC = () => {
  const [tabSlideClass, setTabSlideClass] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const eventsTab = searchParams.get('tab');
  const router = useRouter();
  const [cookies] = useCookies();
  useEffect(() => {
    if (!eventsTab) {
      router.push('/profile?tab=accounts');
    }
    // eslint-disable-next-line
  }, []);

  const toogleShowSliderClass = () => {
    document.body.classList.add('overflow-hidden');
    setTabSlideClass(true);
  };

  const toogleBodyOverFlow = () => {
    document.body.classList.remove('overflow-hidden');
    setTabSlideClass(false);
  };
  return (
    <div className="md:border-t border-[#E6E3D6]">
      <div className="w-full max-w-[944px] m-auto">
        <div className="flex flex-wrap">
          <div className="w-full flex flex-wrap md:flex-nowrap ">
            <ul
              className="flex flex-col md:px-0 mb-0 list-none max-w-full md:max-w-[252px] w-full py-4 md:py-5 md:border-r border-[#E6E3D6] md:min-h-[800px] relative before:absolute before:h-6 before:w-1 before:border-r before:border-[#E6E3D6] before:content:[''] before:-bottom-[24px] before:-right-[1px] z-[1]"
              role="tablist"
            >
              <li className="mb-8 block md:hidden">
                <div className="rounded-2xl bg-[#EDEBE3] overflow-hidden">
                  <div className="rounded-2xl overflow-hidden">
                    <Image className="w-full" src={herobeige} alt="" />
                  </div>

                  <div className="flex gap-4 p-4">
                    <div className="w-11 h-11 min-w-11 bg-[#62C2E0] flex items-center justify-center rounded-full text-[#24181B] text-lg">
                      H
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-[#24181B] font-medium m-0 leading-[22px]">
                        Harmony
                      </h4>
                      <span className="text-[#24181B80] leading-[22px]">
                        @harmony
                      </span>
                    </div>
                  </div>
                </div>
              </li>
              <li className="">
                <Link
                  onClick={toogleShowSliderClass}
                  className={
                    'px-4 py-2.5 md:p-[5px] w-full gap-2 text-base inline-flex justify-between text-[#24181B] md:text-[#24181B80] hover:text-[#24181B] ' +
                    (eventsTab === 'accounts' ? '!text-[#24181B]' : '')
                  }
                  data-toggle="tab"
                  href="/profile?tab=accounts"
                  role="tablist"
                >
                  <div className="flex gap-2">
                    <Image
                      className="md:hidden block"
                      src={account}
                      alt="Accounts"
                    />{' '}
                    Accounts
                  </div>

                  <Image
                    className="md:hidden block"
                    src={chevronRight}
                    alt="right-icon"
                  />
                </Link>
              </li>
              {!cookies.userDetails.loginAsOrg ? (
                <li className="md:block hidden">
                  <Link
                    onClick={toogleShowSliderClass}
                    className={
                      'px-[11px] py-2.5 md:p-[5px] w-full  gap-2 text-base inline-flex justify-between text-[#24181B] md:text-[#24181B80] hover:text-[#24181B] ' +
                      (eventsTab === 'my-organizations'
                        ? '!text-[#24181B]'
                        : '')
                    }
                    data-toggle="tab"
                    href="/profile?tab=my-organizations"
                    role="tablist"
                  >
                    My Organization
                  </Link>
                </li>
              ) : null}
              {!cookies.userDetails.loginAsOrg ? (
                <li className="md:block hidden">
                  <Link
                    onClick={toogleShowSliderClass}
                    className={
                      'px-4 py-2.5 md:p-[5px] w-full gap-2 text-base inline-flex justify-between text-[#24181B] md:text-[#24181B80] hover:text-[#24181B] ' +
                      (eventsTab === 'organizations' ? '!text-[#24181B]' : '')
                    }
                    data-toggle="tab"
                    href="/profile?tab=organizations"
                    role="tablist"
                  >
                    Organizations
                  </Link>
                </li>
              ) : null}

              {cookies.userDetails.loginAsOrg ? (
                <li className="">
                  <Link
                    onClick={toogleShowSliderClass}
                    className={
                      'px-4 py-2.5 md:p-[5px] w-full gap-2 text-base inline-flex justify-between text-[#24181B] md:text-[#24181B80] hover:text-[#24181B] ' +
                      (eventsTab === 'members' ? '!text-[#24181B]' : '')
                    }
                    data-toggle="tab"
                    href="/profile?tab=members"
                    role="tablist"
                  >
                    <div className="flex gap-2">
                      <Image
                        className="md:hidden block"
                        src={account}
                        alt="Accounts"
                      />{' '}
                      Members
                    </div>
                    <Image
                      className="md:hidden block"
                      src={chevronRight}
                      alt="right-icon"
                    />
                  </Link>
                </li>
              ) : null}

              <li className="">
                <Link
                  onClick={toogleShowSliderClass}
                  className={
                    'px-4 py-2.5 md:p-[5px] w-full gap-2 text-base inline-flex justify-between text-[#24181B] md:text-[#24181B80] hover:text-[#24181B] ' +
                    (eventsTab === 'notification' ? '!text-[#24181B]' : '')
                  }
                  data-toggle="tab"
                  href="/profile?tab=notification"
                  role="tablist"
                >
                  <div className="flex gap-2">
                    <Image
                      className="md:hidden block"
                      src={notifications}
                      alt="notifications"
                    />{' '}
                    Notifications
                  </div>
                  <Image
                    className="md:hidden block"
                    src={chevronRight}
                    alt="right-icon"
                  />
                </Link>
              </li>

              <li className="">
                <Link
                  onClick={toogleShowSliderClass}
                  className={
                    'px-4 py-2.5 md:p-[5px] w-full gap-2 text-base inline-flex justify-between text-[#24181B] md:text-[#24181B80] hover:text-[#24181B] ' +
                    (eventsTab === 'timezone-settings' ? '!text-[#24181B]' : '')
                  }
                  data-toggle="tab"
                  href="/profile?tab=timezone-settings"
                  role="tablist"
                >
                  <div className="flex gap-2">
                    <Image
                      className="md:hidden block"
                      src={setting}
                      alt="setting"
                    />{' '}
                    Settings
                  </div>
                  <Image
                    className="md:hidden block"
                    src={chevronRight}
                    alt="right-icon"
                  />
                </Link>
              </li>
            </ul>
            <div
              className={`relative flex flex-col min-w-0 break-words w-full  ${tabSlideClass ? 'tab-close show-tab' : 'tab-close'}`}
            >
              <div className="px-5 py-5 flex-auto">
                <div className="tab-content tab-space">
                  <div
                    id="link1"
                    className={`${eventsTab === 'accounts' ? 'accounts accounts-active' : 'accounts'} `}
                  >
                    <button onClick={toogleBodyOverFlow}>Back</button>
                    {eventsTab === 'accounts' ? <Accounts /> : null}
                  </div>
                  <div id="link2">
                    {eventsTab === 'my-organizations' ? (
                      <Myorganization />
                    ) : null}
                  </div>
                  <div id="link3">
                    {eventsTab === 'organizations' ? <Organizations /> : null}
                  </div>

                  <div id="link5">
                    {eventsTab === 'notification' ? <Notifications /> : null}
                  </div>

                  <div id="link5">
                    {eventsTab === 'timezone-settings' ? <Settings /> : null}
                  </div>
                  <div id="link6">
                    {eventsTab === 'members' ? <ManageOrgMemebers /> : null}
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
