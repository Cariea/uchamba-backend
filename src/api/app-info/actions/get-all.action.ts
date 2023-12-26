import { Response, Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import camelizeObject from '../../../utils/camelizeObject'

export const getAllEducationInfo = async (
  _req: Request, res: Response
): Promise<Response | undefined> => {
  try {
    const { rows: hardSkills } = await pool.query({
      text: `
        SELECT
          hard_skill_id,
          name
        FROM hard_skills
      `
    })

    const { rows: softSkills } = await pool.query({
      text: `
        SELECT
          soft_skill_id,
          name
        FROM soft_skills
      `
    })

    const { rows: languages } = await pool.query({
      text: `
        SELECT
          language_id,
          name
        FROM languages
      `
    })

    return res.status(STATUS.OK).json({
      languages: camelizeObject(languages),
      hard: camelizeObject(hardSkills),
      soft: camelizeObject(softSkills)
    })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
