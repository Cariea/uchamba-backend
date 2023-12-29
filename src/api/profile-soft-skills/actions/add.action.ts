import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { getSSInsertionArrays } from '../_utils/get-ss-insertion-arrays'

export const addProfileSoftSkills = async (
  req: ExtendedRequest,
  res: Response
): Promise<Response | undefined> => {
  try {
    const userId: number = req.user.id

    const insertion = await getSSInsertionArrays(userId, req.body)

    if (insertion.featured.length === 0 && insertion.personal.length === 0) {
      return res.status(STATUS.BAD_REQUEST).json({ message: 'Las habilidades blandas ingresadas ya existen' })
    }

    for (const item of insertion.featured) {
      await pool.query({
        text: `
          INSERT INTO users_soft_skills (
            user_id,
            soft_skill_id
          ) VALUES ($1, $2)
        `,
        values: [userId, item]
      })
    }

    for (const item of insertion.personal) {
      await pool.query({
        text: `
          INSERT INTO personal_soft_skills (
            user_id,
            name
          ) VALUES ($1, $2)
        `,
        values: [userId, item]
      })
    }

    return res.status(STATUS.CREATED).json({ message: 'Habilidades blandas añadidas correctamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
