import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { StatusError } from '../../../utils/responses/status-error'

export const updateSkill = async (
  req: ExtendedRequest,
  res: Response
): Promise<Response> => {
  try {
    const { skillId } = req.params
    const { description, type } = req.body
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
      values: [description, type, req.user.id, skillId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se encontro el skill: ${skillId} del usuario: ${req.user.id}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Skill modificada correctamente' })
  } catch (error) {
    return handleControllerError(error, res)
  }
}
