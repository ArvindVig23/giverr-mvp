import { db } from '@/firebase/config';
import responseHandler from '@/lib/responseHandler';
import { getUserDetailsCookie } from '@/services/backend/commonServices';
import {
  getOpportunityById,
  joinOpportunity,
} from '@/services/backend/opportunityServices';
import { oppIdSchema } from '@/utils/joiSchema';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { oppId } = reqBody;
    const { error } = oppIdSchema.validate({ oppId });

    if (error) {
      const errorMessage: string = error.details
        .map((err) => err.message)
        .join('; ');

      const response = responseHandler(403, false, null, errorMessage);
      return response;
    }
    const userDetailCookie: any = await getUserDetailsCookie();
    if (!userDetailCookie) {
      const response = responseHandler(
        401,
        false,
        null,
        'Please login before joining the event',
      );
      return response;
    }
    const convertString = JSON.parse(userDetailCookie.value);
    const { id, email, timeZoneSettings } = convertString;

    //  check if opportunity exists
    const getEventDetails = await getOpportunityById(oppId);

    if (!getEventDetails) {
      const response = responseHandler(
        404,
        false,
        null,
        'Opportunity no longer available',
      );
      return response;
    }

    if (getEventDetails.registrationType === 'GIVER_PLATFORM') {
      const oppVolunteersQuery = query(
        collection(db, 'opportunityMembers'),
        where('opportunityId', '==', oppId),
      );
      const oppVolunteersSnapShot = await getDocs(oppVolunteersQuery);
      if (oppVolunteersSnapShot.size === +getEventDetails.spots) {
        const response = responseHandler(
          409,
          false,
          null,
          'Opportunity spots are full.',
        );
        return response;
      }
    }

    const oppMemberRef = collection(db, 'opportunityMembers');
    const findUser = query(
      oppMemberRef,
      where('opportuntyId', '==', oppId),
      where('userId', '==', id),
    );
    const alreadyAppliedUser = await getDocs(findUser);
    if (!alreadyAppliedUser.empty) {
      const response = responseHandler(
        409,
        false,
        null,
        'You have already applied for this opportunity',
      );
      return response;
    }
    const response = await joinOpportunity(oppId, id, email, timeZoneSettings);
    return response;
  } catch (error) {
    console.log(error, 'Error in fetching the opportunity details');
    const response = responseHandler(
      500,
      false,
      null,
      'Error in Joining the event',
    );
    return response;
  }
}
