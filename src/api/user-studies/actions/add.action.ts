import { Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import camelizeObject from '../../../utils/camelizeObject'
import { ExtendedRequest } from '../../../middlewares/auth'

export const addUserUstudys = async (
  req: ExtendedRequest, res: Response
): Promise<Response | undefined> => {
  try {
    const { ucareerId } = req.params
    const { degree, graduationDate } = req.body
    const response = await pool.query({
      text: `
        INSERT INTO users_ustudies (
          user_id,
          ucareer_id,
          degree,
          graduation_date
        ) 
        VALUES ($1,$2,$3,$4)
        RETURNING
          user_id,
          ucareer_id,
          degree,
          graduation_date,
          TO_CHAR(created_at, 'DD/MM/YYYY') AS created_at
      `,
      values: [req.user.id, ucareerId, degree, graduationDate]
    })

    return res.status(STATUS.OK).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    console.log(error)
    return handleControllerError(error, res)
  }
}
