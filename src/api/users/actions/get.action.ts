import { Request, Response } from 'express'
import { pool } from '../../../database'
import { DEFAULT_PAGE, STATUS } from '../../../utils/constants'
import {
  PaginateSettings,
  paginatedItemsResponseWithSuggestions
} from '../../../utils/responses'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { getDailyRandomSeed } from '../_utils/get-daily-random-seed'
import { getUserCatalogueInfo } from '../_utils/get-user-catalogue-info'
import { getRequestedFilters } from '../_utils/filters_suggestions/get-requested-filters'
import { getFiltersSuggestion } from '../_utils/filters_suggestions'
import camelizeObject from '../../../utils/camelizeObject'
import { queryConstructor } from '../_utils/filters_suggestions/query-constructor'

export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { page = DEFAULT_PAGE.page, size = DEFAULT_PAGE.size } = req.query

  const filters = getRequestedFilters(req)

  try {
    let offset = (Number(page) - 1) * Number(size)

    if (Number(page) < 1) {
      offset = 0
    }

    const filteredQuery = queryConstructor(filters, undefined)
    console.log(filteredQuery)

    const { rows } = await pool.query({
      text: `
        SELECT COUNT(*)
        FROM users
        WHERE user_id IN (${filteredQuery})
      `
    })

    await pool.query({
      text: 'SELECT SETSEED($1)',
      values: [getDailyRandomSeed()]
    })

    const { rows: response } = await pool.query({
      text: `
        ${filteredQuery}
        LIMIT $1 OFFSET $2
      `,
      values: [size, offset]
    })

    const suggestions = await getFiltersSuggestion(filters)

    const finalItemsResponse = await Promise.all(
      response.map(async user => await getUserCatalogueInfo(user.user_id))
    )

    const pagination: PaginateSettings = {
      total: Number(rows[0].count),
      page: Number(page),
      perPage: Number(size)
    }

    const camelizedSuggestions = camelizeObject(suggestions)

    return paginatedItemsResponseWithSuggestions(
      res,
      STATUS.OK,
      pagination,
      camelizedSuggestions,
      finalItemsResponse
    )
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
