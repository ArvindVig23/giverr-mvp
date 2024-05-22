import { NextRequest } from 'next/server';
import responseHandler from '../../../../lib/responseHandler';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { eventValidationSchema } from '@/utils/joiSchema';
import { createOpportunity } from '@/services/backend/opportunityServices';

export async function POST(req: NextRequest) {
  try {
    const reqBody: any = await req.json();
    const {
      name,
      createdBy,
      description,
      eventDate,
      frequency,
      opportuntyType,
      organizationId,
      imageLink,
    } = reqBody;
    const { error } = eventValidationSchema.validate({
      name,
      description,
      eventDate,
      frequency,
      opportuntyType,
      organizationId,
      imageLink,
    });
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
    const response = await createOpportunity(reqBody);
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
