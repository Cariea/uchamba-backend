import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { StatusError } from '../../../utils/responses/status-error'
import { QueryResult } from 'pg'

export const deleteSkill = async (
  req: ExtendedRequest, res: Response
): Promise<Response | undefined> => {
  try {
    const { skillId } = req.params
    const response: QueryResult = await pool.query({
      text: `
        DELETE
        FROM skills
        WHERE user_id = $1 and skill_id = $2
      `,
      values: [req.user.id, skillId]
    })

    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se encontro el skill: ${skillId} del usuario: ${req.user.id}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Skill eliminado correctamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
