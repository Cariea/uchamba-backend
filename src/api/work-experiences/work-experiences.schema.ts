import { z } from 'zod'

export const WorkExperiencesSchema = z.object({
  userId: z
    .number()
    .optional(),
  workExpId: z
    .number()
    .optional(),
  organizationName: z
    .string()
    .min(1, 'Debe indicar el nombre de la organización')
    .max(64, 'El nombre no puede superar los 64 carácteres'),
  jobTitle: z
    .string()
    .min(1, 'Debe indicar el rol que desempeñaba')
    .max(64, 'El nombre no puede superar los 64 carácteres'),
  address: z
    .string()
    .optional(),
  entryDate: z
    .string()
    .min(1, 'Debe indicar la fecha en que ingresó'),
  departureDate: z
    .string()
    .optional(),
  description: z
    .string()
    .optional()
})
