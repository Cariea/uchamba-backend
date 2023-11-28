import { z } from 'zod'

export const UserHardSkillSchema = z.object({
  userId: z
    .number()
    .optional(),
  hardSkillId: z
    .number()
    .optional()
})
