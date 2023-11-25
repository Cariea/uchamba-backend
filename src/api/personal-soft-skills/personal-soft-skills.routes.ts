/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

// Middlewares
import { personalSoftSkillSchema } from '../personal-soft-skills/personal-soft-skills.schema'

// Controllers
import { getSkillByUserId } from './actions/get-by-id.action'
import { addPersonalSoftSkill } from './actions/add.action'
import { deletePersonalSoftSkill } from './actions/delete.action'
import { updatePersonalSoftSkill } from './actions/update.action'
import { schemaGuard } from '../../middlewares/schemaGuard'
const router = Router()

router.get('/', getSkillByUserId)
router.post('/', schemaGuard(personalSoftSkillSchema), addPersonalSoftSkill)
router.put('/personalSoftskill/:psoftSkillId', schemaGuard(personalSoftSkillSchema), updatePersonalSoftSkill)
router.delete('/personalSoftskill/:psoftSkillId', deletePersonalSoftSkill)

export default router