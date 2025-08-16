import nodemailer from 'nodemailer';
import { marked } from "marked";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendSummaryEmail = async (to, summary) => {
  const htmlContent = marked(summary);
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: '📋 Meeting Summary',
    html: htmlContent,   
  };
  return transporter.sendMail(mailOptions);
};
