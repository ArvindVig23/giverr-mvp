import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

export const hocOrganizationGuard = (OriginalComponent: any) => {
  function HOCOrganization(props: any) {
    const [cookies] = useCookies();
    const router = useRouter();
    const loginAsOrg = cookies.userDetails.loginAsOrg;
    const searchParams = useSearchParams().get('tab') || 'accounts';
    const pathName = usePathname();
    const protectedPaths = [
      '/profile?tab=my-organizations',
      '/profile?tab=organizations',
    ];
    const publicPaths = [
      '/profile?tab=accounts',
      '/profile?tab=members',
      '/profile?tab=notification',
      '/profile?tab=timezone-settings',
    ];

    const isPublicPath = publicPaths.includes(
      searchParams ? `${pathName}?tab=${searchParams}` : pathName,
    );
    const isProtectedPath = protectedPaths.includes(
      searchParams ? `${pathName}?tab=${searchParams}` : pathName,
    );

    useEffect(() => {
      if (isPublicPath && loginAsOrg) {
        router.push(
          searchParams ? `${pathName}?tab=${searchParams}` : pathName,
        );
      } else if (isProtectedPath && loginAsOrg) {
        router.push(searchParams ? `${pathName}?tab=accounts` : pathName);
      }
    }, [isPublicPath, isProtectedPath, loginAsOrg, router, pathName]);

    return <OriginalComponent {...props} />;
  }

  HOCOrganization.displayName = 'HOCOrganization';
  return HOCOrganization;
};
