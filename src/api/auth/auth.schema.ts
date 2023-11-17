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
