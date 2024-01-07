import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { StatusError } from '../../../utils/responses/status-error'
import { regenerate } from '../../../utils/regenerate-cv/regenerate'

export const updateUser = async (
  req: ExtendedRequest,
  res: Response
): Promise<Response> => {
  try {
    const { aboutMe, country, state, city, residenceAddress } = req.body
    const userId: number = req.user.id
    const response = await pool.query({
      text: `
        UPDATE users
        SET 
          about_me = $1,
          country = $2,
          state = $3,
          city = $4,
          residence_address = $5
        WHERE
          user_id = $6
      `,
      values: [aboutMe, country, state, city, residenceAddress, userId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se encontro el usuario de id: ${userId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    regenerate()

    return res.status(STATUS.OK).json({ message: 'Usuario modificado correctamente' })
  } catch (error) {
    return handleControllerError(error, res)
  }
}
