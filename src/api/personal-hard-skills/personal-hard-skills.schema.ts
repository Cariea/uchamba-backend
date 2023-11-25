import { z } from 'zod'

export const personalHardSkillSchema = z.object({
  userId: z
    .number()
    .optional(),
  phardSkillId: z
    .number()
    .optional(),
  name: z
    .string()
    .min(1, 'El nombre debe tener al menos 1 caracter')
    .max(64, 'El nombre no puede superar los 64 caracteres')
})
