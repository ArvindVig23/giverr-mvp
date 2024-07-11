'use client';
import { Fragment, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import check from '/public/images/check-circle.svg';
import activity from '/public/images/activity.svg';
import setting from '/public/images/settings.svg';
import heart from '/public/images/heart1.svg';
import Image from 'next/image';
import { getInitialOfEmail, logOut } from '@/services/frontend/userService';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { FIRESTORE_IMG_BASE_START_URL } from '@/constants/constants';
import { encodeUrl } from '@/services/frontend/commonServices';
import { setLoader } from '@/app/redux/slices/loaderSlice';
import {
  getOrgDetail,
  switchToOrganisation,
} from '@/services/frontend/organization';
import { defaultUserOrgDetail } from '@/utils/initialStates/userInitialStates';
import { updateOrgDetails } from '@/app/redux/slices/userOrgDetails';
import { sweetAlertToast } from '@/services/frontend/toastServices';
import { Tooltip } from '@material-tailwind/react';
import { OrgDetails } from '@/interface/organization';

export default function ProfileDropdown() {
  const [highlightActivity, setHighlightActivity] = useState<boolean>(false);
  const [highlightWishlist, setHighlightWishlist] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const [cookies] = useCookies();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const userOrgDetails = useSelector((state: any) => state.userOrgReducer);
  useEffect(() => {
    if (!userOrgDetails.id) {
      (async () => {
        try {
          dispatch(setLoader(true));
          const getDetails = await getOrgDetail();
          if (getDetails) {
            if (getDetails.status === 'REJECTED') {
              const user = {
                ...defaultUserOrgDetail,
                status: getDetails.status,
              };
              dispatch(updateOrgDetails(user));
              return;
            }
            dispatch(updateOrgDetails(getDetails));
          }
        } catch (error: any) {
          dispatch(setLoader(false));
          console.log(error, 'error in getting the org');
        } finally {
          dispatch(setLoader(false));
        }
      })();
    } // eslint-disable-next-line
  }, [cookies]);
  const showOrganization = userOrgDetails.length;
  useEffect(() => {
    if (pathname === '/activity') {
      const eventsTab = searchParams.get('events');
      const wishlistTab = searchParams.get('wishlist');
      if (eventsTab) {
        setHighlightActivity(true);
        setHighlightWishlist(false);
        return;
      }
      if (wishlistTab) {
        setHighlightActivity(false);
        setHighlightWishlist(true);
        return;
      }
    } else {
      setHighlightActivity(false);
      setHighlightWishlist(false);
    }
  }, [pathname, searchParams]);

  const fullNameOrEmail = () => {
    if (cookies.userDetails.fullName) {
      return cookies.userDetails.fullName;
    } else {
      return cookies.userDetails.email;
    }
  };
  const displayName =
    fullNameOrEmail().length > 16
      ? fullNameOrEmail().slice(0, 16) + '...'
      : fullNameOrEmail();

  const handleLoginAsOrg = async (loginAsOrg: boolean, orgId: string) => {
    try {
      dispatch(setLoader(true));
      const response = await switchToOrganisation(loginAsOrg, orgId);
      const { message } = response;
      sweetAlertToast('success', message, 1000);
    } catch (error) {
      console.log(error, 'error in switching as Organization');
    } finally {
      dispatch(setLoader(false));
    }
  };
  const nameOrUserName = (org: OrgDetails) => {
    if (org.name) {
      return org.name;
    } else if (org.username) {
      return org.username;
    }
    return 'o';
  };

  const displayOrgName = (org: OrgDetails) => {
    return nameOrUserName(org).length > 16
      ? nameOrUserName(org).slice(0, 16) + '...'
      : nameOrUserName(org);
  };

  const [currentLoggedInOrg, setCurrentLoggedInOrg] = useState<any>();
  useEffect(() => {
    if (cookies.userDetails.loginAsOrg) {
      const loggedInOrg = userOrgDetails.find(
        (org: any) => org.id === cookies.userDetails.orgId,
      );
      setCurrentLoggedInOrg(loggedInOrg);
    } else {
      setCurrentLoggedInOrg(null);
    } // eslint-disable-next-line
  }, [cookies.userDetails.orgId, userOrgDetails.length]);
  return (
    <>
      {dropdownOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-20"></div>
      )}
      <Menu as="div" className="relative inline-block text-left">
        <div className="flex">
          <Menu.Button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="inline-flex justify-center gap-x-1.5 rounded-full bg-[#BAA388] min-w-10 w-10 h-10 items-center text-base font-medium overflow-hidden "
          >
            {cookies.userDetails.loginAsOrg && currentLoggedInOrg ? (
              currentLoggedInOrg?.avatarLink ? (
                <Image
                  width={40}
                  height={40}
                  src={`${FIRESTORE_IMG_BASE_START_URL}${encodeUrl(currentLoggedInOrg?.avatarLink)}`}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                getInitialOfEmail(nameOrUserName(currentLoggedInOrg))
              )
            ) : null}
            {!cookies.userDetails.loginAsOrg ? (
              cookies.userDetails.profileUrl ? (
                <Image
                  width={40}
                  height={40}
                  src={`${FIRESTORE_IMG_BASE_START_URL}${encodeUrl(cookies.userDetails.profileUrl)}`}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                getInitialOfEmail(fullNameOrEmail())
              )
            ) : null}
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="md:transition md:ease-out md:duration-100 transition-all ease-in-out duration-500 delay-[200ms]"
          enterFrom="md:transform md:opacity-0 md:scale-95 md:translate-y-2 opacity-0 translate-y-full"
          enterTo="md:transform md:opacity-100 md:scale-100 opacity-100 translate-y-0"
          leave="md:transition md:ease-in md:duration-75 transition-all ease-in-out duration-300"
          leaveFrom="md:transform md:opacity-100 md:scale-100 opacity-100 translate-y-0"
          leaveTo="md:transform md:opacity-0 md:scale-95 opacity-0  translate-y-full"
          afterLeave={() => setDropdownOpen(false)}
        >
          <Menu.Items className="!fixed !bottom-0 !z-30  profile-dropdown md:!absolute right-0 z-10 mt-2 !w-full md:!w-56 origin-top-right !rounded-none !rounded-t-2xl  md:!rounded-xl !border-0 md:!border !border-[#E6E3D6] !ring-0 bg-white !shadow-none">
            <div className="p-1.5 flex flex-col gap-0.5">
              <Menu.Item>
                <div
                  onClick={() =>
                    cookies.userDetails.loginAsOrg
                      ? handleLoginAsOrg(false, '')
                      : null
                  }
                  className="flex items-center gap-2 text-base px-3 py-[11px]	md:py-[7px] hover:bg-[#F5F3EF] rounded-lg cursor-pointer"
                >
                  <div className="w-5 min-w-5 h-5 rounded-full bg-[#BAA388] flex justify-center items-center text-xs overflow-hidden">
                    {cookies.userDetails.profileUrl ? (
                      <Image
                        width={40}
                        height={40}
                        src={`${FIRESTORE_IMG_BASE_START_URL}${encodeUrl(cookies.userDetails.profileUrl)}`}
                        alt="profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      getInitialOfEmail(fullNameOrEmail())
                    )}
                  </div>{' '}
                  {fullNameOrEmail().length > 16 ? (
                    <Tooltip
                      className="absolute left-0 w-64 min-w-[250px] p-2 text-sm text-white bg-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      content={fullNameOrEmail()}
                    >
                      {displayName}
                    </Tooltip>
                  ) : (
                    displayName
                  )}
                  {!cookies.userDetails.loginAsOrg && (
                    <div className="ml-auto">
                      <Image src={check} alt="check" />
                    </div>
                  )}
                </div>
              </Menu.Item>

              {showOrganization
                ? userOrgDetails.map((org: any) =>
                    org.status === 'APPROVED' ? (
                      <Menu.Item key={org.id}>
                        <div
                          onClick={() =>
                            cookies.userDetails.orgId !== org.id
                              ? handleLoginAsOrg(true, org.id)
                              : null
                          }
                          className="flex items-center gap-2 text-base px-3 py-[11px] md:py-[7px] hover:bg-[#F5F3EF] rounded-lg mb-1 cursor-pointer"
                        >
                          <div className="w-5 h-5 rounded-full bg-[#88AEBA] flex justify-center items-center text-xs overflow-hidden">
                            {org.avatarLink ? (
                              <Image
                                width={40}
                                height={40}
                                src={`${FIRESTORE_IMG_BASE_START_URL}${encodeUrl(org.avatarLink)}`}
                                alt="avatar"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              getInitialOfEmail(org.name || 'O')
                            )}
                          </div>{' '}
                          {nameOrUserName(org).length > 16 ? (
                            <Tooltip
                              className="absolute left-0 w-64 min-w-[250px] p-2 text-sm text-white bg-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              content={nameOrUserName(org)}
                            >
                              {displayOrgName(org)}
                            </Tooltip>
                          ) : (
                            displayOrgName(org)
                          )}
                          {cookies.userDetails.loginAsOrg &&
                          cookies.userDetails.orgId === org.id ? (
                            <div className="ml-auto">
                              <Image src={check} alt="check" />
                            </div>
                          ) : null}
                        </div>
                      </Menu.Item>
                    ) : null,
                  )
                : null}
              <hr className="border-[#E6E3D6] realtive -left-[1.5px] -right-[1.5px]"></hr>
              <Menu.Item>
                <Link
                  href="/activity?events=true"
                  className={`flex items-center gap-2 text-base px-3	py-[11px]	md:py-[7px] hover:bg-[#F5F3EF] rounded-lg ${highlightActivity ? 'bg-[#F5F3EF]' : ''}`}
                >
                  <Image className="md:hidden" src={activity} alt="" />
                  Events & Activity
                </Link>
              </Menu.Item>

              <Menu.Item>
                <Link
                  href="/activity?wishlist=true"
                  className={`flex items-center gap-2 text-base px-3	py-[11px]	md:py-[7px] hover:bg-[#F5F3EF] rounded-lg ${highlightWishlist ? 'bg-[#F5F3EF]' : ''}`}
                >
                  <Image className="md:hidden" src={heart} alt="" />
                  Wishlist
                </Link>
              </Menu.Item>
              <hr className="border-[#E6E3D6]  relative -left-[1.5px] -right-[1.5px]"></hr>

              <Menu.Item>
                <Link
                  href="/profile"
                  className={`flex items-center gap-2 text-base px-3	py-[11px]	md:py-[7px] hover:bg-[#F5F3EF] rounded-lg ${pathname === '/profile' ? 'bg-[#F5F3EF]' : ''}`}
                >
                  <Image className="md:hidden" src={setting} alt="" />
                  Account settings
                </Link>
              </Menu.Item>

              <Menu.Item>
                <button
                  className="mx-2.5 my-2 md:m-0 font-normal  flex items-center gap-2 text-base md:text-[#24181B] text-[#E60054] px-3 py-2.5	md:py-[7px] hover:bg-[#F5F3EF] rounded-lg border border-[#E6005433] md:border-0 md:justify-start justify-center"
                  onClick={() => logOut(router, dispatch)}
                >
                  Log out
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}
