import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { StatusError } from '../../../utils/responses/status-error'

export const updatePersonalLink = async (
  req: ExtendedRequest,
  res: Response
): Promise<Response> => {
  try {
    const { linkId } = req.params
    const { name, url } = req.body
    const response = await pool.query({
      text: `
        UPDATE personal_links
        SET 
          name = $1,
          url = $2
        WHERE
          user_id = $3 AND
          link_id = $4
      `,
      values: [name, url, req.user.id, linkId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se encontro el link: ${linkId} del usuario: ${req.user.id as number}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'personal link modificado correctamente' })
  } catch (error) {
    return handleControllerError(error, res)
  }
}
