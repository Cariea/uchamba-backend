import { z } from 'zod'
import { UserRole } from '../../utils/roles.enum'

export const UserSchema = z.object({
  userId: z
    .number()
    .optional(),
  name: z
    .string()
    .min(1, 'Debe indicar un nombre')
    .max(64, 'El nombre no puede superar los 64 carácteres'),
  email: z
    .string()
    .min(1, 'Debe indicar un correo electrónico')
    .max(128, 'El email no puede superar los 128 carácteres')
    .email()
    .regex(/^[a-zA-Z0-9._%+-]+@est.ucab.edu.ve$/, 'El correo debe ser un correo UCAB válido'),
  password: z
    .string()
    .min(1, 'Debe indicar una contraseña')
    .max(128, 'La contraseña no puede superar los 128 carácteres'),
  aboutMe: z
    .string(),
  phoneNumber: z
    .string()
    .regex(/^[0-9]+$/, 'El numero de telefono solo acepta caracteres alfanumericos')
    .optional(),
  country: z
    .string(),
  state: z
    .string(),
  city: z
    .string(),
  residenceAddress: z
    .string(),
  role: z
    .enum([UserRole.ADMIN, UserRole.GRADUATED]),
  isActive: z
    .boolean()
    .optional()
})

export const RegisterUserPayload = z.object({
  name: z
    .string()
    .min(1, 'Debe indicar un nombre')
    .max(64, 'El nombre no puede superar los 64 carácteres'),
  email: z
    .string()
    .min(1, 'Debe indicar un correo electrónico')
    .max(128, 'El email no puede superar los 128 carácteres')
    .email()
    .regex(/^[a-zA-Z0-9._%+-]+@est.ucab.edu.ve$/, 'El correo debe ser un correo UCAB válido'),
  password: z
    .string()
    .min(1, 'Debe indicar una contraseña')
    .max(128, 'La contraseña no puede superar los 128 carácteres')
})

export const UpdateUserSchema = UserSchema.pick({
  aboutMe: true,
  country: true,
  state: true,
  city: true,
  residenceAddress: true
})
