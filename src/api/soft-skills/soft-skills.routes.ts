/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { softSkillSchema } from './soft-skills.schema'

// Middlewares
import { schemaGuard } from '../../middlewares/schemaGuard'
import { paginationGuard } from '../../middlewares/paginationGuard'
import { isAdmin } from '../../middlewares/auth'

// Controllers
import { getAllSkills } from './actions/get-all.action'
import { getSkillById } from './actions/get-by-id.action'
import { getSoftSkills } from './actions/get.action'
import { addSoftSkill } from './actions/add.action'
import { updateSoftSkill } from './actions/update.action'
import { deleteSoftSkill } from './actions/delete.action'

const router = Router()

router.get('/all', getAllSkills)
router.get('/:softSkillId', getSkillById)
router.get('/', paginationGuard(), getSoftSkills)
router.post('/', schemaGuard(softSkillSchema), addSoftSkill)
router.put('/:softSkillId', schemaGuard(softSkillSchema), updateSoftSkill)
router.delete('/:softSkillId', isAdmin(), deleteSoftSkill)

export default router
