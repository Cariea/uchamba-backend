import { Response, Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import camelizeObject from '../../../utils/camelizeObject'
import { StatusError } from '../../../utils/responses/status-error'

export const getUserById = async (
  req: Request, res: Response
): Promise<Response | undefined> => {
  try {
    const { userId } = req.params
    const response = await pool.query({
      text: `
        SELECT
          user_id,
          name,
          email,
          about_me,
          phone_number,
          residence_address,
          role,
          is_verified,
          TO_CHAR(created_at, 'YYYY-MM-DD') AS created_at,
          TO_CHAR(updated_at, 'YYYY-MM-DD') AS updated_at
        FROM users
        WHERE user_id = $1
      `,
      values: [userId]
    })

    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${userId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    console.error(error)
    return handleControllerError(error, res)
  }
}
