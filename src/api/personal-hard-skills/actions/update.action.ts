import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { StatusError } from '../../../utils/responses/status-error'

export const updatePersonalHardSkill = async (
  req: ExtendedRequest,
  res: Response
): Promise<Response> => {
  try {
    const { phardSkillId } = req.params
    const { name } = req.body
    const response = await pool.query({
      text: `
        UPDATE personal_hard_skills
        SET 
          name = $1
        WHERE
          user_id = $2 AND
          phard_skill_id = $3
      `,
      values: [name, req.user.id, phardSkillId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se encontro el skill: ${phardSkillId} del usuario: ${req.user.id as number}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Skill modificada correctamente' })
  } catch (error) {
    return handleControllerError(error, res)
  }
}
