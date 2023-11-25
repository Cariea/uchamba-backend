/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { hardSkillSchema } from './hard-skills.schema'

// Middlewares
import { schemaGuard } from '../../middlewares/schemaGuard'
import { paginationGuard } from '../../middlewares/paginationGuard'
import { isAdmin } from '../../middlewares/auth'

// Controllers
import { getAllSkills } from './actions/get-all.action'
import { getSkillById } from './actions/get-by-id.action'
import { getHardSkills } from './actions/get.action'
import { addHardSkill } from './actions/add.action'
import { updateHardSkill } from './actions/update.action'
import { deleteHardSkill } from './actions/delete.action'

const router = Router()

router.get('/all', getAllSkills)
router.get('/:hardSkillId', getSkillById)
router.get('/', paginationGuard(), getHardSkills)
router.post('/', isAdmin(), schemaGuard(hardSkillSchema), addHardSkill)
router.put('/:hardSkillId', isAdmin(), schemaGuard(hardSkillSchema), updateHardSkill)
router.delete('/:hardSkillId', isAdmin(), deleteHardSkill)

export default router
