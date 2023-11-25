/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { ForeignStudiesSchema } from '../foreign-studies/foreign-studies.schema'

// Middlewares
import { schemaGuard } from '../../middlewares/schemaGuard'

// Controllers
import { getForeignStudiesByUserId } from './actions/get-by-id.action'
import { addForeignStudies } from './actions/add.action'
import { deleteForeignStudie } from './actions/delete.action'
import { updateForeignStudie } from './actions/update.action'
const router = Router()

router.get('/', getForeignStudiesByUserId)
router.post('/', schemaGuard(ForeignStudiesSchema), addForeignStudies)
router.put('/foreign-study/:foreignStudyId', schemaGuard(ForeignStudiesSchema), updateForeignStudie)
router.delete('/foreign-study/:foreignStudyId', deleteForeignStudie)

export default router
