import { z } from 'zod'

export const ProjectImagesSchema = z.object({
  userId: z
    .number()
    .optional(),
  projectId: z
    .number()
    .optional()
})
