import { Response, Request } from 'express'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { getUserDetailed } from '../_utils/get-user-detailed'
import camelizeObject from '../../../utils/camelizeObject'
import { pool } from '../../../database'

export const getUserById = async (
  req: Request, res: Response
): Promise<Response | undefined> => {
  try {
    const { userId } = req.params

    const userDetailed = await getUserDetailed(userId)

    const { rows: userCvs } = await pool.query({
      text: `
        SELECT
          uc.cv_id,
          uc.ucareer_id AS career_id,
          c.name AS career_name,
          uc.name,
          TO_CHAR(uc.updated_at, 'DD/MM/YYYY') AS created_at
        FROM users_cvs AS uc
        INNER JOIN ucareers AS c ON
          uc.ucareer_id = c.ucareer_id
        WHERE user_id = $1
        ORDER BY cv_id
      `,
      values: [userId]
    })

    return res.status(STATUS.OK).json({
      ...userDetailed,
      cvs: camelizeObject(userCvs)
    })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
