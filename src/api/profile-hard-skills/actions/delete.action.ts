import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { StatusError } from '../../../utils/responses/status-error'
import { regenerate } from '../../../utils/regenerate-cv/regenerate'

export const deleteProfileHardSkill = async (
  req: ExtendedRequest,
  res: Response
): Promise<Response | undefined> => {
  try {
    const { name } = req.params
    const userId: number = req.user.id

    const featuredDeletion = await pool.query({
      text: `
        DELETE FROM users_hard_skills
        WHERE
          user_id = $1 AND
          hard_skill_id IN (
            SELECT hard_skill_id
            FROM hard_skills
            WHERE name = $2
          )
      `,
      values: [userId, name]
    })

    const personalDeletion = await pool.query({
      text: `
        DELETE FROM personal_hard_skills
        WHERE 
          user_id = $1 AND
          name = $2
      `,
      values: [userId, name]
    })

    if (featuredDeletion.rowCount === 0 && personalDeletion.rowCount === 0) {
      throw new StatusError({
        message: `No se encontro la habilidad dura ${name} del usuario: ${userId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    regenerate()

    return res.status(STATUS.OK).json({ message: 'Habilidad Dura eliminada correctamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
