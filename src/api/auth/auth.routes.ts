/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { LoginSchema, RegisterSchema, VerifyAccountSchema } from './auth.schema'

// Middlewares
import { schemaGuard } from '../../middlewares/schemaGuard'

// Controllers
import { signUp } from './actions/register.action'
import { logIn } from './actions/login.action'
import { logInT } from './actions/login.test.action'

import { verifyAccount } from './actions/verify.action'

const router = Router()

router.post('/register', schemaGuard(RegisterSchema), signUp)
router.post('/login', schemaGuard(LoginSchema), logIn)
router.post('/login/test', schemaGuard(LoginSchema), logInT)
router.patch('/verify-account', schemaGuard(VerifyAccountSchema), verifyAccount)

export default router
