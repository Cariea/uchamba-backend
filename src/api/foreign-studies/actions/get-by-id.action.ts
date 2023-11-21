import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import camelizeObject from '../../../utils/camelizeObject'
import { StatusError } from '../../../utils/responses/status-error'

export const getForeignStudiesByUserId = async (
  req: ExtendedRequest, res: Response
): Promise<Response | undefined> => {
  try {
    const response = await pool.query({
      text: `
        SELECT
          user_id,
          foreign_study_id,
          name,
          university_name,
          degree,
          graduation_date,
          TO_CHAR(created_at, 'DD/MM/YYYY - HH12:MI AM') AS created_at
        FROM foreign_studies
        WHERE user_id = $1
      `,
      values: [req.user.id]
    })

    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${req.user.id as number} `,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json(camelizeObject(response.rows))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
