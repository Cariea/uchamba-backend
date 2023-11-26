import { Router } from 'express'

// Middlewares
import { tokenGuard } from '../../middlewares/tokenGuard'
import { verifyToken } from '../../middlewares/auth'

// Routers
import authRouter from '../auth/auth.routes'
import userRouter from '../users/users.routes'
import languageRouter from '../languages/languages.routes'
import careerRouter from '../uCareers/careers.routes'
import hardSkillsRouter from '../hard-skills/hard-skills.routes'
import personalHardSkillsRouter from '../personal-hard-skills/personal-hard-skills.routes'
import softSkillsRouter from '../soft-skills/soft-skills.routes'
import personalSoftSkillsRouter from '../personal-soft-skills/personal-soft-skills.routes'
import foreignStudiesRouter from '../foreign-studies/foreign-studies.routes'
import projectRouter from '../projects/projects.routes'
import userLanguagesRouter from '../user-languages/user-languages.routes'
import workExperiencesRouter from '../work-experiences/work-experiences.routes'

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
router.use('/careers', careerRouter)
router.use('/hard-skills', hardSkillsRouter)
router.use('/personal-hard-skills', personalHardSkillsRouter)
router.use('/soft-skills', softSkillsRouter)
router.use('/personal-soft-skills', personalSoftSkillsRouter)
router.use('/foreign-studies', foreignStudiesRouter)
router.use('/projects', projectRouter)
router.use('/user-languages', userLanguagesRouter)
router.use('/work-experiences', workExperiencesRouter)
