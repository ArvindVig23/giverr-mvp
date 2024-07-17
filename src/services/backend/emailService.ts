import {
  SMTP_EMAIL,
  SMTP_HOST,
  SMTP_PASSWORD,
  SMTP_PORT,
} from '@/constants/constants';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  auth: {
    user: SMTP_EMAIL,
    pass: SMTP_PASSWORD,
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html: string,
  calendarObject?: any,
) => {
  try {
    const mailOptions: any = {
      from: process.env.SMTP_FROM, // sender address
      to: to.split(',').map((email) => email.trim()),
      subject: subject,
      text: text,
      html: html,
    };

    if (calendarObject) {
      let alternatives = {
        'Content-Type': 'text/calendar',
        method: 'REQUEST',
        content: Buffer.from(calendarObject.toString()),
        component: 'VEVENT',
        'Content-Class': 'urn:content-classes:calendarmessage',
      };
      mailOptions['alternatives'] = alternatives;
      mailOptions['alternatives']['contentType'] = 'text/calendar';
      mailOptions['alternatives']['content'] = Buffer.from(
        calendarObject.toString(),
      );
    }

    await transporter.sendMail(mailOptions);
    console.log('Message sent successfully');
  } catch (error) {
    console.log(error, 'Error in sending email');
  }
};
