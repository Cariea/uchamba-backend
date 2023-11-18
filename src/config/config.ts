import dotenv from 'dotenv'

dotenv.config()

export const AUTH_SECRET = process.env.AUTH_SECRET
export const AUTH_EXPIRE = process.env.AUTH_EXPIRE
export const AUTH_ROUNDS = process.env.AUTH_ROUNDS
export const PORT = process.env.PORT
export const DATABASE_URL = process.env.DATABASE_URL

// SMTP Information
export const SMTP_HOST = process.env.SMTP_HOST
export const SMTP_PORT = process.env.SMTP_PORT
export const SMTP_MAIL = process.env.SMTP_MAIL
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD