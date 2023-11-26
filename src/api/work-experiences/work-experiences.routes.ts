/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { WorkExperiencesSchema } from './work-experiences.schema'

// Middlewares
import { schemaGuard } from '../../middlewares/schemaGuard'

// Controllers
import { getByWorkExperienceId } from './actions/get-by-work-experience-id.action'
import { addWorkExperience } from './actions/add.action'
import { updateWorkExperience } from './actions/update.action'
import { deleteWorkExperience } from './actions/delete.action'

const router = Router()

router.get('/:workExpId', getByWorkExperienceId)
router.post('/', schemaGuard(WorkExperiencesSchema), addWorkExperience)
router.put('/:workExpId', schemaGuard(WorkExperiencesSchema), updateWorkExperience)
router.delete('/:workExpId', deleteWorkExperience)

export default router
