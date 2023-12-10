/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { cvGenerator } from '../cv-generator/actions/get.action'
const router = Router()

router.get('/:userId', cvGenerator)

export default router
