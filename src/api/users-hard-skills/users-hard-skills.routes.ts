/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { UserHardSkillSchema } from './users-hard-skills.schema'

// Middlewares
import { schemaGuard } from '../../middlewares/schemaGuard'

// Controllers
import { addUserHardSkill } from './actions/add.action'
import { deleteUserHardSkill } from './actions/delete.action'

const router = Router()

router.post('/:hardSkillId', schemaGuard(UserHardSkillSchema), addUserHardSkill)
router.delete('/:hardSkillId', deleteUserHardSkill)

export default router
