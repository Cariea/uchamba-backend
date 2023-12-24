import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'

export const addPersonalLink = async (
  req: ExtendedRequest,
  res: Response
): Promise<Response> => {
  try {
    const { url } = req.body
    const response = await pool.query({
      text: `
        INSERT INTO personal_links (
          user_id,
          url
        )
        VALUES ($1, $2)
        RETURNING
          user_id,
          link_id,
          url,
          TO_CHAR(created_at, 'DD/MM/YYYY - HH12:MI AM') AS created_at,
          TO_CHAR(updated_at, 'DD/MM/YYYY - HH12:MI AM') AS updated_at
      `,
      values: [req.user.id, url]
    })
    return res.status(STATUS.OK).json(response.rows[0])
  } catch (error) {
    return handleControllerError(error, res)
  }
}
