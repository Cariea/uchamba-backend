import { Request, Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { StatusError } from '../../../utils/responses/status-error'

export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { aboutMe, phoneNumber, residenceAddress } = req.body
    const { userId } = req.params
    const response = await pool.query({
      text: `
        UPDATE users
        SET 
          about_me = $1,
          phone_number = $2,
          residence_address = $3
        WHERE
          user_id = $4
      `,
      values: [aboutMe, phoneNumber, residenceAddress, userId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se encontro el usuario de id: ${userId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Usuario modificado correctamente' })
  } catch (error) {
    console.log(error)
    return handleControllerError(error, res)
  }
}
