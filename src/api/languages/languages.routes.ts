/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { LanguageSchema } from './languages.schema'

// Middlewares
import { schemaGuard } from '../../middlewares/schemaGuard'
import { paginationGuard } from '../../middlewares/paginationGuard'
import { isAdmin } from '../../middlewares/auth'

// Controllers
import { getAllLanguages } from './actions/getAll.action'
import { getLanguageById } from './actions/getById.action'
import { getLanguages } from './actions/get.action'
import { addLanguage } from './actions/add.action'
import { updateLanguage } from './actions/update.action'
import { deleteLanguage } from './actions/delete.action'

const router = Router()

router.get('/all', getAllLanguages)
router.get('/:languageId', getLanguageById)
router.get('/', paginationGuard(), getLanguages)
router.post('/', isAdmin(), schemaGuard(LanguageSchema), addLanguage)
router.put('/:languageId', isAdmin(), schemaGuard(LanguageSchema), updateLanguage)
router.delete('/:languageId', isAdmin(), deleteLanguage)

export default router
