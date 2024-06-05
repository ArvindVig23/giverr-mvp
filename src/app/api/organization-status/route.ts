import { TOKEN_SECRET } from '@/constants/constants';
import responseHandler from '@/lib/responseHandler';
import { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
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
        expiration: number;
        orgId: string;
      };

      // Check if token is expired
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (decodedToken.expiration < currentTimestamp) {
        const response = responseHandler(
          400,
          false,
          null,
          'Approval link is expired',
        );
        return response;
      }

      // Token is valid, decode opportunityId
      const orgId = decodedToken.orgId;
      const orgRef = collection(db, 'organizations');
      const docRef = doc(orgRef, orgId);
      const docSnap = await getDoc(docRef);
      const orgData: any = docSnap.data();

      if (!orgData) {
        const response = responseHandler(
          404,
          false,
          null,
          'Opportunity not found',
        );
        return response;
      }
      // prevent admin from updating status more than once
      if (orgData.status !== 'PENDING') {
        const response = responseHandler(
          400,
          false,
          null,
          'Approval link is expired',
        );
        return response;
      }
      const updatedData = { ...orgData, status }; // Efficiently merge data
      await updateDoc(docRef, updatedData);
      const message =
        status === 'APPROVED'
          ? 'Organization status updated to Approved'
          : 'Organization status updated to Rejected';
      const response = responseHandler(200, true, null, message);
      return response;

      // Proceed with your logic here based on opportunityId
    } catch (err) {
      console.log(err, 'erri');

      // Token verification failed
      const response = responseHandler(
        400,
        false,
        null,
        'Invalid approval request',
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
