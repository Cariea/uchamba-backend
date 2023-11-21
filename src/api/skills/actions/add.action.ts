import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'

export const addSkill = async (
  req: ExtendedRequest,
  res: Response
): Promise<Response> => {
  try {
    const { description, type } = req.body
    const response = await pool.query({
      text: `
        INSERT INTO skills (
          user_id,
          description,
          type
        )
        VALUES ($1,$2,$3)
        RETURNING
          user_id,
          description,
          type,
          TO_CHAR(created_at, 'DD/MM/YYYY - HH12:MI AM') AS created_at
      `,
      values: [req.user.id, description, type]
    })

    return res.status(STATUS.OK).json(response.rows[0])
  } catch (error) {
    return handleControllerError(error, res)
  }
}
