import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { StatusError } from '../../../utils/responses/status-error'

export const deleteUserStudy = async (
  req: ExtendedRequest, res: Response
): Promise<Response | undefined> => {
  try {
    const { ucareerId } = req.params
    const response = await pool.query({
      text: `
        DELETE
        FROM users_ustudies
        WHERE 
          user_id = $1 AND 
          ucareer_id = $2
      `,
      values: [req.user.id, ucareerId]
    })

    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se encontro el study de id: ${ucareerId} del usuario de id: ${req.user.id as number}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Study eliminado correctamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
