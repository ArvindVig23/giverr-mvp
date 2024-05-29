import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

export const hocAuth = (OriginalComponent: any) => {
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
    const protectedRoutes = ['/activity'];
    const allowProtectedRoutes = protectedRoutes.includes(pathName) && !user;
    const isLoggedIn = publicPaths.includes(pathName) && user;

    useEffect(() => {
      if (isLoggedIn || allowProtectedRoutes) {
        router.push('/');
      }
    }, [isLoggedIn, router, allowProtectedRoutes]);

    return isLoggedIn ? null : <OriginalComponent {...props} />;
  }

  HOCAuth.displayName = 'HOCAuth';

  return HOCAuth;
};
