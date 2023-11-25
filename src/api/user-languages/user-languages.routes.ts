/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { UserLanguageSchema } from '../user-languages/user-languages.schema'

// Middlewares
import { schemaGuard } from '../../middlewares/schemaGuard'

// Controllers
import { getLanguageByUserId } from './actions/get-by-id.action'
import { addUserLanguage } from './actions/add.action'
import { deleteUserLanguage } from './actions/delete.action'
import { updateUserLanguage } from './actions/update.action'
const router = Router()

router.get('/', getLanguageByUserId)
router.post('/language/:languageId', schemaGuard(UserLanguageSchema), addUserLanguage)
router.put('/language/:languageId', schemaGuard(UserLanguageSchema), updateUserLanguage)
router.delete('/language/:languageId', deleteUserLanguage)

export default router
