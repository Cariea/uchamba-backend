import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'

export const addPersonalSoftSkill = async (
  req: ExtendedRequest,
  res: Response
): Promise<Response> => {
  try {
    const { name } = req.body
    const response = await pool.query({
      text: `
        INSERT INTO personal_soft_skills (
          user_id,
          name
        )
        VALUES ($1,$2)
        RETURNING
          user_id,
          psoft_skill_id,
          name,
          TO_CHAR(created_at, 'DD/MM/YYYY - HH12:MI AM') AS created_at
      `,
      values: [req.user.id, name]
    })
    return res.status(STATUS.OK).json(response.rows[0])
  } catch (error) {
    return handleControllerError(error, res)
  }
}
