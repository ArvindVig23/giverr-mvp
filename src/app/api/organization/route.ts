import { collection, getDocs, query, where } from 'firebase/firestore';
import responseHandler from '../../../lib/responseHandler';
import { db } from '@/firebase/config';
import { cookies } from 'next/headers';

/**
 * @swagger
 * /api/organization:
 *   get:
 *     summary: Get list of organizations
 *     description: Endpoint to fetch the list of organizations
 *     responses:
 *       '200':
 *         description: Organizations fetched successfully
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               description: Indicates if the request was successfull
 *             data:
 *               type: array
 *               description: List of organizations
 *               items:
 *                 type: string
 *                 description: Organization name
 *             message:
 *               type: string
 *               description: Response message
 *       '500':
 *         description: Error while fetching organization
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               description: Indicates if the request was successful
 *             data:
 *               type: null
 *               description: Null data in case of error
 *             message:
 *               type: string
 *               description: Error message
 */

export async function GET() {
  try {
    const cookieStore = cookies();
    const userDetailCookie: any = cookieStore.get('userDetails');
    const convertString = JSON.parse(userDetailCookie.value);

    const { id } = convertString;

    const organizationsRef = collection(db, 'organizations');
    const queryWhereCondition = query(
      organizationsRef,
      where('createdBy', '==', id),
    );
    const querySnapshot = await getDocs(queryWhereCondition);

    const organizations: any = [];
    querySnapshot.forEach((doc) => {
      const organizationData = doc.data();
      organizationData.id = doc.id;
      organizations.push(organizationData);
    });

    const response = responseHandler(
      200,
      false,
      organizations,
      'Organizations fetched successfully',
    );
    return response;
  } catch (error) {
    console.log(error, 'error');

    const response = responseHandler(
      500,
      false,
      null,
      'Error while fetching organization',
    );
    return response;
  }
}
