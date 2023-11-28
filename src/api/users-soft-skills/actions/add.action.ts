import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { StatusError } from '../../../utils/responses/status-error'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import camelizeObject from '../../../utils/camelizeObject'

export const addUserSoftSkill = async (
  req: ExtendedRequest,
  res: Response
): Promise<Response | undefined> => {
  try {
    const { softSkillId } = req.params
    const userId: number = req.user.id

    // Verficar la existencia del proyecto antes de crear
    const { rows } = await pool.query({
      text: `
        SELECT *
        FROM users_soft_skills
        WHERE user_id = $1
        AND soft_skill_id = $2
      `,
      values: [userId, softSkillId]
    })

    if (rows.length > 0) {
      throw new StatusError({
        message: 'Ya existe un registro con los mismos datos',
        statusCode: STATUS.BAD_REQUEST
      })
    }
    // --

    const response = await pool.query({
      text: `
        INSERT INTO users_soft_skills (
          user_id,
          soft_skill_id
        )
        VALUES ($1, $2)
        RETURNING
          user_id,
          soft_skill_id
      `,
      values: [userId, softSkillId]
    })

    return res.status(STATUS.CREATED).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

// TO_CHAR(created_at, 'YYYY-MM-DD') AS created_at
