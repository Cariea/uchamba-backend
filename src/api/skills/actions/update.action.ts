import { Request, Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { StatusError } from '../../../utils/responses/status-error'

export const updateSkill = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { description, type } = req.body
    const { userId, skillId } = req.params
    const response = await pool.query({
      text: `
        UPDATE skills
        SET 
          description = $1,
          type = $2
        WHERE
          user_id = $3 AND
          skill_id = $4
      `,
      values: [description, type, userId, skillId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se encontro el skill: ${skillId} del usuario: ${userId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Skill modificada correctamente' })
  } catch (error) {
    return handleControllerError(error, res)
  }
}
