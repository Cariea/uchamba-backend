/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { UserSoftSkillSchema } from './users-soft-skills.schema'

// Middlewares
import { schemaGuard } from '../../middlewares/schemaGuard'

// Controllers
import { addUserSoftSkill } from './actions/add.action'
import { deleteUserSoftSkill } from './actions/delete.action'

const router = Router()

router.post('/:softSkillId', schemaGuard(UserSoftSkillSchema), addUserSoftSkill)
router.delete('/:softSkillId', deleteUserSoftSkill)

export default router
