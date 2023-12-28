import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { getUserDetailed } from '../_utils/get-user-detailed'
import camelizeObject from '../../../utils/camelizeObject'
import { getCVInfo } from '../_utils/get-cv-info'

export const getMe = async (
  req: ExtendedRequest, res: Response
): Promise<Response | undefined> => {
  try {
    const { id: userId } = req.user

    const userDetailed = await getUserDetailed(userId)

    const { rows: userCvs } = await pool.query({
      text: `
        SELECT cv_id AS id
        FROM users_cvs
        WHERE user_id = $1
        ORDER BY cv_id ASC
      `,
      values: [userId]
    })

    const cvItemsResponse = []
    for (const cv of userCvs) {
      cvItemsResponse.push(await getCVInfo(cv.id))
    }

    const { rows: careersResponse } = await pool.query({
      text: `
        SELECT
          ucareer_id as career_id,
          name
        FROM ucareers
      `
    })

    return res.status(STATUS.OK).json({
      ...userDetailed,
      cvs: cvItemsResponse,
      appCareers: camelizeObject(careersResponse)
    })
  } catch (error: unknown) {
    console.log(error)
    return handleControllerError(error, res)
  }
}
