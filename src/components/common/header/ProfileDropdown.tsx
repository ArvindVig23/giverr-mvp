'use client';
import { Fragment, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import check from '/public/images/check-circle.svg';
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

export default function ProfileDropdown() {
  const [highlightActivity, setHighlightActivity] = useState<boolean>(false);
  const [highlightWishlist, setHighlightWishlist] = useState<boolean>(false);
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
  const showOrganization =
    userOrgDetails.id && userOrgDetails.status === 'APPROVED';
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

  const handleLoginAsOrg = async (loginAsOrg: boolean) => {
    try {
      dispatch(setLoader(true));
      const response = await switchToOrganisation(loginAsOrg);
      const { message } = response;
      sweetAlertToast('success', message, 1000);
    } catch (error) {
      console.log(error, 'error in switching as Organization');
    } finally {
      dispatch(setLoader(false));
    }
  };
  const nameOrUserName = () => {
    if (userOrgDetails.name) {
      return userOrgDetails.name;
    } else if (userOrgDetails.username) {
      return userOrgDetails.username;
    }
    return 'o';
  };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center gap-x-1.5 rounded-full bg-[#BAA388] min-w-10 w-10 h-10 items-center text-base font-medium overflow-hidden ">
          {cookies.userDetails.loginAsOrg ? (
            userOrgDetails?.avatarLink ? (
              <Image
                width={40}
                height={40}
                src={`${FIRESTORE_IMG_BASE_START_URL}${encodeUrl(userOrgDetails?.avatarLink)}`}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              getInitialOfEmail(nameOrUserName())
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
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right !rounded-xl border !border-[#E6E3D6] !ring-0 bg-white !shadow-none">
          <div className="p-1.5 flex flex-col gap-0.5">
            <Menu.Item>
              <div
                onClick={() =>
                  cookies.userDetails.loginAsOrg
                    ? handleLoginAsOrg(false)
                    : null
                }
                className="flex items-center gap-2 text-base px-3	py-[7px] hover:bg-[#F5F3EF] rounded-lg cursor-pointer"
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
                {displayName}
                {!cookies.userDetails.loginAsOrg && (
                  <div className="ml-auto">
                    <Image src={check} alt="check" />
                  </div>
                )}
              </div>
            </Menu.Item>

            {showOrganization ? (
              <Menu.Item>
                <div
                  onClick={() =>
                    !cookies.userDetails.loginAsOrg
                      ? handleLoginAsOrg(true)
                      : null
                  }
                  className="flex items-center gap-2 text-base px-3	py-[7px] hover:bg-[#F5F3EF] rounded-lg mb-1 cursor-pointer"
                >
                  <div className="w-5 h-5 rounded-full bg-[#88AEBA] flex justify-center items-center text-xs overflow-hidden">
                    {userOrgDetails.avatarLink ? (
                      <Image
                        width={40}
                        height={40}
                        src={`${FIRESTORE_IMG_BASE_START_URL}${encodeUrl(userOrgDetails.avatarLink)}`}
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      getInitialOfEmail(
                        userOrgDetails.name ? userOrgDetails.name : 'O',
                      )
                    )}
                  </div>{' '}
                  {userOrgDetails.name}
                  {cookies.userDetails.loginAsOrg && (
                    <div className="ml-auto">
                      <Image src={check} alt="check" />
                    </div>
                  )}
                </div>
              </Menu.Item>
            ) : null}
            <hr className="border-[#E6E3D6] realtive -left-[1.5px] -right-[1.5px]"></hr>
            <Menu.Item>
              <Link
                href="/activity?events=true"
                className={`flex items-center gap-2 text-base px-3	py-[7px] hover:bg-[#F5F3EF] rounded-lg ${highlightActivity ? 'bg-[#F5F3EF]' : ''}`}
              >
                Events & Activity
              </Link>
            </Menu.Item>

            <Menu.Item>
              <Link
                href="/activity?wishlist=true"
                className={`flex items-center gap-2 text-base px-3	py-[7px] hover:bg-[#F5F3EF] rounded-lg ${highlightWishlist ? 'bg-[#F5F3EF]' : ''}`}
              >
                Wishlist
              </Link>
            </Menu.Item>
            <hr className="border-[#E6E3D6]  relative -left-[1.5px] -right-[1.5px]"></hr>

            <Menu.Item>
              <Link
                href="/profile"
                className={`flex items-center gap-2 text-base px-3	py-[7px] hover:bg-[#F5F3EF] rounded-lg ${pathname === '/profile' ? 'bg-[#F5F3EF]' : ''}`}
              >
                Account settings
              </Link>
            </Menu.Item>

            <Menu.Item>
              <button
                className="flex items-center gap-2 text-base px-3	py-[7px] hover:bg-[#F5F3EF] rounded-lg"
                onClick={() => logOut(router, dispatch)}
              >
                Log out
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
