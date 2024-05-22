import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

export const withAdminAuthorization = (OriginalComponent: any) => {
  function HOCAuth(props: any) {
    const [cookies] = useCookies();
    const router = useRouter();
    const user: any = cookies.userToken;
    const pathName = usePathname();
    const publicPaths = [
      '/sign-in',
      '/sign-up',
      '/forgot-password',
      '/reset-password',
    ];
    const isLoggedIn = publicPaths.includes(pathName) && user;

    useEffect(() => {
      if (isLoggedIn) {
        router.push('/');
      }
    }, [isLoggedIn, router]);

    return isLoggedIn ? null : <OriginalComponent {...props} />;
  }

  HOCAuth.displayName = 'HOCAuth';

  return HOCAuth;
};
