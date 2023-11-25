import { Response, Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { StatusError } from '../../../utils/responses/status-error'

export const deleteHardSkill = async (
  req: Request, res: Response
): Promise<Response | undefined> => {
  try {
    const { hardSkillId } = req.params
    const response = await pool.query({
      text: `
        DELETE
        FROM hard_skills
        WHERE hard_skill_id = $1
      `,
      values: [hardSkillId]
    })

    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el skill de id: ${hardSkillId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Skill eliminado correctamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
