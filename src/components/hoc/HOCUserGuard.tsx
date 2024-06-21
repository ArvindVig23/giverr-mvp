import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

export const hocUserGuard = (OriginalComponent: any) => {
  function HOCUser(props: any) {
    const [cookies] = useCookies();
    const router = useRouter();
    const loginAsOrg = cookies.userDetails.loginAsOrg;
    const searchParams = useSearchParams().get('tab') || 'accounts';
    const pathName = usePathname();
    const protectedPaths = ['/profile?tab=members'];
    const publicPaths = [
      '/profile?tab=accounts',
      '/profile?tab=my-organizations',
      '/profile?tab=organizations',
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
      if (isPublicPath && !loginAsOrg) {
        router.push(
          searchParams ? `${pathName}?tab=${searchParams}` : pathName,
        );
      } else if (isProtectedPath && !loginAsOrg) {
        router.push(searchParams ? `${pathName}?tab=accounts` : pathName);
      }
    }, [
      isPublicPath,
      isProtectedPath,
      loginAsOrg,
      router,
      pathName,
      searchParams,
    ]);

    return <OriginalComponent {...props} />;
  }

  HOCUser.displayName = 'HOCUser';
  return HOCUser;
};
