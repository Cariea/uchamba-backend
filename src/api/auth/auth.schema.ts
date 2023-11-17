import { z } from 'zod'
import { UserSchema } from '../users/users.schema'

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, 'Es necesario ingresar un correo electrónico')
    .max(64, 'El nombre debe ser menor a 64 carácteres'),
  password: z
    .string()
    .min(1, 'Es necesario ingresar una contraseña')
    .max(64, 'El nombre debe ser menor a 64 carácteres')
})

export const RegisterSchema = UserSchema

export const VerifySchema = z.object({
  confirmationCode: z
    .number(),
  email: z
    .string()
    .min(1, 'Es necesario ingresar un correo electrónico')
    .max(64, 'El nombre debe ser menor a 64 carácteres')
})
