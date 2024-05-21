import { NextRequest } from 'next/server';
import responseHandler from '../../../../lib/responseHandler';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { createOpportunity } from '@/services/opportunityServices';
import { eventValidationSchema } from '@/utils/joiSchema';

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const eventDetails: any = data.get('eventDetails');
    let event = null;
    if (typeof eventDetails === 'string') {
      event = JSON.parse(eventDetails);
    }
    const { name, createdBy } = event;
    const { error } = eventValidationSchema.validate(event);
    if (error) {
      const errorMessage: string = error.details
        .map((err) => err.message)
        .join('; ');

      const response = responseHandler(403, false, null, errorMessage);
      return response;
    }

    const opportunitiesRef = collection(db, 'opportunities');
    const q = query(
      opportunitiesRef,
      where('lowercaseName', '==', name.toLowerCase().trim()),
      where('createdBy', '==', createdBy),
    );

    const existedOpportunity = await getDocs(q);
    if (!existedOpportunity.empty) {
      const response = responseHandler(
        403,
        false,
        null,
        'Opportunity already exists.',
      );
      return response;
    }
    const response = await createOpportunity(event);
    return response;
  } catch (error) {
    console.log(error, 'error');

    const response = responseHandler(
      500,
      false,
      null,
      'Error while creating opportunity',
    );
    return response;
  }
}
