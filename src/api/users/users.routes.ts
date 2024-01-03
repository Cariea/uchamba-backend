/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { UpdateUserSchema } from './users.schema'

// Middlewares
import { schemaGuard } from '../../middlewares/schemaGuard'
import { paginationGuard } from '../../middlewares/paginationGuard'
import { tokenGuard } from '../../middlewares/tokenGuard'
import { isAdmin, verifyToken } from '../../middlewares/auth'

// Controllers
import { getAllUsers } from './actions/getAll.action'
import { getUserById } from './actions/getById.action'
import { getUsers } from './actions/get.action'
import { updateUser } from './actions/update.action'
import { getMe } from './actions/get-me.action'
import { deleteUser } from './actions/delete.action'
import { changeStatus } from './actions/changeStatus.action'
const router = Router()

router.get('/all', getAllUsers)
router.get('/me', tokenGuard(), verifyToken(), getMe)
router.get('/:userId', getUserById)
router.get('/', paginationGuard(), getUsers)

// User Only Routes
router.put('/', tokenGuard(), verifyToken(), schemaGuard(UpdateUserSchema), updateUser)
router.post('/change-status', tokenGuard(), verifyToken(), changeStatus)

// Admin Only
router.delete('/:userId', isAdmin(), deleteUser)

export default router
