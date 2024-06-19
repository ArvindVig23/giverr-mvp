import React, { useEffect } from 'react';
import Accounts from './Accounts';
import Myorganization from './Myorganization';
import Notifications from './Notifications';
import Organizations from './Organizations';
import Settings from './Settings';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import ManageOrgMemebers from './ManageOrgMemebers';

const ManageProfile: React.FC = () => {
  const searchParams = useSearchParams();
  const eventsTab = searchParams.get('tab');
  const router = useRouter();
  const [cookies] = useCookies();
  useEffect(() => {
    const restrictedRoutesForOrg = ['my-organizations', 'organizations'];
    const restrictedRoutesForUser = ['members'];
    if (!eventsTab) {
      router.push('/profile?tab=accounts');
      return;
    }
    if (
      cookies.userDetails.loginAsOrg &&
      restrictedRoutesForOrg.includes(eventsTab)
    ) {
      router.push('?tab=accounts');
      return;
    }
    if (
      !cookies.userDetails.loginAsOrg &&
      restrictedRoutesForUser.includes(eventsTab)
    ) {
      router.push('?tab=accounts');
      return;
    }
    // eslint-disable-next-line
  }, [searchParams, cookies?.userDetails?.loginAsOrg]);
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
                <Link
                  className={
                    'p-[5px] w-full text-base inline-flex text-[#24181B80] hover:text-[#24181B] ' +
                    (eventsTab === 'accounts' ? 'text-[#24181B]' : '')
                  }
                  data-toggle="tab"
                  href="/profile?tab=accounts"
                  role="tablist"
                >
                  Accounts
                </Link>
              </li>
              {!cookies.userDetails.loginAsOrg ? (
                <li className="">
                  <Link
                    className={
                      'p-[5px] w-full text-base inline-flex text-[#24181B80] hover:text-[#24181B] ' +
                      (eventsTab === 'my-organizations' ? 'text-[#24181B]' : '')
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
                <li className="">
                  <Link
                    className={
                      'p-[5px] w-full text-base inline-flex text-[#24181B80] hover:text-[#24181B] ' +
                      (eventsTab === 'organizations' ? 'text-[#24181B]' : '')
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
                    className={
                      'p-[5px] w-full text-base inline-flex text-[#24181B80] hover:text-[#24181B] ' +
                      (eventsTab === 'members' ? 'text-[#24181B]' : '')
                    }
                    data-toggle="tab"
                    href="/profile?tab=members"
                    role="tablist"
                  >
                    Members
                  </Link>
                </li>
              ) : null}

              <li className="">
                <Link
                  className={
                    'p-[5px] w-full text-base inline-flex text-[#24181B80] hover:text-[#24181B] ' +
                    (eventsTab === 'notification' ? 'text-[#24181B]' : '')
                  }
                  data-toggle="tab"
                  href="/profile?tab=notification"
                  role="tablist"
                >
                  Notifications
                </Link>
              </li>

              <li className="">
                <Link
                  className={
                    'p-[5px] w-full text-base inline-flex text-[#24181B80] hover:text-[#24181B] ' +
                    (eventsTab === 'timezone-settings' ? 'text-[#24181B]' : '')
                  }
                  data-toggle="tab"
                  href="/profile?tab=timezone-settings"
                  role="tablist"
                >
                  Settings
                </Link>
              </li>
            </ul>
            <div className="relative flex flex-col min-w-0 break-words w-full">
              <div className="px-5 py-5 flex-auto">
                <div className="tab-content tab-space">
                  <div id="link1">
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
