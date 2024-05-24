import { cookies } from 'next/headers';
import responseHandler from '@/lib/responseHandler';

/**
 * @swagger
 * /api/logout:
 *   get:
 *      summary: Logout the user
 *      description: Endpoint to Logout the User from the application
 *      responses:
 *        200:
 *          description: 'Logout successful.'
 *        401:
 *          description: 'User already logged out.'
 */

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
    cookieStore.delete('userDetails');
    const response = responseHandler(200, true, null, 'Logout successfull.');
    return response;
  } catch (error) {
    const response = responseHandler(500, false, null, 'Error while logout.');
    return response;
  }
}
