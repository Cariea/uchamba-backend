import { Request, Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'

export const addSkill = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userId } = req.params
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
      values: [userId, description, type]
    })

    return res.status(STATUS.OK).json(response.rows[0])
  } catch (error) {
    return handleControllerError(error, res)
  }
}
