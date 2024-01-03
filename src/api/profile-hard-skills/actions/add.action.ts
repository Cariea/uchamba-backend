import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { getHSInsertionArrays } from '../_utils/get-hs-insertion-arrays'

export const addProfileHardSkills = async (
  req: ExtendedRequest,
  res: Response
): Promise<Response | undefined> => {
  try {
    const userId: number = req.user.id

    const insertion = await getHSInsertionArrays(userId, req.body)

    if (insertion.featured.length === 0 && insertion.personal.length === 0) {
      return res.status(STATUS.BAD_REQUEST).json({ message: 'Las habilidades duras ingresadas ya existen' })
    }

    for (const item of insertion.featured) {
      await pool.query({
        text: `
          INSERT INTO users_hard_skills (
            user_id,
            hard_skill_id
          ) VALUES ($1, $2)
        `,
        values: [userId, item]
      })
    }

    for (const item of insertion.personal) {
      await pool.query({
        text: `
          INSERT INTO personal_hard_skills (
            user_id,
            name
          ) VALUES ($1, $2)
        `,
        values: [userId, item]
      })
    }

    return res.status(STATUS.CREATED).json({ message: 'Habilidades duras añadidas correctamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
