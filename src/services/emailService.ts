import { generateEmailTemplate } from '@/emailTemplate/signUpEmail';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: +process.env.SMTP_PORT!,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
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
