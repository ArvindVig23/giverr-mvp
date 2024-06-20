import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

export const hocManageProfile = (OriginalComponent: any) => {
  function HOCProfile(props: any) {
    const [cookies] = useCookies();
    const router = useRouter();
    const loginAsOrg = cookies.userDetails.loginAsOrg;
    const searchParams = useSearchParams().get('tab') || 'accounts';
    const protectedPathsForOrg = ['my-organizations', 'organizations'];
    const protectedPathsForUser = ['members'];
    const publicPathForOrg = [
      'accounts',
      'members',
      'notification',
      'timezone-settings',
    ];

    const publicPathForUser = [
      'accounts',
      'my-organizations',
      'organizations',
      'notification',
      'timezone-settings',
    ];

    const isPathPublic = (orgLoginFlag: boolean, searchParam: string) => {
      return orgLoginFlag
        ? publicPathForOrg.includes(searchParam)
        : publicPathForUser.includes(searchParam);
    };

    const isPathProtected = (orgLoginFlag: boolean, searchParam: string) => {
      return orgLoginFlag
        ? protectedPathsForOrg.includes(searchParam)
        : protectedPathsForUser.includes(searchParam);
    };

    const isPublicPath = isPathPublic(loginAsOrg, searchParams);
    const isProtectedPath = isPathProtected(loginAsOrg, searchParams);

    useEffect(() => {
      return isPublicPath
        ? router.push(`?tab=${searchParams}`)
        : router.push(`?tab=accounts`);
    }, [isPublicPath, isProtectedPath, loginAsOrg, router, searchParams]);

    return <OriginalComponent {...props} />;
  }

  HOCProfile.displayName = 'HOCProfile';
  return HOCProfile;
};
