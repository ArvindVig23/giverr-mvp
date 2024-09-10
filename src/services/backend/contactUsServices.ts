import { currentUtcDate } from './opportunityServices';
import { contactUsTemplate } from '@/utils/templates/contactUsTemplate';
import { addDoc, collection } from 'firebase/firestore';
import { sendEmail } from '@/services/backend/emailService';
import { compileEmailTemplate } from '@/services/backend/handlebars';
import { db } from '@/firebase/config';
import { ContactUsForm } from '@/interface/contactUs';
import responseHandler from '@/lib/responseHandler';
import { SUPPORT_EMAIL } from '@/constants/constants';

export const createContactUsRequest = async (reqBody: ContactUsForm) => {
  const { fullName, email, phone, message } = reqBody;
  try {
    await addDoc(collection(db, 'contactUs'), {
      fullName,
      email,
      phone,
      message,
      createdAt: currentUtcDate,
      updatedAt: currentUtcDate,
    });

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
};
