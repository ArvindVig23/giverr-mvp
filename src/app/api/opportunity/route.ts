import { NextRequest } from 'next/server';
import responseHandler from '@/lib/responseHandler';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  limit as firestoreLimit,
  startAfter,
  orderBy,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import { eventValidationSchema } from '@/utils/joiSchema';
import { createOpportunity } from '@/services/backend/opportunityServices';
// import { cookies } from 'next/headers';

/**
 * @swagger
 * /api/opportunity:
 *   post:
 *     summary: Create a new opportunity
 *     description: Endpoint to create a new event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the event
 *               createdBy:
 *                 type: string
 *                 description: The creator of the event
 *               description:
 *                 type: string
 *                 description: The description of the event
 *               eventDate:
 *                 type: string
 *                 format: date-time
 *                 description: The date of the event
 *               eventTime:
 *                 type: string
 *                 format: date-time
 *                 description: The time of the event
 *               frequency:
 *                 type: string
 *                 description: The frequency of the event
 *               opportuntyType:
 *                 type: string
 *                 description: The type of opportunity
 *               organizationId:
 *                 type: string
 *                 description: The ID of the organization
 *               imageLink:
 *                 type: string
 *                 description: The link to the event image
 *               activities:
 *                 type: string
 *                 description: Activities related to the event
 *               registrationType:
 *                 type: string
 *                 description: Type of registration for the event
 *               registrationWebsiteLink:
 *                 type: string
 *                 description: The link for event registration
 *               location:
 *                 type: string
 *                 description: The location of the event
 *               volunteerRequirements:
 *                 type: string
 *                 description: Requirements for volunteers at the event
 *     responses:
 *       '201':
 *         description: Opportunity created Successfully.
 *       '403':
 *         description: Opportunity already exists.
 *       '500':
 *         description: Error while creating opportunity.
 */

export async function POST(req: NextRequest) {
  try {
    const reqBody: any = await req.json();
    const {
      name,
      createdBy,
      description,
      eventDate,
      frequency,
      opportunityType,
      organizationId,
      imageLink,
    } = reqBody;
    const { error } = eventValidationSchema.validate({
      name,
      description,
      eventDate,
      frequency,
      opportunityType,
      organizationId,
      imageLink,
    });
    if (error) {
      const errorMessage: string = error.details
        .map((err) => err.message)
        .join('; ');

      const response = responseHandler(403, false, null, errorMessage);
      return response;
    }

    const opportunitiesRef = collection(db, 'opportunities');
    const q = query(
      opportunitiesRef,
      where('lowercaseName', '==', name.toLowerCase().trim()),
      where('createdBy', '==', createdBy),
    );

    const existedOpportunity = await getDocs(q);
    if (!existedOpportunity.empty) {
      const response = responseHandler(
        403,
        false,
        null,
        'Opportunity already exists.',
      );
      return response;
    }
    const response = await createOpportunity(reqBody);
    return response;
  } catch (error) {
    console.log(error, 'error');

    const response = responseHandler(
      500,
      false,
      null,
      'Error while creating opportunity',
    );
    return response;
  }
}

// get all opporunity
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = +(searchParams.get('page') || '1');
    const limit = +(searchParams.get('limit') || '20');
    const opportunityId = searchParams.get('opportunity');
    // const cookieStore = cookies();
    // const userDetailCookie: any = cookieStore.get('userDetails');

    let opportunitiesQuery = query(
      collection(db, 'opportunities'),
      where('status', '==', 'APPROVED'),
      orderBy('createdAt', 'desc'),
    );
    if (opportunityId) {
      const arrayOfOpportunityFilter = opportunityId?.split(',');
      opportunitiesQuery = query(
        opportunitiesQuery,
        where('opportunityType', 'in', arrayOfOpportunityFilter),
      );
    }

    // if (userDetailCookie) {
    //   const convertString = JSON.parse(userDetailCookie.value);
    //   // logged in user id
    //   const { id } = convertString;

    //   opportunitiesQuery = query(
    //     opportunitiesQuery,
    //     where('createdBy', '!=', id),
    //   );
    // }
    const totalSnapshot = await getDocs(opportunitiesQuery);
    const totalRecords = totalSnapshot.size;

    let opportunitiesSnapshot;
    if (page === 1) {
      opportunitiesSnapshot = await getDocs(
        query(opportunitiesQuery, firestoreLimit(limit)),
      );
    } else {
      const previousPageSnapshot = await getDocs(
        query(opportunitiesQuery, firestoreLimit((page - 1) * limit)),
      );
      const lastVisible =
        previousPageSnapshot.docs[previousPageSnapshot.docs.length - 1];

      opportunitiesSnapshot = await getDocs(
        query(
          opportunitiesQuery,
          startAfter(lastVisible),
          firestoreLimit(limit),
        ),
      );
    }
    const opportunitiesPromises = opportunitiesSnapshot.docs.map(
      async (docs) => {
        const opportunityData = docs.data();
        opportunityData.id = docs.id;
        const organizationId = opportunityData.organizationId;

        // Option 1: Fetch organization data using a separate query (for complex data)
        if (organizationId) {
          const organizationDocRef = doc(
            collection(db, 'organizations'),
            organizationId,
          );

          const organizationSnapshot = await getDoc(organizationDocRef);

          if (organizationSnapshot) {
            const orgData = organizationSnapshot.data();
            opportunityData.organization = orgData;
          } else {
            opportunityData.organization = null;
          }
        } else {
          opportunityData.organization = null;
        }

        return opportunityData;
      },
    );
    const opportunities = await Promise.all(opportunitiesPromises);

    const response = responseHandler(
      200,
      true,
      { opportunities, totalRecords, page, limit },
      'Opportunitiy details fetched Successfully',
    );
    return response;
  } catch (error) {
    console.log(error, '-----');

    const response = responseHandler(
      500,
      false,
      null,
      'Error in fetching opportunity details',
    );
    return response;
  }
}
