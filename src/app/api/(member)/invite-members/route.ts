import responseHandler from '@/lib/responseHandler';
import { getUserDetailsCookie } from '@/services/backend/commonServices';
import {
  createMember,
  getMembersForOrganization,
} from '@/services/backend/organization';
import { orgIdSchema } from '@/utils/joiSchema';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { members, orgId } = reqBody;
    const { error } = orgIdSchema.validate({ orgId });
    if (error) {
      const errorMessage: string = error.details
        .map((err) => err.message)
        .join('; ');

      const response = responseHandler(403, false, null, errorMessage);
      return response;
    }
    // get users details
    const userDetails = getUserDetailsCookie();
    const convertString = JSON.parse(userDetails.value);
    const { id } = convertString;
    await createMember(members, id, orgId);
    const membersList = await getMembersForOrganization(orgId);
    const response = responseHandler(
      200,
      true,
      { members: membersList },
      'Invite sent successfully',
    );
    return response;
  } catch (error) {
    console.log(error, 'Error in creating organization Member');
    const response = responseHandler(
      500,
      false,
      null,
      'Error in creating organization Member.',
    );
    return response;
  }
}
