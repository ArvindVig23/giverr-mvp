import {
  SMTP_EMAIL,
  SMTP_HOST,
  SMTP_PASSWORD,
  SMTP_PORT,
} from '@/constants/constants';
import { generateEmailTemplate } from '@/emailTemplate/signUpEmail';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  auth: {
    user: SMTP_EMAIL,
    pass: SMTP_PASSWORD,
  },
});

export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM, // sender address
      to: to,
      subject: subject,
      text: text,
      html: generateEmailTemplate(to),
    });
  } catch (error) {
    console.log(error);
  }
};
