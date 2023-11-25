/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { CareerSchema } from './careers.schema'

// Middlewares
import { schemaGuard } from '../../middlewares/schemaGuard'
import { paginationGuard } from '../../middlewares/paginationGuard'
import { isAdmin } from '../../middlewares/auth'

// Controllers
import { getAllCareers } from './actions/getAll.action'
import { getCareerById } from './actions/getById.action'
import { getCareers } from './actions/get.action'
import { addCareer } from './actions/post.action'
import { deleteCareer } from './actions/delete.action'
import { updateCareer } from './actions/update.action'

const router = Router()

router.get('/all', getAllCareers)
router.get('/:careerId', getCareerById)
router.get('/', paginationGuard(), getCareers)
router.post('/', isAdmin(), schemaGuard(CareerSchema), addCareer)
router.put('/:careerId', isAdmin(), schemaGuard(CareerSchema), updateCareer)
router.delete('/:careerId', isAdmin(), deleteCareer)

export default router
