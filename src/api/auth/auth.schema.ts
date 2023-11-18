import { z } from 'zod'
import { RegisterUserPayload } from '../users/users.schema'

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, 'Es necesario ingresar un correo electrónico')
    .max(64, 'El nombre debe ser menor a 64 carácteres')
    .email()
    .regex(/^[a-zA-Z0-9._%+-]+@est.ucab.edu.ve$/, 'El correo debe ser un correo UCAB válido'),
  password: z
    .string()
    .min(1, 'Es necesario ingresar una contraseña')
    .max(64, 'El nombre debe ser menor a 64 carácteres')
})

export const RegisterSchema = RegisterUserPayload

export const VerifyAccountSchema = z.object({
  confirmationCode: z
    .string()
    .refine(data => data.length === 6, {
      message: 'El código de confirmación debe tener exactamente 6 caracteres'
    }),
  email: z
    .string()
    .min(1, 'Es necesario ingresar un correo electrónico')
    .max(64, 'El nombre debe ser menor a 64 carácteres')
})
