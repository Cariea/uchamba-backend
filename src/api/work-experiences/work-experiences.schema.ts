import { z } from 'zod'

export const WorkExperiencesSchema = z.discriminatedUnion('freelancer', [
  z.object({
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
    freelancer: z.literal(true),
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
  }),
  z.object({
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
    entryDate: z
      .string()
      .min(1, 'Debe indicar la fecha en que ingresó'),
    departureDate: z
      .string()
      .nullable(),
    description: z
      .string()
      .optional(),
    freelancer: z.literal(false),
    country: z
      .string(),
    state: z
      .string(),
    city: z
      .string(),
    address: z
      .string()
  })
])
