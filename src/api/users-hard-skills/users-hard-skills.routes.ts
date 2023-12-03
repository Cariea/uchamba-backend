/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

// Middlewares

// Controllers
import { deleteUserHardSkill } from './actions/delete.action'

const router = Router()

router.delete('/:hardSkillId', deleteUserHardSkill)

export default router
