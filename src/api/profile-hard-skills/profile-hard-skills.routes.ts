/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { ProfileSkillsArraySchema } from './profile-hard-skills.schema'

// Middlewares
import { schemaGuard } from '../../middlewares/schemaGuard'

// Controllers
import { addProfileHardSkills } from './actions/add.action'
import { deleteProfileHardSkill } from './actions/delete.action'

const router = Router()

router.post('/', schemaGuard(ProfileSkillsArraySchema), addProfileHardSkills)
router.delete('/:name', deleteProfileHardSkill)

export default router
