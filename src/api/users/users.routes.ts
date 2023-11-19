/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { UpdateUserSchema } from './users.schema'

// Middlewares
import { schemaGuard } from '../../middlewares/schemaGuard'

// Controllers
import { getAllUsers } from './actions/getAll.action'
import { getUsers } from './actions/get.action'
import { getUserById } from './actions/getById.action'
import { deleteUser } from './actions/delete.action'
import { updateUser } from './actions/update.action'
import { paginationGuard } from '../../middlewares/paginationGuard'

const router = Router()

router.get('/all', getAllUsers)
router.get('/:userId', getUserById)
router.get('/', paginationGuard(), getUsers)
router.put('/:userId', schemaGuard(UpdateUserSchema), updateUser)
router.delete('/:userId', deleteUser)

export default router
