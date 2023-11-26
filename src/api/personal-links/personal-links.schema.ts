import { z } from 'zod'

export const personalLinkSchema = z.object({
  userId: z
    .number()
    .optional(),
  linkId: z
    .number()
    .optional(),
  name: z
    .string()
    .min(1, 'El nombre debe tener al menos 1 caracter')
    .max(64, 'El nombre no puede superar los 64 caracteres'),
  url: z
    .string()
    .url()
})
