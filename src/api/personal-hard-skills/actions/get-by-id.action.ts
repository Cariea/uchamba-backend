import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import camelizeObject from '../../../utils/camelizeObject'
import { StatusError } from '../../../utils/responses/status-error'

export const getSkillByUserId = async (
  req: ExtendedRequest, res: Response
): Promise<Response | undefined> => {
  try {
    const response = await pool.query({
      text: `
        SELECT
          user_id,
          phard_skill_id,
          name,
          TO_CHAR(created_at, 'DD/MM/YYYY - HH12:MI AM') AS created_at,
          TO_CHAR(updated_at, 'DD/MM/YYYY - HH12:MI AM') AS updated_at
        FROM personal_hard_skills
        WHERE user_id = $1
      `,
      values: [req.user.id]
    })

    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se encontraron hard skills personales para el usuario usuario: ${req.user.id as number}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json(camelizeObject(response.rows))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
