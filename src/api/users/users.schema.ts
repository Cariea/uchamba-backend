import { z } from 'zod'
import { UserRole } from '../../utils/roles.enum'

export const UserSchema = z.object({
  userId: z
    .number()
    .optional(),
  name: z
    .string()
    .max(128, 'El nombre no puede superar los 128 carácteres'),
  email: z
    .string()
    .max(64, 'El email no puede superar los 64 carácteres')
    .email(),
  password: z
    .string(),
  aboutMe: z
    .string(),
  phoneNumber: z
    .string(),
  residenceAddress: z
    .string(),
  role: z
    .enum([UserRole.ADMIN, UserRole.GRADUATED])
})
