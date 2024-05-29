import { cookies } from 'next/headers';

export const getUserDetailsCookie = () => {
  const cookieStore = cookies();
  const userDetailCookie: any = cookieStore.get('userDetails');
  if (!userDetailCookie) {
    return null;
  } else {
    return userDetailCookie;
  }
};
