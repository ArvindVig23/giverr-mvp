import responseHandler from '@/lib/responseHandler';
import { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';
import { TOKEN_SECRET } from '@/constants/constants';
// import { getUserDetailsById } from '@/services/backend/opportunityServices';
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '@/firebase/config';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token: any = searchParams.get('token');
    if (!token) {
      const response = responseHandler(
        400,
        false,
        null,
        'Invalid request, Token not found.',
      );
      return response;
    }

    const decodedToken: any = verify(token, TOKEN_SECRET!);
    const { userId } = decodedToken;

    const userNotificationSettingsRef = collection(
      db,
      'userNotificationSettings',
    );
    const q = query(userNotificationSettingsRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      const response = responseHandler(404, false, null, 'User not found');
      return response;
    }

    const docRef = querySnapshot.docs[0].ref;
    const data = querySnapshot.docs[0].data();
    if (!data.acceptSubmission) {
      const response = responseHandler(
        400,
        false,
        null,
        'Already unsubscribed, you can subscribe from account settings.',
      );
      return response;
    }
    await updateDoc(docRef, { acceptSubmission: false });
    const response = responseHandler(
      200,
      true,
      null,
      'Unsubscribed successfully, You can subscribe again from the account settings',
    );
    return response;
  } catch (error) {
    console.log(error, 'Error in unsubscribing');
    const response = responseHandler(
      500,
      false,
      null,
      'Error in in unsubscribing',
    );
    return response;
  }
}
