import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { StatusError } from '../../../utils/responses/status-error'

export const deletePersonalLink = async (
  req: ExtendedRequest,
  res: Response
): Promise<Response | undefined> => {
  try {
    const { linkId } = req.params
    const response = await pool.query({
      text: `
        DELETE
        FROM personal_links
        WHERE user_id = $1 and link_id = $2
      `,
      values: [req.user.id, linkId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se encontro el link de id: ${linkId} del usuario: ${req.user.id as number}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Link eliminado correctamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
