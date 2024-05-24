import { db } from '@/firebase/config';
import responseHandler from '@/lib/responseHandler';
import { collection, getDocs } from 'firebase/firestore';

/**
 * @swagger
 * tags:
 *   - name: Opportunity
 *     description: API endpoints for opportunity-related operations
 * /api/opportunity-type:
 *   get:
 *     tags:
 *       - Opportunity
 *     summary: Get list of opportunity types
 *     description: Endpoint to fetch the list of opportunity types
 *     responses:
 *       '200':
 *         description: Event list fetched successfully
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               description: Indicates if the request was successful
 *             data:
 *               type: array
 *               description: List of opportunity types
 *               items:
 *                 type: string
 *                 description: Opportunity type
 *             message:
 *               type: string
 *               description: Response message
 *       '500':
 *         description: Error while getting event type.
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
    // Get all documents (including IDs)
    const allEventDocs = await getDocs(collection(db, 'opportunityTypes'));

    const opportunities = allEventDocs.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const response = responseHandler(
      200,
      true,
      opportunities,
      'Event list fetched successfully',
    );
    return response;
  } catch (error) {
    const response = responseHandler(
      500,
      false,
      null,
      'Error while getting event type.',
    );
    return response;
  }
}
