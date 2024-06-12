import { TOKEN_SECRET } from '@/constants/constants';
import { db } from '@/firebase/config';
import responseHandler from '@/lib/responseHandler';
import { getUserDetailsCookie } from '@/services/backend/commonServices';
import { getOrgDetailsById } from '@/services/backend/opportunityServices';
import { deleteInviteUser } from '@/services/backend/organization';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { verify } from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token: any = searchParams.get('token');
    const status = searchParams.get('status');
    if (!token || !status) {
      const response = responseHandler(
        400,
        false,
        null,
        'Invalid approval request',
      );
      return response;
    }
    try {
      const decodedToken = verify(token, TOKEN_SECRET!) as {
        memId: string;
        userId: string;
        orgId: string;
      };
      const { memId, userId, orgId } = decodedToken;
      //    check if org exists
      const orgDetails = await getOrgDetailsById(orgId);
      if (!orgDetails) {
        const response = responseHandler(
          404,
          false,
          null,
          'Organization no longer exists',
        );
        return response;
      }

      // check if logged user is the user whose org status needs to be changed
      const userDetails = getUserDetailsCookie();
      const convertString = JSON.parse(userDetails.value);
      const { id } = convertString;
      if (id !== userId) {
        const response = responseHandler(
          409,
          false,
          null,
          'Please logged in with the account whose invite needs to be approved',
        );
        return response;
      }
      //  check if member exists
      const orgMemRef = collection(db, 'organizationMembers');
      const docRef = doc(orgMemRef, memId);
      const docSnap = await getDoc(docRef);
      const orgMemData: any = docSnap.data();

      if (!orgMemData) {
        const response = responseHandler(404, false, null, 'Member not found');
        return response;
      }
      //    update the status
      await updateDoc(doc(db, 'organizationMembers', memId), {
        status,
      });

      //   remove the token record
      await deleteInviteUser(orgId, memId);
      const response = responseHandler(
        200,
        true,
        null,
        status === 'APPROVED' ? 'Invitation Accepted' : 'Invitation Ignored',
      );
      return response;
    } catch (error) {
      const response = responseHandler(
        500,
        false,
        null,
        'Error in updating the status',
      );
      return response;
    }
  } catch (error) {
    const response = responseHandler(
      500,
      false,
      null,
      'Error in updating the status',
    );
    return response;
  }
}
