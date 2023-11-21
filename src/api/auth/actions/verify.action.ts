import { Response, Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { StatusError } from '../../../utils/responses/status-error'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import camelizeObject from '../../../utils/camelizeObject'

export const verifyAccount = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const { confirmationCode, email } = req.body
    const verifyData = [email, confirmationCode]
    // Verficar la existencia del usuario y del codigo
    const { rows } = await pool.query({
      text: `
        SELECT *
        FROM users
        WHERE email = $1
        AND confirmation_code = $2
      `,
      values: [verifyData[0], verifyData[1]]
    })
    if (rows.length === 0) {
      throw new StatusError({
        message: 'No se encuentra ese codigo asociado a esta cuenta',
        statusCode: STATUS.NOT_FOUND
      })
    }

    const response = await pool.query({
      text: `
        UPDATE users 
        SET is_verified = true
        WHERE email = $1
        AND confirmation_code = $2
        RETURNING
          user_id,
          email,
          name,
          is_verified
          `,
      values: [verifyData[0], verifyData[1]]
    })

    return res.status(STATUS.OK).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
