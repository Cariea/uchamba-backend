/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { CareerSchema } from './careers.schema'

// Middlewares
import { schemaGuard } from '../../middlewares/schemaGuard'

// Controllers
import { postCareer } from './actions/post.action'
import { getCareers } from './actions/get.action'
import { getAllCareers } from './actions/getAll.action'
import { getCareerById } from './actions/getById.action'
import { deleteCareer } from './actions/delete.action'
import { updateCareer } from './actions/update.action'
import { paginationGuard } from '../../middlewares/paginationGuard'

const router = Router()

router.get('/all', getAllCareers)
router.get('/:careerId', getCareerById)
router.get('/', paginationGuard(), getCareers)
router.post('/', schemaGuard(CareerSchema), postCareer)
router.put('/:careerId', schemaGuard(CareerSchema), updateCareer)
router.delete('/:careerId', deleteCareer)

export default router
