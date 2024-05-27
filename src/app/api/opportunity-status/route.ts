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
    try {
      const decodedToken = verify(token, TOKEN_SECRET!) as {
        expiration: number;
        opportunityId: string;
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
      const opportunityId = decodedToken.opportunityId;
      const opportunitiesRef = collection(db, 'opportunities');
      const docRef = doc(opportunitiesRef, opportunityId);
      const docSnap = await getDoc(docRef);
      const opportunityData: any = docSnap.data();
      if (!opportunityData) {
        const response = responseHandler(
          404,
          false,
          null,
          'Opportunity not found',
        );
        return response;
      }
      const updatedData = { ...opportunityData, status }; // Efficiently merge data
      await updateDoc(docRef, updatedData);

      const response = responseHandler(
        200,
        true,
        null,
        'Opportunity status updated successfully',
      );
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
