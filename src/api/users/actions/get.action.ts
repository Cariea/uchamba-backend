/* eslint-disable @typescript-eslint/promise-function-async */
import { Request, Response } from 'express'
import { pool } from '../../../database'
import { DEFAULT_PAGE, STATUS } from '../../../utils/constants'
import { PaginateSettings, paginatedItemsResponse } from '../../../utils/responses'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
// import camelizeObject from '../../../utils/camelizeObject'
import { getDailyRandomSeed } from '../_utils/get-daily-random-seed'
import { getUserCatalogueInfo } from '../_utils/get-user-catalogue-info'

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
        WHERE is_active = TRUE
      `
    })

    await pool.query({
      text: 'SELECT SETSEED($1)',
      values: [getDailyRandomSeed()]
    })

    const { rows: response } = await pool.query({
      text: `
        SELECT
          user_id
        FROM users
        WHERE
          is_active = TRUE
        ORDER BY random()
        LIMIT $1 OFFSET $2
      `,
      values: [size, offset]
    })

    const finalItemsResponse = await Promise.all(
      response.map(user => getUserCatalogueInfo(user.user_id))
    )

    const pagination: PaginateSettings = {
      total: Number(rows[0].count),
      page: Number(page),
      perPage: Number(size)
    }

    return paginatedItemsResponse(res, STATUS.OK, finalItemsResponse, pagination)
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
