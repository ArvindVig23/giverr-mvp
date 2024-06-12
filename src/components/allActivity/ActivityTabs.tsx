import React, { useEffect } from 'react';
import UserBasedOpportunityList from '../Opportunities/UserBasedOpportunityList';
import WishlistOpportunity from '../Opportunities/WishlistOpportunity';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

const ActivityTabs: React.FC = () => {
  const searchParams = useSearchParams();
  const eventsTab = searchParams.get('events');
  const wishlistTab = searchParams.get('wishlist');
  const router = useRouter();
  useEffect(() => {
    if (!wishlistTab) {
      router.push('/activity?events=true');
    }
    // eslint-disable-next-line
  }, []);
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
            <Link
              className={
                'px-3 py-2.5 inline-flex items-center rounded-xl text-[#24181B80]  ' +
                (eventsTab ? 'text-white bg-[#24181B]' : '')
              }
              data-toggle="tab"
              href="/activity?events=true"
              role="tablist"
            >
              Events
            </Link>
          </li>
          <li className="">
            <Link
              className={
                'px-3 py-2.5 inline-flex items-center rounded-xl text-[#24181B80]  ' +
                (wishlistTab ? 'text-white bg-[#24181B]' : '')
              }
              data-toggle="tab"
              href="/activity?wishlist=true"
              role="tablist"
            >
              Wishlist
            </Link>
          </li>
        </ul>
        <div className="relative flex flex-col min-w-0 break-words w-full">
          <div className=" py-5 flex-auto">
            <div className="tab-content tab-space">
              <div className={eventsTab ? 'block' : 'hidden'} id="link1">
                {eventsTab ? <UserBasedOpportunityList /> : null}
              </div>
              <div className={wishlistTab ? 'block' : 'hidden'} id="link2">
                {wishlistTab ? <WishlistOpportunity /> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityTabs;
