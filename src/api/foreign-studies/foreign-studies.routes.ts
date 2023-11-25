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

router.get('/:foreignStudyId', getForeignStudiesByUserId)
router.post('/', schemaGuard(ForeignStudiesSchema), addForeignStudies)
router.put('/:foreignStudyId', schemaGuard(ForeignStudiesSchema), updateForeignStudie)
router.delete('/:foreignStudyId', deleteForeignStudie)

export default router
