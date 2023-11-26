/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { UserStudiesSchema } from '../user-studies/user-studies.schema'

// Middlewares
import { schemaGuard } from '../../middlewares/schemaGuard'

// Controllers
import { getUserStudyByUserId } from './actions/get-by-id.action'
import { addUserUstudys } from './actions/add.action'
import { deleteUserStudy } from './actions/delete.action'
import { updateUserStudy } from './actions/update.action'

const router = Router()

router.get('/:ucareerId', getUserStudyByUserId)
router.post('/career/:ucareerId', schemaGuard(UserStudiesSchema), addUserUstudys)
router.put('/career/:ucareerId', schemaGuard(UserStudiesSchema), updateUserStudy)
router.delete('/career/:ucareerId', deleteUserStudy)

export default router
