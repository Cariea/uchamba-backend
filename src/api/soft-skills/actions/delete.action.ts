import { Response, Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { StatusError } from '../../../utils/responses/status-error'

export const deleteSoftSkill = async (
  req: Request, res: Response
): Promise<Response | undefined> => {
  try {
    const { softSkillId } = req.params
    const response = await pool.query({
      text: `
        DELETE
        FROM soft_skills
        WHERE soft_skill_id = $1
      `,
      values: [softSkillId]
    })

    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el skill de id: ${softSkillId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Skill eliminado correctamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
