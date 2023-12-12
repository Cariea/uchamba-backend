/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { ProjectSchema, ProjectUpdateSchema } from './projects.schema'

// Middlewares
import { schemaGuard } from '../../middlewares/schemaGuard'

// Controllers
import { getByProjectId } from './actions/get-by-project-id.action'
import { getByUserProjectId } from './actions/get-by-user-project-id'
import { addProject } from './actions/add.action'
import { updateProject } from './actions/update.action'
import { deleteProject } from './actions/delete.action'

const router = Router()

router.get('/:projectId', getByProjectId)
router.get('/user/:userId/project/:projectId', getByUserProjectId)
router.post('/', schemaGuard(ProjectSchema), addProject)
router.put('/:projectId', schemaGuard(ProjectUpdateSchema), updateProject)
router.delete('/:projectId', deleteProject)

export default router
