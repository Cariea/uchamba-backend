import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { StatusError } from '../../../utils/responses/status-error'

export const deleteUserSoftSkill = async (
  req: ExtendedRequest, res: Response
): Promise<Response | undefined> => {
  try {
    const { softSkillId } = req.params
    const userId: number = req.user.id
    const response = await pool.query({
      text: `
        DELETE
        FROM users_soft_skills
        WHERE 
          user_id = $1 AND 
          soft_skill_id = $2
      `,
      values: [userId, softSkillId]
    })

    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro con el id de usuario: ${userId} y el id de habilidad blanda: ${softSkillId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Relación entre usuario y habilidad blanda eliminada correctamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
