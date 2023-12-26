/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { LoginSchema } from './auth.schema'

// Middlewares
import { schemaGuard } from '../../middlewares/schemaGuard'

// Controllers
import { logIn } from './actions/login.action'

const router = Router()

router.post('/login', schemaGuard(LoginSchema), logIn)

export default router
