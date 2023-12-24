import { z } from 'zod'

export const personalLinkSchema = z.object({
  userId: z
    .number()
    .optional(),
  linkId: z
    .number()
    .optional(),
  url: z
    .string()
    .url()
})
