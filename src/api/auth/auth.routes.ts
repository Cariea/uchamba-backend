/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { LoginSchema, RegisterSchema, VerifySchema } from './auth.schema'

// Middlewares
import { schemaGuard } from '../../middlewares/schemaGuard'

// Controllers
import { signUp } from './actions/register.action'
import { logIn } from './actions/login.action'
import { verifyAccount } from './actions/verify.action'

const router = Router()

router.post('/register', schemaGuard(RegisterSchema), signUp)
router.post('/login', schemaGuard(LoginSchema), logIn)
router.patch('/verify-account', schemaGuard(VerifySchema), verifyAccount)

export default router
