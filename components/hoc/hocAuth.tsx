import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

export const withAdminAuthorization = (OriginalComponent: any) => {
  function WithAdminAuthorization(props: any) {
    const [cookies] = useCookies();
    const router = useRouter();
    const user: any = cookies.userToken;
    const pathName = usePathname();
    const publicPaths = ['/sign-in', '/sign-up'];
    const isLoggedIn = publicPaths.includes(pathName) && user;

    useEffect(() => {
      if (isLoggedIn) {
        router.push('/');
      }
    }, [isLoggedIn, router]);

    return isLoggedIn ? null : <OriginalComponent {...props} />;
  }

  WithAdminAuthorization.displayName = 'WithAdminAuthorization';

  return WithAdminAuthorization;
};
