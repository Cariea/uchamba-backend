/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

// Middlewares
import { schemaGuard } from '../../middlewares/schemaGuard'
import { ProfileSkillsArraySchema } from '../profile-hard-skills/profile-hard-skills.schema'

// Controllers
import { addProfileSoftSkills } from './actions/add.action'
import { deleteProfileSoftSkill } from './actions/delete.action'

const router = Router()

router.post('/', schemaGuard(ProfileSkillsArraySchema), addProfileSoftSkills)
router.delete('/:name', deleteProfileSoftSkill)

export default router
