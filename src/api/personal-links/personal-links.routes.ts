/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

// Middlewares
import { personalLinkSchema } from '../personal-links/personal-links.schema'

// Controllers
import { getLinkByUserId } from './actions/get-by-id.action'
import { addPersonalLink } from './actions/add.action'
import { deletePersonalLink } from './actions/delete.action'
import { updatePersonalLink } from './actions/update.action'
import { schemaGuard } from '../../middlewares/schemaGuard'
const router = Router()

router.get('/:linkId', getLinkByUserId)
router.post('/', schemaGuard(personalLinkSchema), addPersonalLink)
router.put('/:linkId', schemaGuard(personalLinkSchema), updatePersonalLink)
router.delete('/:linkId', deletePersonalLink)

export default router
