import { Request, Response } from 'express'
import { pool } from '../../../database'
import { DEFAULT_PAGE, STATUS } from '../../../utils/constants'
import { PaginateSettings, paginatedItemsResponse } from '../../../utils/responses'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { getDailyRandomSeed } from '../_utils/get-daily-random-seed'
import { getUserCatalogueInfo } from '../_utils/get-user-catalogue-info'
import { validateFilters } from '../_utils/validateFilters'
import { findFilterUsers } from '../_utils/findFilterUsers'

export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { page = DEFAULT_PAGE.page, size = DEFAULT_PAGE.size } = req.query

  const validFilters = validateFilters(req.query)

  try {
    let carry = ''
    let offset = (Number(page) - 1) * Number(size)

    if (Number(page) < 1) {
      offset = 0
    }

    await pool.query({
      text: 'SELECT SETSEED($1)',
      values: [getDailyRandomSeed()]
    })

    carry = await findFilterUsers(validFilters, req)

    const { rows } = await pool.query({
      text: `
        SELECT COUNT(*)
        FROM users
        WHERE user_id IN (${carry})
      `
    })

    const { rows: response } = await pool.query({
      text: `
        SELECT user_id
        FROM users
        WHERE user_id IN (${carry})
        LIMIT $1 OFFSET $2
      `,
      values: [size, offset]
    })

    const finalItemsResponse = await Promise.all(
      response.map(async user => await getUserCatalogueInfo(user.user_id))
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
