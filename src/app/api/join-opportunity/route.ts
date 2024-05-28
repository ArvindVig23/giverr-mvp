import { db } from '@/firebase/config';
import responseHandler from '@/lib/responseHandler';
import { joinOpportunity } from '@/services/backend/opportunityServices';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { oppId } = reqBody;
    const cookieStore = cookies();
    const userDetailCookie: any = cookieStore.get('userDetails');

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
    const { id, email } = convertString;

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
    const response = await joinOpportunity(oppId, id, email);
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
