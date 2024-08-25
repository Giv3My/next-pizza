import nodemailer, { TransportOptions } from 'nodemailer';
import { MAIL_HOST, MAIL_PASSWORD, MAIL_PORT, MAIL_USER } from '../config';

export const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: false,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
} as TransportOptions);
