import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'

export const changeStatus = async (
  req: ExtendedRequest,
  res: Response
): Promise<Response | undefined> => {
  try {
    const userId: number = req.user.id
    const rows = await pool.query({
      text: `
        UPDATE users
        SET 
          is_active = NOT is_active
        WHERE
          user_id = $1
        RETURNING
          is_active
      `,
      values: [userId]
    })

    return res.status(STATUS.OK).json({
      message: ((rows.rows[0].is_active === true) ? 'Usuario activado correctamente' : 'Usuario desactivado correctamente')
    })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
