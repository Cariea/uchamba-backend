import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { StatusError } from '../../../utils/responses/status-error'

export const updateUser = async (
  req: ExtendedRequest,
  res: Response
): Promise<Response> => {
  try {
    const { aboutMe, phoneNumber, country, state, city, residenceAddress } = req.body
    const userId = req.user.id as number
    const response = await pool.query({
      text: `
        UPDATE users
        SET 
          about_me = $1,
          phone_number = $2,
          country = $3,
          state = $4,
          city = $5,
          residence_address = $6
        WHERE
          user_id = $7
      `,
      values: [aboutMe, phoneNumber, country, state, city, residenceAddress, userId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se encontro el usuario de id: ${userId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Usuario modificado correctamente' })
  } catch (error) {
    return handleControllerError(error, res)
  }
}
