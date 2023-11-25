import { z } from 'zod'

export const CareerSchema = z.object({
  ucareerId: z
    .number()
    .optional(),
  name: z
    .string()
    .min(1, 'Debe indicar un nombre')
    .max(64, 'El nombre no puede superar los 64 carácteres')
})
