import dotenv from 'dotenv';

import nodemailer from 'nodemailer';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default (user, list) => {
  transporter.sendMail(
    {
      from: process.env.EMAIL_USER,
      to: user,
      subject: 'Client Email List',
      text: list,
    },
    (error, info) => {
      if (error) {
        throw new Error(error);
      }
      return `Email sent: ${info.response}`;
    },
  );
};
