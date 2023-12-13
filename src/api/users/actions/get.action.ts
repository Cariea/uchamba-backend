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
          user_id,
          name,
          email,
          role,
          TO_CHAR(created_at, 'DD/MM/YYYY - HH12:MI AM') AS created_at,
          TO_CHAR(updated_at, 'DD/MM/YYYY - HH12:MI AM') AS updated_at
        FROM 
          users
        WHERE
          is_active = TRUE
        ORDER BY random()
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

function getDailyRandomSeed (): number {
  const today = new Date()

  const startOfYear = new Date(today.getFullYear(), 0, 0)
  const dayOfYear = Math.floor((+today - +startOfYear) / 86400000)

  const randomValue = Math.sin(dayOfYear * 0.1)

  const adjustedValue = randomValue

  return adjustedValue
}
