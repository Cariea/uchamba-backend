import { Request } from 'express'
import { pool } from '../../../../database'
import { queryConstructor } from './query-constructor'

export async function getCareersSuggestions (
  req: Request,
  validFilters: Array<{ [key: string]: string }>
): Promise<any[]> {
  try {
    const carry = queryConstructor(req, validFilters, 'careers')

    const { rows: careersSuggestions } = await pool.query({
      text: `
        SELECT
          users_ustudies.ucareer_id AS id,
          ucareers.name,
          COUNT(*) AS total
        FROM users_ustudies
        INNER JOIN ucareers ON
          users_ustudies.ucareer_id = ucareers.ucareer_id
        WHERE users_ustudies.user_id IN (${carry})
        GROUP BY users_ustudies.ucareer_id, ucareers.name
        ORDER BY users_ustudies.ucareer_id ASC
      `
    })

    return careersSuggestions
  } catch (error) {
    return []
  }
}
