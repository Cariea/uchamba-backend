/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { UpdateUserSchema } from './users.schema'

// Middlewares
import { schemaGuard } from '../../middlewares/schemaGuard'

// Controllers
import { getAllUsers } from './actions/getAll.action'
import { getUserById } from './actions/getById.action'
import { getUsers } from './actions/get.action'
import { updateUser } from './actions/update.action'
import { deleteUser } from './actions/delete.action'

const router = Router()

router.get('/all', getAllUsers)
router.get('/:userId', getUserById)
router.get('/', getUsers)
router.put('/:userId', schemaGuard(UpdateUserSchema), updateUser)
router.delete('/:userId', deleteUser)

export default router
