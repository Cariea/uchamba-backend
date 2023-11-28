import { z } from 'zod'

export const UserSoftSkillSchema = z.object({
  userId: z
    .number()
    .optional(),
  softSkillId: z
    .number()
    .optional()
})
