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
import { getUserDetailsCookie } from '@/services/backend/commonServices';
import { getWishlistWithUser } from '@/services/backend/opportunityServices';

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
    let userId: string = '';
    const userDetailCookie = getUserDetailsCookie();
    userId = userDetailCookie ? JSON.parse(userDetailCookie.value).id : '';
    const { searchParams } = new URL(req.url);
    const page = +(searchParams.get('page') || '1');
    const limit = +(searchParams.get('limit') || '20');
    const searchText = searchParams.get('searchText')?.trim() || '';
    const organizationsRef = collection(db, 'organizations');
    let querySnapshot = await getDocs(
      query(organizationsRef, where('status', '==', 'APPROVED')),
    );
    if (searchText?.length > 0) {
      querySnapshot = await getDocs(
        query(
          organizationsRef,
          where('status', '==', 'APPROVED'),
          where('nameLowerCase', '>=', searchText),
          where('nameLowerCase', '<=', searchText + '\uf8ff'),
        ),
      );
    }
    const totalRecords = querySnapshot.size;
    if (page === 1) {
      querySnapshot = await getDocs(
        query(
          organizationsRef,
          where('status', '==', 'APPROVED'),
          where('nameLowerCase', '>=', searchText),
          where('nameLowerCase', '<=', searchText + '\uf8ff'),
          firestoreLimit(limit),
        ),
      );
    } else {
      const previousPageSnapshot = await getDocs(
        query(
          organizationsRef,
          where('status', '==', 'APPROVED'),
          where('nameLowerCase', '>=', searchText),
          where('nameLowerCase', '<=', searchText + '\uf8ff'),
          firestoreLimit((page - 1) * limit),
        ),
      );
      const lastVisible =
        previousPageSnapshot.docs[previousPageSnapshot.docs.length - 1];
      querySnapshot = await getDocs(
        query(
          organizationsRef,
          where('status', '==', 'APPROVED'),
          where('nameLowerCase', '>=', searchText),
          where('nameLowerCase', '<=', searchText + '\uf8ff'),
          startAfter(lastVisible),
          firestoreLimit(limit),
        ),
      );
    }

    const organizationIds = querySnapshot.docs.map((doc) => doc.id);

    const opportunitiesRef = collection(db, 'opportunities');
    let opportunitiesQuery = query(opportunitiesRef);
    if (organizationIds.length > 0) {
      opportunitiesQuery = query(
        opportunitiesRef,
        where('organizationId', 'in', organizationIds),
      );
    }
    const opportunitiesSnapshot = await getDocs(opportunitiesQuery);

    const organizations: any = [];
    await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const organizationData = doc.data();
        const organizationId = doc.id;

        const organizationOpportunities = opportunitiesSnapshot.docs.filter(
          (opportunityDoc) =>
            opportunityDoc.data().organizationId === organizationId,
        );
        const organizationWithOpportunities = await Promise.all(
          organizationOpportunities.map(async (opportunityDoc) => {
            const opportunityData = opportunityDoc.data();
            opportunityData.id = opportunityDoc.id;
            let oppLocation: any = [];
            // fetching opportunity location if virtual link is not present
            if (!opportunityData.virtualLocationLink?.length) {
              const oppLocationQuery = query(
                collection(db, 'opportunityLocations'),
                where('opportunityId', '==', opportunityDoc.id),
              );
              const oppLocationSnapShot = await getDocs(oppLocationQuery);
              if (!oppLocationSnapShot.empty) {
                oppLocationSnapShot.docs.forEach((doc: any) => {
                  const location = doc.data();
                  location.id = doc.id;
                  oppLocation.push(location);
                });
              }
            }
            // fetching opportunity commitment
            let oppCommitments: any = [];
            const oppCommitmentQuery = query(
              collection(db, 'opportunityCommitment'),
              where('opportunityId', '==', opportunityDoc.id),
            );
            const oppCommitmentSnapShot = await getDocs(oppCommitmentQuery);
            if (!oppCommitmentSnapShot.empty) {
              oppCommitmentSnapShot.docs.forEach((doc: any) => {
                const commitment = doc.data();
                commitment.id = doc.id;
                oppCommitments.push(commitment);
              });
            }
            return {
              ...opportunityData,
              location: oppLocation,
              isWishlist: userId
                ? await getWishlistWithUser(opportunityDoc.id, userId)
                : false,
              commitment: oppCommitments,
            };
          }),
        );

        organizationData.id = organizationId;
        organizationData.opportunities = organizationWithOpportunities;

        organizations.push(organizationData);
      }),
    );

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
