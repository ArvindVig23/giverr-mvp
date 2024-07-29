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
  startAt,
  endAt,
  documentId,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import { eventValidationSchema } from '@/utils/joiSchema';
import {
  createOpportunity,
  getUserDetailsById,
  getWishlistWithUser,
} from '@/services/backend/opportunityServices';
import { getUserDetailsCookie } from '@/services/backend/commonServices';
import moment from 'moment-timezone';
import * as geoFire from 'geofire-common';
// import { cookies } from 'next/headers';

/**
 * @swagger
 * tags:
 *   - name: Opportunity
 *     description: API endpoints for opportunity-related operations
 * /api/opportunity:
 *   post:
 *     tags:
 *       - Opportunity
 *     summary: Create a new opportunity
 *     description: Endpoint to create a new opportunity
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
      description,
      activities,
      volunteerRequirements,
      opportunityType,
      createdBy,
      locationType,
      virtualLocationLink,
      selectedDate,
      frequency,
      imageLink,
    } = reqBody;
    const { error } = eventValidationSchema.validate({
      name,
      description,
      activities,
      volunteerRequirements,
      opportunityType,
      createdBy,
      locationType,
      virtualLocationLink,
      selectedDate,
      imageLink,
      frequency,
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
        'Opportunity already exists with this name.',
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
    const userIdRecordsShouldFetch = searchParams.get('userId');
    const orgIdRecordsShouldFetch = searchParams.get('orgId');
    const startDate = searchParams.get('startDate') || 'undefined';
    const endDate = searchParams.get('endDate') || 'undefined';
    const locationType = searchParams.get('locationType') || 'undefined';
    const eventType = searchParams.get('eventType') || 'undefined';
    const lat = searchParams.get('lat') || 'undefined';
    const long = searchParams.get('long') || 'undefined';

    let opportunityIds = [];

    // // If latitude and longitude are provided, perform geospatial query first
    if (lat != 'undefined' && long != 'undefined') {
      const center = [+lat, +long] as [number, number];
      const radiusInKm = 10;
      console.log(typeof +lat, 'lat');
      console.log(long, 'lng');

      const bounds = geoFire.geohashQueryBounds(center, radiusInKm * 1000);
      const geoPromises = [];

      for (const b of bounds) {
        const geoQuery = query(
          collection(db, 'opportunityLocations'),
          orderBy('geoHash'),
          startAt(b[0]),
          endAt(b[1]),
        );
        geoPromises.push(getDocs(geoQuery));
      }

      const geoSnapshots = await Promise.all(geoPromises);

      for (const snap of geoSnapshots) {
        for (const doc of snap.docs) {
          const locationLat = doc.get('lat');
          const locationLng = doc.get('long');

          const distanceInKm = geoFire.distanceBetween(
            [locationLat, locationLng],
            center,
          );
          if (distanceInKm <= radiusInKm) {
            opportunityIds.push(doc.get('opportunityId'));
          }
        }
      }
    }

    let opportunitiesQuery = query(
      collection(db, 'opportunities'),
      orderBy('createdAt', 'desc'),
    );

    // If we have opportunityIds from geospatial query, add it to the main query
    if (opportunityIds.length) {
      const uniqueOpportunityIds = Array.from(new Set(opportunityIds));

      console.log(uniqueOpportunityIds, 'here if');

      opportunitiesQuery = query(
        opportunitiesQuery,
        where(documentId(), 'in', uniqueOpportunityIds),
      );
    }
    if (startDate != 'undefined' && endDate != 'undefined') {
      opportunitiesQuery = query(
        opportunitiesQuery,
        where('createdAt', '>=', startDate),
        where(
          'createdAt',
          '<=',
          moment(endDate, 'YYYY-MM-DD').add(1, 'day').format('YYYY-MM-DD'),
        ),
      );
    }

    if (eventType != 'undefined') {
      const eventTypes = eventType.split(',').map((item) => item.trim());
      console.log(eventTypes, 'eventTypes');

      if (eventTypes.includes('SHOW_UP') && eventTypes.includes('PRE_ENTERY')) {
        // If both types are present, we don't need to add any filter
      } else if (eventTypes.includes('SHOW_UP')) {
        console.log('else if show up');

        opportunitiesQuery = query(
          opportunitiesQuery,
          where('registrationType', '==', 'SHOW_UP'),
        );
      } else if (eventTypes.includes('PRE_ENTERY')) {
        opportunitiesQuery = query(
          opportunitiesQuery,
          where('registrationType', '!=', 'SHOW_UP'),
        );
      }
    }

    if (locationType !== 'undefined') {
      const locationTypes = locationType.split(',').map((item) => item.trim());
      console.log(locationTypes, 'locationTypes');

      if (
        locationTypes.includes('VIRTUAL') &&
        locationTypes.includes('PHYSICAL')
      ) {
        // If both types are present, we don't need to add any filter
      } else if (locationTypes.includes('VIRTUAL')) {
        console.log('inside the virtual else if=======');

        opportunitiesQuery = query(
          opportunitiesQuery,
          where('registrationWebsiteLink', '>', ''),
        );
      } else if (locationTypes.includes('PHYSICAL')) {
        opportunitiesQuery = query(
          opportunitiesQuery,
          where('registrationWebsiteLink', 'in', ['', null]),
        );
      }
    }

    if (opportunityId) {
      const arrayOfOpportunityFilter = opportunityId?.split(',');
      opportunitiesQuery = query(
        opportunitiesQuery,
        where('opportunityType', 'in', arrayOfOpportunityFilter),
      );
    }
    // this check is added coz if we are fetching records with userId then it should fetch the records with status pending as well
    if (!userIdRecordsShouldFetch && !orgIdRecordsShouldFetch) {
      opportunitiesQuery = query(
        opportunitiesQuery,
        where('status', '==', 'APPROVED'),
      );
    }
    const userDetailCookie = getUserDetailsCookie();
    if (userIdRecordsShouldFetch) {
      if (!userDetailCookie) {
        const response = responseHandler(
          401,
          false,
          null,
          'Please login before getting event',
        );
        return response;
      }

      opportunitiesQuery = query(
        opportunitiesQuery,
        where('createdBy', '==', userIdRecordsShouldFetch),
      );
    }
    if (orgIdRecordsShouldFetch) {
      if (!userDetailCookie) {
        const response = responseHandler(
          401,
          false,
          null,
          'Please login before getting event',
        );
        return response;
      }
      opportunitiesQuery = query(
        opportunitiesQuery,
        where('organizationId', '==', orgIdRecordsShouldFetch),
      );
    }
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

          if (organizationSnapshot.exists()) {
            const orgData = organizationSnapshot.data();
            opportunityData.organization = orgData;
          } else {
            opportunityData.organization = null;
          }
        } else {
          opportunityData.organization = null;
        }

        let oppLocation: any = [];
        // fetching opportunity location if virtual link is not present
        if (!opportunityData.virtualLocationLink?.length) {
          const oppLocationQuery = query(
            collection(db, 'opportunityLocations'),
            where('opportunityId', '==', docs.id),
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
          where('opportunityId', '==', docs.id),
        );
        const oppCommitmentSnapShot = await getDocs(oppCommitmentQuery);
        if (!oppCommitmentSnapShot.empty) {
          oppCommitmentSnapShot.docs.forEach((doc: any) => {
            const commitment = doc.data();
            commitment.id = doc.id;
            oppCommitments.push(commitment);
          });
        }

        // fetching volunteer for opportunity only if registration type is GIVER_PLATFORM
        let oppVolunteers = [];
        if (opportunityData.registrationType === 'GIVER_PLATFORM') {
          const oppVolunteersQuery = query(
            collection(db, 'opportunityMembers'),
            where('opportunityId', '==', docs.id),
          );
          const oppVolunteersSnapShot = await getDocs(oppVolunteersQuery);
          oppVolunteers = await Promise.all(
            oppVolunteersSnapShot.docs.map(async (volDoc) => {
              const volunteer = volDoc.data();
              const userDetails = await getUserDetailsById(volunteer.userId);
              return userDetails;
            }),
          );
        }

        // get the wishlist details
        opportunityData.isWishlist = false;
        if (userDetailCookie) {
          const convertString = JSON.parse(userDetailCookie.value);
          const { id } = convertString;
          const checkIsWishlist = await getWishlistWithUser(docs.id, id);
          opportunityData.isWishlist = checkIsWishlist;
        }
        opportunityData.commitment = oppCommitments;
        opportunityData.location = oppLocation;
        opportunityData.volunteers = oppVolunteers;
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
