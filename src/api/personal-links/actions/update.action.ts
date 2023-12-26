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
    const { url } = req.body
    const response = await pool.query({
      text: `
        UPDATE personal_links
        SET 
          url = $1
        WHERE
          user_id = $2 AND
          link_id = $3
      `,
      values: [url, req.user.id, linkId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se encontro el link: ${linkId} del usuario: ${req.user.id as number}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Link Personal modificado correctamente' })
  } catch (error) {
    console.log(error)
    return handleControllerError(error, res)
  }
}
