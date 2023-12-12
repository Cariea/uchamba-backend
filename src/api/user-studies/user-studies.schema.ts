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
  graduationYear: z
    .string()
    .regex(/^(19\d{2}|20\d{2})$/, 'Debe ingresar un año valido')
})
