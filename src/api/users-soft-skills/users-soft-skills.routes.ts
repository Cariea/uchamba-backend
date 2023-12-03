/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

// Middlewares

// Controllers
import { deleteUserSoftSkill } from './actions/delete.action'

const router = Router()

router.delete('/:softSkillId', deleteUserSoftSkill)

export default router
