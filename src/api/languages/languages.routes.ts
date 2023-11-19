/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { LanguageSchema } from './languages.schema'

// Middlewares
import { schemaGuard } from '../../middlewares/schemaGuard'
import { getAllLanguages } from './actions/getAll.action'
import { getLanguageById } from './actions/getById.action'
import { updateLanguage } from './actions/update.action'
import { deleteLanguage } from './actions/delete.action'
import { createLanguage } from './actions/add.action'
import { getLanguages } from './actions/get.action'
import { paginationGuard } from '../../middlewares/paginationGuard'

// Controllers

const router = Router()

router.get('/all', getAllLanguages)
router.get('/:languageId', getLanguageById)
router.get('/', paginationGuard(), getLanguages)
router.post('/', schemaGuard(LanguageSchema), createLanguage)
router.put('/:languageId', schemaGuard(LanguageSchema), updateLanguage)
router.delete('/:languageId', deleteLanguage)

export default router
