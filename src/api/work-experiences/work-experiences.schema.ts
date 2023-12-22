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
  freelancer: z
    .boolean(),
  country: z
    .string()
    .nullable()
    .optional(),
  state: z
    .string()
    .nullable()
    .optional(),
  city: z
    .string()
    .nullable()
    .optional(),
  address: z
    .string()
    .nullable()
    .optional(),
  entryDate: z
    .string()
    .min(1, 'Debe indicar la fecha en que ingresó'),
  departureDate: z
    .string()
    .nullable(),
  description: z
    .string()
    .optional()
}).refine(data => data.freelancer, {
  message: 'Es necesario especificar un País',
  path: ['country']
}).refine(data => data.freelancer, {
  message: 'Es necesario especificar un Estado',
  path: ['state']
}).refine(data => data.freelancer, {
  message: 'Es necesario especificar una Ciudad',
  path: ['city']
}).refine(data => data.freelancer, {
  message: 'Es necesario especificar una Dirección',
  path: ['address']
})
