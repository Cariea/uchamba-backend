/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { personalHardSkillSchema } from '../personal-hard-skills/personal-hard-skills.schema'

// Middlewares
import { schemaGuard } from '../../middlewares/schemaGuard'

// Controllers
import { getUserSkillByUserAndSkillId } from './actions/get-by-id.action'
import { addPersonalHardSkill } from './actions/add.action'
import { deletePersonalHardSkill } from './actions/delete.action'
import { updatePersonalHardSkill } from './actions/update.action'

const router = Router()

router.get('/:skillId', getUserSkillByUserAndSkillId)
router.post('/', schemaGuard(personalHardSkillSchema), addPersonalHardSkill)
router.put('/:phardSkillId', schemaGuard(personalHardSkillSchema), updatePersonalHardSkill)
router.delete('/:phardSkillId', deletePersonalHardSkill)

export default router
