import { Router } from 'express'

// Middlewares
import { tokenGuard } from '../../middlewares/tokenGuard'
import { verifyToken } from '../../middlewares/auth'

// Routers
import authRouter from '../auth/auth.routes'
import userRouter from '../users/users.routes'
import careerRouter from '../careers/careers.routes'

export const router = Router()

// Test endpoint
router.get('/ping', (_req, res) => {
  res.status(200).json({ test: 'todo piola' })
})

// No token validation endpoints
router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/careers', careerRouter)
// Middlewares for token validation
router.use(tokenGuard(), verifyToken())

// Secured by token validation endpoints
