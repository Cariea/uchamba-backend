import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { StatusError } from '../../../utils/responses/status-error'

export const deleteUserHardSkill = async (
  req: ExtendedRequest, res: Response
): Promise<Response | undefined> => {
  try {
    const { hardSkillId } = req.params
    const userId: number = req.user.id
    const response = await pool.query({
      text: `
        DELETE
        FROM users_hard_skills
        WHERE 
          user_id = $1 AND 
          hard_skill_id = $2
      `,
      values: [userId, hardSkillId]
    })

    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro con el id de usuario: ${userId} y el id de habilidad dura: ${hardSkillId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Relación entre usuario y habilidad dura eliminada correctamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
