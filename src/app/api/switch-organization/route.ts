import { UserDetailsCookies } from '@/interface/user';
import responseHandler from '@/lib/responseHandler';
import { getUserDetailsCookie } from '@/services/backend/commonServices';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const loginAsOrg = searchParams.get('loginAsOrg');
    const orgId = searchParams.get('orgId');

    let userDetailCookie = getUserDetailsCookie();
    if (!userDetailCookie) {
      const response = responseHandler(
        401,
        false,
        null,
        'Please login before switching Account',
      );
      return response;
    }
    userDetailCookie = JSON.parse(userDetailCookie.value);
    const updatedCookies: UserDetailsCookies = {
      ...userDetailCookie,
      loginAsOrg: loginAsOrg === 'true' ? true : false,
      orgId,
    };
    cookies().set({
      name: 'userDetails',
      value: JSON.stringify(updatedCookies),
    });
    const response = responseHandler(
      200,
      true,
      null,
      loginAsOrg === 'true'
        ? 'Switched to organization Account successfully'
        : 'Switched to normal Account successfully',
    );
    return response;
  } catch (error) {
    console.log(error, 'Error in fetching the members');
    const response = responseHandler(
      500,
      false,
      null,
      'Error in fetching members',
    );
    return response;
  }
}
