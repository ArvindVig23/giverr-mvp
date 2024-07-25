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
import notifications from '/public/images/notifications.svg';
import myOrganization from '/public/images/my-organization.svg';
import organizations from '/public/images/organizations.svg';
import setting from '/public/images/settings.svg';
import chevronRight from '/public/images/chevron-right-black.svg';
import { compose } from '@reduxjs/toolkit';
import { hocUserGuard } from '../hoc/HOCUserGuard';
import { hocOrganizationGuard } from '../hoc/HOCOrganizationGuard';
import CommonModal from '../common/modal/CommonModal';
import OrganizationForm from '../common/organization/OrganizationForm';
import ModalInvite from '../common/organization/ModalInvite';

const ManageProfile: React.FC = () => {
  //  Moved these modals here to adjust the design on mobile
  const [showModal, setShowModal] = React.useState(false);
  const [inviteMembersModal, setInviteMembersModal] = useState<boolean>(false);
  // const userOrgDetails = useSelector((state: any) => state.userOrgReducer);
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
    document.body.classList.add('mobile-overflow');
    setTabSlideClass(true);
  };

  const toogleBodyOverFlow = () => {
    document.body.classList.remove('mobile-overflow');
    setTabSlideClass(false);
  };

  // state to keep the index of the selected organization
  const [selectedOrganization, setSelectedOrganization] = useState<
    number | null
  >(null);

  const editClick = (index: number) => {
    setSelectedOrganization(index);
    setShowModal(true);
  };
  return (
    <div className="md:border-t border-[#E6E3D6]">
      <div className="w-full max-w-[944px] m-auto">
        <div className="flex flex-wrap">
          <div className="w-full flex flex-wrap md:flex-nowrap ">
            <ul
              className={`flex flex-col md:px-0 mb-0 list-none max-w-full md:max-w-[252px] w-full py-4 pb-10 md:py-5 md:border-r border-[#E6E3D6] md:min-h-[800px] relative before:absolute before:h-6 before:w-1 before:border-r before:border-[#E6E3D6] before:content:[''] before:-bottom-[24px] before:-right-[1px] z-[1]   ${tabSlideClass ? 'tab-open' : ''}`}
              role="tablist"
            >
              <li className="mb-8 block md:hidden px-4 md:px-0">
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
              <li className="px-4 my-3 md:hidden block">
                <hr className="border-[#E6E3D6]"></hr>
              </li>
              {!cookies.userDetails.loginAsOrg ? (
                <li className="">
                  <Link
                    onClick={toogleShowSliderClass}
                    className={
                      'px-4 py-2.5 md:p-[5px] w-full gap-2 text-base inline-flex justify-between text-[#24181B] md:text-[#24181B80] hover:text-[#24181B] ' +
                      (eventsTab === 'my-organizations'
                        ? '!text-[#24181B]'
                        : '')
                    }
                    data-toggle="tab"
                    href="/profile?tab=my-organizations"
                    role="tablist"
                  >
                    <div className="flex gap-2">
                      <Image
                        className="md:hidden block"
                        src={myOrganization}
                        alt="my-organization"
                      />{' '}
                      My Organization
                    </div>
                    <Image
                      className="md:hidden block"
                      src={chevronRight}
                      alt="right-icon"
                    />
                  </Link>
                </li>
              ) : null}

              {!cookies.userDetails.loginAsOrg ? (
                <li className="">
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
                    <div className="flex gap-2">
                      <Image
                        className="md:hidden block"
                        src={organizations}
                        alt="organizations"
                      />{' '}
                      Organizations
                    </div>
                    <Image
                      className="md:hidden block"
                      src={chevronRight}
                      alt="right-icon"
                    />
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
              <li className="px-4 my-3 md:hidden block">
                <hr className="border-[#E6E3D6]"></hr>
              </li>
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
              <div className="md:p-5 md:p-4 flex-auto">
                <div className="tab-content tab-space">
                  <div
                    id="link1"
                    className={`${eventsTab === 'accounts' ? 'accounts accounts-active' : 'accounts'} `}
                  >
                    <button
                      className="absolute md:hidden block p-3 top-[14px]  left-2.5"
                      onClick={toogleBodyOverFlow}
                    >
                      {' '}
                      <Image
                        className="rotate-180"
                        src={chevronRight}
                        alt=""
                      />{' '}
                    </button>
                    {eventsTab === 'accounts' ? <Accounts /> : null}
                  </div>
                  <div id="link2">
                    {eventsTab === 'my-organizations' ? (
                      <Myorganization
                        showModal={showModal}
                        setShowModal={setShowModal}
                        inviteMembersModal={inviteMembersModal}
                        setInviteMembersModal={setInviteMembersModal}
                        editClick={editClick}
                      />
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
                    {eventsTab === 'members' ? (
                      <ManageOrgMemebers
                        inviteMembersModal={inviteMembersModal}
                        setInviteMembersModal={setInviteMembersModal}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <CommonModal
          heading={
            selectedOrganization ? 'Update organization' : 'Create organization'
          }
          showModal={showModal}
          setShowModal={setShowModal}
          setSelectedOrganization={setSelectedOrganization}
        >
          <OrganizationForm
            setShowModal={setShowModal}
            index={selectedOrganization}
          />
        </CommonModal>
      )}

      {inviteMembersModal ? (
        <CommonModal
          heading={'Invite Members'}
          subHeading={'Send Invite to'}
          showModal={inviteMembersModal}
          setShowModal={setInviteMembersModal}
        >
          <ModalInvite setShowModal={setInviteMembersModal} />
        </CommonModal>
      ) : null}
    </div>
  );
};

export default compose(hocUserGuard, hocOrganizationGuard)(ManageProfile);
