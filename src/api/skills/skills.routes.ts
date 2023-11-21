/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

// Middlewares
import { SkillSchema } from '../skills/skills.schema'

// Controllers
import { getSkillByUserId } from './actions/getById.action'
import { addSkill } from './actions/add.action'
import { deleteSkill } from './actions/delete.action'
import { updateSkill } from './actions/update.action'
import { schemaGuard } from '../../middlewares/schemaGuard'
const router = Router()

router.get('/user/:userId', getSkillByUserId)
router.post('/user/:userId', schemaGuard(SkillSchema), addSkill)
router.put('/user/:userId/skill/:skillId', schemaGuard(SkillSchema), updateSkill)
router.delete('/user/:userId/skill/:skillId', deleteSkill)

export default router