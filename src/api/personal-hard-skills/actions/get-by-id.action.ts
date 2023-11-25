import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import camelizeObject from '../../../utils/camelizeObject'
import { StatusError } from '../../../utils/responses/status-error'

export const getUserSkillByUserAndSkillId = async (
  req: ExtendedRequest, res: Response
): Promise<Response | undefined> => {
  try {
    const { skillId } = req.params
    const response = await pool.query({
      text: `
        SELECT
          user_id,
          phard_skill_id,
          name,
          TO_CHAR(created_at, 'DD/MM/YYYY - HH12:MI AM') AS created_at,
          TO_CHAR(updated_at, 'DD/MM/YYYY - HH12:MI AM') AS updated_at
        FROM personal_hard_skills
        WHERE 
          user_id = $1 AND
          phard_skill_id = $2
      `,
      values: [req.user.id, skillId]
    })

    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se encontraron la habilidad dura de id: ${skillId} para el usuario usuario: ${req.user.id as number}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json(camelizeObject(response.rows))
  } catch (error: unknown) {
    console.log(error)
    return handleControllerError(error, res)
  }
}
