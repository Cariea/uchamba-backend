import { z } from 'zod'

export const personalSoftSkillSchema = z.object({
  userId: z
    .number()
    .optional(),
  phardSkillId: z
    .number()
    .optional(),
  name: z
    .string()
    .max(64, 'El nombre no puede superar los 64 caracteres')
})
