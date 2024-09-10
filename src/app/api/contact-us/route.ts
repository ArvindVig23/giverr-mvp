import { SUPPORT_EMAIL } from '@/constants/constants';
import { db } from '@/firebase/config';
import responseHandler from '@/lib/responseHandler';
import { sendEmail } from '@/services/backend/emailService';
import { compileEmailTemplate } from '@/services/backend/handlebars';
import { currentUtcDate } from '@/services/backend/opportunityServices';
import { contactUsSchema } from '@/utils/joiSchema';
import { contactUsTemplate } from '@/utils/templates/contactUsTemplate';
import { addDoc, collection } from 'firebase/firestore';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const reqBody: any = await req.json();
    const { fullName, email, phone, message } = reqBody;
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
    await addDoc(collection(db, 'contactUs'), {
      fullName,
      email,
      phone,
      message,
      createdAt: currentUtcDate,
      updatedAt: currentUtcDate,
    });

    //  send email on support email
    const emailData = {
      fullName,
      email,
      phone,
      message,
    };
    const template = compileEmailTemplate(contactUsTemplate, emailData);
    await sendEmail(
      SUPPORT_EMAIL!,
      'Contact us query',
      'Contact us query',
      template,
    );

    const response = responseHandler(
      200,
      true,
      null,
      'Thank you for submitting. We will get back to you soon.',
    );
    return response;
  } catch (error) {
    console.log(error, 'Error in contact us.');
    const response = responseHandler(500, false, null, 'Something went wrong.');
    return response;
  }
}
