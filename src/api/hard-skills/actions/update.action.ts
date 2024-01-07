import { Request, Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { StatusError } from '../../../utils/responses/status-error'
import { regenerate } from '../../../utils/regenerate-cv/regenerate'

export const updateHardSkill = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name } = req.body
    const { hardSkillId } = req.params
    const response = await pool.query({
      text: `
        UPDATE hard_skills
        SET 
          name = $1
        WHERE
          hard_skill_id = $2
      `,
      values: [name, hardSkillId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se encontro el Skill de id: ${hardSkillId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    regenerate()

    return res.status(STATUS.OK).json({ message: 'Skill modificado correctamente' })
  } catch (error) {
    return handleControllerError(error, res)
  }
}
