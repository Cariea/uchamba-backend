import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { StatusError } from '../../../utils/responses/status-error'

export const updatePersonalSoftSkill = async (
  req: ExtendedRequest,
  res: Response
): Promise<Response> => {
  try {
    const { psoftSkillId } = req.params
    const { name } = req.body
    const response = await pool.query({
      text: `
        UPDATE personal_soft_skills
        SET 
          name = $1
        WHERE
          user_id = $2 AND
          psoft_skill_id = $3
      `,
      values: [name, req.user.id, psoftSkillId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se encontro el skill: ${psoftSkillId} del usuario: ${req.user.id as number}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Skill modificada correctamente' })
  } catch (error) {
    return handleControllerError(error, res)
  }
}
