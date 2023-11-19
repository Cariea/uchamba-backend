import { Request, Response } from 'express'
import { pool } from '../../../database'
import { DEFAULT_PAGE, STATUS } from '../../../utils/constants'
import { PaginateSettings, paginatedItemsResponse } from '../../../utils/responses'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import camelizeObject from '../../../utils/camelizeObject'

export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { page = DEFAULT_PAGE.page, size = DEFAULT_PAGE.size } = req.query

  try {
    let offset = (Number(page) - 1) * Number(size)

    if (Number(page) < 1) {
      offset = 0
    }

    const { rows } = await pool.query({
      text: `
        SELECT COUNT(*) 
        FROM users
      `
    })

    const { rows: response } = await pool.query({
      text: `
        SELECT
          user_id,
          name,
          email,
          TO_CHAR(created_at, 'YYYY-MM-DD') AS created_at,
          TO_CHAR(updated_at, 'YYYY-MM-DD') AS updated_at
        FROM 
          users
        ORDER BY user_id ASC
        LIMIT $1 OFFSET $2
      `,
      values: [size, offset]
    })

    const pagination: PaginateSettings = {
      total: Number(rows[0].count),
      page: Number(page),
      perPage: Number(size)
    }

    return paginatedItemsResponse(res, STATUS.OK, camelizeObject(response) as Array<Record<string, any>>, pagination)
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
