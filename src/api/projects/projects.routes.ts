/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { ProjectSchema } from './projects.schema'

// Middlewares
import { schemaGuard } from '../../middlewares/schemaGuard'
import { paginationGuard } from '../../middlewares/paginationGuard'

// Controllers
import { getAllProjects } from './actions/getAll.action'
import { getProjectByUserProjectId } from './actions/getById.action'
import { getProjects } from './actions/get.action'
import { addProject } from './actions/add.action'
import { deleteProject } from './actions/delete.action'
import { updateProject } from './actions/update.action'

const router = Router()

router.get('/all', getAllProjects)
router.get('/user/:userId/project/:projectId', getProjectByUserProjectId)
router.get('/', paginationGuard(), getProjects)
router.post('/', schemaGuard(ProjectSchema), addProject)
router.put('/:projectId', schemaGuard(ProjectSchema), updateProject)
router.delete('/:projectId', deleteProject)

export default router
