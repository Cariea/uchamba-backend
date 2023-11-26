import { z } from 'zod'
import { Degree } from '../../utils/degrees.enum'
export const UserStudiesSchema = z.object({
  userId: z
    .number()
    .optional(),
  ucareerId: z
    .number()
    .optional(),
  degree: z
    .enum([Degree.UNDERGRADUATE, Degree.POSTGRADUATE, Degree.SPECIALIZATION, Degree.MASTER, Degree.DOCTORATE]),
  graduationDate: z
    .string()
    .min(10)
    .max(10)
})
