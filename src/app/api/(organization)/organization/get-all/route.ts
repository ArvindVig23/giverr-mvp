import {
  collection,
  getDocs,
  query,
  where,
  limit as firestoreLimit,
  startAfter,
} from 'firebase/firestore';
import responseHandler from '../../../../../lib/responseHandler';
import { db } from '@/firebase/config';
import { NextRequest } from 'next/server';

/**
 * @swagger
 * tags:
 *   - name: Organization
 *     description: API endpoints for organization-related operations
 * /api/organization:
 *   get:
 *     tags:
 *       - Organization
 *     summary: Get list of organizations
 *     description: Endpoint to fetch the list of organizations
 *     responses:
 *       '200':
 *         description: Organizations fetched successfully.
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
 *         description: Error while fetching organization.
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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = +(searchParams.get('page') || '1');
    const limit = +(searchParams.get('limit') || '20');
    const organizationsRef = collection(db, 'organizations');
    let querySnapshot = await getDocs(organizationsRef);
    const totalRecords = querySnapshot.size;
    if (page === 1) {
      querySnapshot = await getDocs(
        query(organizationsRef, firestoreLimit(limit)),
      );
    } else {
      const previousPageSnapshot = await getDocs(
        query(organizationsRef, firestoreLimit((page - 1) * limit)),
      );
      const lastVisible =
        previousPageSnapshot.docs[previousPageSnapshot.docs.length - 1];
      querySnapshot = await getDocs(
        query(organizationsRef, startAfter(lastVisible), firestoreLimit(limit)),
      );
    }
    const organizations = [];
    for (const doc of querySnapshot.docs) {
      const organizationData = doc.data();
      const organizationId = doc.id;

      // fetching opportunities of this organization
      const opportunitiesRef = collection(db, 'opportunities');
      const opportunitiesQuery = query(
        opportunitiesRef,
        where('organizationId', '==', organizationId),
      );
      const opportunitiesSnapshot = await getDocs(opportunitiesQuery);
      const opportunities: any = [];

      opportunitiesSnapshot.forEach((opportunityDoc) => {
        const opportunityData = opportunityDoc.data();
        opportunities.push({
          id: opportunityDoc.id,
          ...opportunityData,
        });
      });

      organizationData.id = organizationId;
      organizationData.opportunities = opportunities;

      organizations.push(organizationData);
    }
    const response = responseHandler(
      200,
      true,
      { organizations, totalRecords, page, limit },
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
