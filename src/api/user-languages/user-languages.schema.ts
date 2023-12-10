import { z } from 'zod'
import { PROFICIENCY_LEVELS } from '../../utils/languagesLevel.enum'
export const UserLanguageSchema = z.object({
  userId: z
    .number()
    .optional(),
  languageId: z
    .number()
    .optional(),
  proficientLevel: z
    .enum([PROFICIENCY_LEVELS.A1, PROFICIENCY_LEVELS.A2, PROFICIENCY_LEVELS.B1, PROFICIENCY_LEVELS.B2, PROFICIENCY_LEVELS.C1, PROFICIENCY_LEVELS.C2, PROFICIENCY_LEVELS.NATIVE])
})
