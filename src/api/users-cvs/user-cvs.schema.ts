import { z } from 'zod'

const EntriesSchema = z.object({
  education: z.object({
    featured: z
      .array(z.number()),
    personal: z
      .array(z.number())
  }),
  experiences: z
    .array(z.number()),
  languages: z
    .array(z.number()),
  // Contains both Personal and Featured skills
  skills: z.object({
    soft: z
      .array(z.string()),
    hard: z
      .array(z.string())
  })
})

export type Entries = z.infer<typeof EntriesSchema>

export const UserCVSchema = z.object({
  userId: z
    .number()
    .optional(),
  cvId: z
    .number()
    .optional(),
  careerId: z
    .number(),
  name: z
    .string()
    .min(1, 'Debe indicar un nombre')
    .max(40, 'El nombre no puede superar los 64 carácteres'),
  entries: EntriesSchema
})
