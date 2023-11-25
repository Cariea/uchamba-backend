import { z } from 'zod'

export const softSkillSchema = z.object({
  hardSkillId: z
    .number()
    .optional(),
  name: z
    .string()
    .max(64, 'El nombre no puede superar los 64 caracteres')
})
