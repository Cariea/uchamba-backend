import { z } from 'zod'
import { Degree } from '../../utils/degrees.enum'

export const ForeignStudiesSchema = z.object({
  userId: z
    .number()
    .optional(),
  foreignStudieId: z
    .number()
    .optional(),
  name: z
    .string()
    .max(64, 'El nombre de la carrera no puede superar los 64 caracteres'),
  universityName: z
    .string()
    .max(64, 'El nombre de la universidad no puede superar los 64 caracteres'),
  degree: z
    .enum([Degree.UNDERGRADUATE, Degree.POSTGRADUATE, Degree.SPECIALIZATION, Degree.MASTER, Degree.DOCTORATE]),
  graduationDate: z
    .string()
})
