import type { NextRequest } from 'next/server';
import { getUserDetailsCookie } from './services/backend/commonServices';
import responseHandler from './lib/responseHandler';

export const middleware = async (request: NextRequest) => {
  const userDetails = await getUserDetailsCookie();
  const { pathname } = request.nextUrl;
  //   in future we will add more routes in this array to
  const protectedRoutes = [
    '/api/join-opportunity',
    '/api/wishlist',
    '/api/organization',
    '/api/member',
    '/api/resend-invite',
    '/api/organization-invites',
    '/api/org-invite-update',
  ];
  //   we have different method on this route and that should be public
  if (
    pathname === '/api/opportunity' &&
    request.method === 'POST' &&
    !userDetails
  ) {
    const response = responseHandler(
      401,
      false,
      null,
      'Please login to create opportunity',
    );
    return response;
  }
  if (!userDetails && protectedRoutes.includes(pathname)) {
    const response = responseHandler(401, false, null, 'Please login first');
    return response;
  }
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/api/opportunity',
    '/api/join-opportunity',
    '/api/wishlist',
    '/api/organization',
    '/api/member',
    '/api/resend-invite',
    '/api/organization-invites',
    '/api/org-invite-update',
  ],
};
