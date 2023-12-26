import { z } from 'zod'

export const ProjectSchema = z.object({
  userId: z
    .number()
    .optional(),
  projectId: z
    .number()
    .optional(),
  name: z
    .string()
    .min(1, 'Debe indicar un nombre')
    .max(64, 'El nombre no puede superar los 64 carácteres'),
  description: z
    .string(),
  projectUrl: z
    .string()
})

export const ProjectUpdateSchema = ProjectSchema.extend({
  coverImageId: z
    .string()
    .optional(),
  deletedImages: z
    .union([z.string(), z.array(z.string())])
    .optional()
})
