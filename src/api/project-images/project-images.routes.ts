/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

// Middlewares

// Controllers

import { addProjectImage } from './actions/add.action'

const router = Router()

router.post('/:projectId', addProjectImage)

export default router
