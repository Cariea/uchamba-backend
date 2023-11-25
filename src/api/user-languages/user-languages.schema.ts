import { z } from 'zod'
import { proficientLevels } from '../../utils/languagesLevel.enum'
export const UserLanguageSchema = z.object({
  userId: z
    .number()
    .optional(),
  languageId: z
    .number()
    .optional(),
  proficientLevel: z
    .enum([proficientLevels.A1, proficientLevels.A2, proficientLevels.B1, proficientLevels.B2, proficientLevels.C1, proficientLevels.C2])
})
