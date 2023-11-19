import nodemailer from 'nodemailer'
import { SMTP_HOST, SMTP_MAIL, SMTP_PASSWORD, SMTP_PORT } from '../config'

export const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: SMTP_MAIL,
    pass: SMTP_PASSWORD
  }
})
