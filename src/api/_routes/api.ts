import { Router } from 'express'

// Middlewares
import { tokenGuard } from '../../middlewares/tokenGuard'
import { verifyToken } from '../../middlewares/auth'

// Routers
import authRouter from '../auth/auth.routes'
import userRouter from '../users/users.routes'
import languageRouter from '../languages/languages.routes'
import skillRouter from '../skills/skills.routes'
import foreignStudiesRouter from '../foreign-studies/foreign-studies.routes'

export const router = Router()

// Test endpoint
router.get('/ping', (_req, res) => {
  res.status(200).json({ test: 'todo piola' })
})

// No token validation endpoints
router.use('/auth', authRouter)

// Middlewares for token validation
router.use(tokenGuard(), verifyToken())

// Secured by token validation endpoints
router.use('/users', userRouter)
router.use('/languages', languageRouter)
router.use('/skills', skillRouter)
router.use('/foreign-studies', foreignStudiesRouter)
