/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { UserCVSchema } from './user-cvs.schema'

// Middlewares
import { schemaGuard } from '../../middlewares/schemaGuard'

// Controllers
import { addUserCV } from './actions/add.action'

const router = Router()

router.post('/', schemaGuard(UserCVSchema), addUserCV)

export default router
