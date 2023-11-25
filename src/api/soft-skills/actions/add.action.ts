import { Response, Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import camelizeObject from '../../../utils/camelizeObject'

export const addSoftSkill = async (
  req: Request, res: Response
): Promise<Response | undefined> => {
  try {
    const { name } = req.body
    const response = await pool.query({
      text: `
        INSERT INTO soft_skills (
          name
        ) 
        VALUES ($1)
        RETURNING
          soft_skill_id,
          name,
          TO_CHAR(created_at, 'DD/MM/YYYY - HH12:MI AM') AS created_at
      `,
      values: [name]
    })

    return res.status(STATUS.OK).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
