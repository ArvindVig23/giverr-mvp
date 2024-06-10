import { db } from '@/firebase/config';
import responseHandler from '@/lib/responseHandler';
import {
  getOrgDetailsById,
  getUserDetailsById,
} from '@/services/backend/opportunityServices';
import { sendEmailForInvitation } from '@/services/backend/organization';
import { orgIdAndUserIdSchema } from '@/utils/joiSchema';
import { doc, getDoc } from 'firebase/firestore';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { userId, orgId, memId } = reqBody;
    const { error } = orgIdAndUserIdSchema.validate({ orgId, userId });
    if (error) {
      const errorMessage: string = error.details
        .map((err) => err.message)
        .join('; ');

      const response = responseHandler(403, false, null, errorMessage);
      return response;
    }

    // find if member exist with the org
    const memRef = doc(db, 'organizationMembers', memId);
    const memberDoc = await getDoc(memRef);
    const memData = memberDoc.data();

    if (!memData) {
      const response = responseHandler(
        404,
        false,
        null,
        'Member with this organization does not exists.',
      );
      return response;
    }
    //  check if user exists
    const userDetails = getUserDetailsById(userId);
    if (!userDetails) {
      const response = responseHandler(404, false, null, 'User not found');
      return response;
    }
    // check if org exists
    const orgDetails = getOrgDetailsById(orgId);
    if (!orgDetails) {
      const response = responseHandler(
        404,
        false,
        null,
        'Organization not found',
      );
      return response;
    }

    await sendEmailForInvitation(userId, orgId);
    const response = responseHandler(
      200,
      true,
      null,
      'Invite sent successfully',
    );
    return response;
  } catch (error) {
    const response = responseHandler(
      500,
      false,
      null,
      'Error in sending Invite.',
    );
    return response;
  }
}
