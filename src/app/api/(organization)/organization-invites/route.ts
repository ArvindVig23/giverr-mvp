import { db } from '@/firebase/config';
import responseHandler from '@/lib/responseHandler';
import {
  getMemberTokenDetailsById,
  getUserDetailsCookie,
} from '@/services/backend/commonServices';
import { getOrgDetailsById } from '@/services/backend/opportunityServices';
import { collection, getDocs, query, where } from 'firebase/firestore';

//  to get all the pending invites & organization in which user is member
export async function GET() {
  try {
    const userDetails = getUserDetailsCookie();
    const convertString = JSON.parse(userDetails.value);
    const { id } = convertString;
    const orgMemberRef = collection(db, 'organizationMembers');
    const q = query(
      orgMemberRef,
      where('userId', '==', id),
      where('role', '==', 'MEMBER'),
      where('status', '!=', 'REJECTED'),
    );
    const orgMemberRecords = await getDocs(q);

    const membersPromises = orgMemberRecords.docs.map(async (docs) => {
      const memberData = docs.data();
      memberData.id = docs.id;
      const organizationId = memberData.organizationId;
      const orgDetails = await getOrgDetailsById(organizationId);
      if (!orgDetails || orgDetails.status !== 'APPROVED') {
        return null;
      }
      memberData.orgDetails = orgDetails;
      memberData.tokenDetails = await getMemberTokenDetailsById(
        docs.id,
        organizationId,
      );
      return memberData;
    });
    const resolvedMembers = await Promise.all(membersPromises);
    // Filter out the null values
    const orgInvites = resolvedMembers.filter((member) => member !== null);
    const response = responseHandler(
      200,
      true,
      orgInvites,
      'Organization invites fetched successfully',
    );
    return response;
  } catch (error: any) {
    console.log(error, 'error');

    const response = responseHandler(
      500,
      false,
      null,
      'Error in getting Invites',
    );
    return response;
  }
}
