/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

// Controllers
import { getAllEducationInfo } from './actions/get-all.action'

const router = Router()

router.get('/', getAllEducationInfo)

export default router
