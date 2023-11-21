import { Response, Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { StatusError } from '../../../utils/responses/status-error'
import { QueryResult } from 'pg'

export const deleteSkill = async (
  req: Request, res: Response
): Promise<Response | undefined> => {
  try {
    const { userId, skillId } = req.params
    const response: QueryResult = await pool.query({
      text: `
        DELETE
        FROM skills
        WHERE user_id = $1 and skill_id = $2
      `,
      values: [userId, skillId]
    })

    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se encontro el skill: ${skillId} del usuario: ${userId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Skill eliminado correctamente' })
  } catch (error: unknown) {
    console.error(error)
    return handleControllerError(error, res)
  }
}
