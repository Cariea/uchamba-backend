/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { UserCVSchema } from './user-cvs.schema'

// Middlewares
import { schemaGuard } from '../../middlewares/schemaGuard'

// Controllers
import { addUserCV } from './actions/add.action'
import { deleteUserCV } from './actions/delete.action'
import { updateUserCV } from './actions/update.action'

const router = Router()

router.post('/', schemaGuard(UserCVSchema), addUserCV)
router.put('/:cvId', schemaGuard(UserCVSchema), updateUserCV)
router.delete('/:cvId', deleteUserCV)

export default router
