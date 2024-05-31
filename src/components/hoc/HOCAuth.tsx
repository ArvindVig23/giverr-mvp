import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

export const hocAuth = (OriginalComponent: any) => {
  function HOCAuth(props: any) {
    const [cookies] = useCookies();
    const router = useRouter();
    const userToken: any = cookies.userToken;
    const pathName = usePathname();
    const publicPaths = [
      '/sign-in',
      '/sign-up',
      '/forgot-password',
      '/reset-password',
    ];
    const protectedPaths = ['/activity', '/profile'];

    const isPublicPath = publicPaths.includes(pathName);
    const isProtectedPath = protectedPaths.includes(pathName);

    useEffect(() => {
      if (isPublicPath && userToken) {
        router.push('/');
      } else if (isProtectedPath && !userToken) {
        router.push('/sign-in');
      }
    }, [isPublicPath, isProtectedPath, userToken, router, pathName]);

    if ((isPublicPath && userToken) || (isProtectedPath && !userToken)) {
      router.push('/');
      return null;
    }

    return <OriginalComponent {...props} />;
  }

  HOCAuth.displayName = 'HOCAuth';

  return HOCAuth;
};
