import { db } from '@/firebase/config';
import responseHandler from '../../../../lib/responseHandler';
import { collection, getDocs } from 'firebase/firestore';

export async function GET() {
  try {
    // Get all documents (including IDs)
    const allEventDocs = await getDocs(collection(db, 'opportunityTypes'));

    const opportunities = allEventDocs.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const response = responseHandler(
      200,
      true,
      opportunities,
      'Event list fetched successfully',
    );
    return response;
  } catch (error) {
    const response = responseHandler(
      500,
      false,
      null,
      'Error while getting event type.',
    );
    return response;
  }
}
