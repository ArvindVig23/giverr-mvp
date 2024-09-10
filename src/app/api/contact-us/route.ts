import responseHandler from '@/lib/responseHandler';
import { createContactUsRequest } from '@/services/backend/contactUsServices';

import { contactUsSchema } from '@/utils/joiSchema';

import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const reqBody: any = await req.json();
    // validate email
    const { error } = contactUsSchema.validate(reqBody, { abortEarly: false });
    if (error) {
      const errorMessage: string = error.details
        .map((err) => err.message)
        .join('; ');

      const response = responseHandler(403, false, null, errorMessage);
      return response;
    }

    //  create the new document for the contact us form
    const createNewDoc = await createContactUsRequest(reqBody);
    return createNewDoc;
  } catch (error) {
    console.log(error, 'Error in contact us.');
    const response = responseHandler(500, false, null, 'Something went wrong.');
    return response;
  }
}
