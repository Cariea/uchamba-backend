import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { StatusError } from '../../../utils/responses/status-error'

export const deleteUserCV = async (
  req: ExtendedRequest, res: Response
): Promise<Response | undefined> => {
  try {
    const userId = req.user.id as number
    const { cvId } = req.params
    const response = await pool.query({
      text: `
        DELETE
        FROM users_cvs
        WHERE
          user_id = $1 AND
          cv_id = $2
      `,
      values: [userId, cvId]
    })

    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${cvId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Curriculum Vitae eliminado correctamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
