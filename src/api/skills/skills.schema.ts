import { z } from 'zod'
import { SkillTypes } from '../../utils/skillTypes.enum'

export const SkillSchema = z.object({
  userId: z
    .number()
    .optional(),
  skillId: z
    .number()
    .optional(),
  description: z
    .string()
    .max(256, 'La descripcion no puede superar los 256 caracteres'),
  type: z
    .enum([SkillTypes.TYPE_A, SkillTypes.TYPE_B])
})
