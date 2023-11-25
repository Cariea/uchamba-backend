/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

// Middlewares
import { personalHardSkillSchema } from '../personal-hard-skills/personal-hard-skills.schema'

// Controllers
import { getSkillByUserId } from './actions/get-by-id.action'
import { addPersonalHardSkill } from './actions/add.action'
import { deletePersonalHardSkill } from './actions/delete.action'
import { updatePersonalHardSkill } from './actions/update.action'
import { schemaGuard } from '../../middlewares/schemaGuard'
const router = Router()

router.get('/', getSkillByUserId)
router.post('/', schemaGuard(personalHardSkillSchema), addPersonalHardSkill)
router.put('/personalHardskill/:phardSkillId', schemaGuard(personalHardSkillSchema), updatePersonalHardSkill)
router.delete('/personalHardskill/:phardSkillId', deletePersonalHardSkill)

export default router
