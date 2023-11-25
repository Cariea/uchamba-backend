import { z } from 'zod'

export const softSkillSchema = z.object({
  hardSkillId: z
    .number()
    .optional(),
  name: z
    .string()
    .min(1, 'El nombre debe tener al menos 1 caracter')
    .max(64, 'El nombre no puede superar los 64 caracteres')
})
