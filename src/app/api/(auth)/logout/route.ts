import { cookies } from 'next/headers';
import responseHandler from '../../../../../lib/responseHandler';

export async function GET() {
  try {
    const cookieStore = cookies();
    const user = cookieStore.get('userToken');
    if (!user) {
      const response = responseHandler(
        401,
        false,
        null,
        'User already logged out.',
      );
      return response;
    }
    cookieStore.delete('userToken');
    const response = responseHandler(200, false, null, 'Logout successfull.');
    return response;
  } catch (error) {
    const response = responseHandler(500, false, null, 'Error while logout.');
    return response;
  }
}
