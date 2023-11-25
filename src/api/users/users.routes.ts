/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { UpdateUserSchema } from './users.schema'

// Middlewares
import { schemaGuard } from '../../middlewares/schemaGuard'
import { paginationGuard } from '../../middlewares/paginationGuard'
import { isAdmin } from '../../middlewares/auth'

// Controllers
import { getAllUsers } from './actions/getAll.action'
import { getUserById } from './actions/getById.action'
import { getUsers } from './actions/get.action'
import { updateUser } from './actions/update.action'
import { deleteUser } from './actions/delete.action'

const router = Router()

router.get('/all', getAllUsers)
router.get('/:userId', getUserById)
router.get('/', paginationGuard(), getUsers)
router.put('/:userId', schemaGuard(UpdateUserSchema), updateUser)
router.delete('/:userId', isAdmin(), deleteUser)

export default router
