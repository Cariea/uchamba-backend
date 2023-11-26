import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { StatusError } from '../../../utils/responses/status-error'

export const updateUserStudy = async (
  req: ExtendedRequest,
  res: Response
): Promise<Response> => {
  try {
    const { ucareerId } = req.params
    const { degree, graduationDate } = req.body
    const response = await pool.query({
      text: `
        UPDATE users_ustudies
        SET 
          degree = $1,
          graduation_date = $2
        WHERE
          user_id = $3 AND
          ucareer_id = $4
      `,
      values: [degree, graduationDate, req.user.id, ucareerId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se encontro el Study de id: ${ucareerId} del usuario: ${req.user.id as number}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Study modificado correctamente' })
  } catch (error) {
    console.log(error)
    return handleControllerError(error, res)
  }
}
