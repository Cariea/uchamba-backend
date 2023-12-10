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
    const { degree, graduationYear } = req.body
    const formattedDate = `${graduationYear as string}-01-01`

    const response = await pool.query({
      text: `
        INSERT INTO users_ustudies (
          user_id,
          ucareer_id,
          degree,
          graduation_year
        ) 
        VALUES ($1,$2,$3,$4)
        RETURNING
          user_id,
          ucareer_id,
          degree,
          TO_CHAR(graduation_year, 'YYYY') AS graduation_year,
          TO_CHAR(created_at, 'DD/MM/YYYY') AS created_at
      `,
      values: [req.user.id, ucareerId, degree, formattedDate]
    })

    return res.status(STATUS.OK).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    console.log(error)
    return handleControllerError(error, res)
  }
}
