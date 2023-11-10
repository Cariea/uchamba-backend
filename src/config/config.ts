import dotenv from 'dotenv'

dotenv.config()

export const AUTH_SECRET = process.env.AUTH_SECRET
export const AUTH_EXPIRE = process.env.AUTH_EXPIRE
export const AUTH_ROUNDS = process.env.AUTH_ROUNDS
export const PORT = process.env.PORT
export const DATABASE_URL_PROD = process.env.DATABASE_URL_PROD
export const DATABASE_URL_STAGING = process.env.DATABASE_URL_STAGING

// para conexiones locales de prueba
export const DEV_DATABASE_URL = process.env.DEV_DATABASE_URL
