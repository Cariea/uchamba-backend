import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { StatusError } from '../../../utils/responses/status-error'

export const deletePersonalSoftSkill = async (
  req: ExtendedRequest,
  res: Response
): Promise<Response | undefined> => {
  try {
    const { psoftSkillId } = req.params
    const response = await pool.query({
      text: `
        DELETE
        FROM personal_soft_skills
        WHERE user_id = $1 and psoft_skill_id = $2
      `,
      values: [req.user.id, psoftSkillId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se encontro el skill: ${psoftSkillId} del usuario: ${req.user.id as number}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Skill eliminado correctamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
