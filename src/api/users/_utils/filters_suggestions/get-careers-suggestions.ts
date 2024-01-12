import { pool } from '../../../../database'
import { Filters } from './Filters'
import { queryConstructor } from './query-constructor'

export async function getCareersSuggestions (
  filters: Filters
): Promise<any[]> {
  try {
    const carry = queryConstructor(filters, 'careers')

    let suggestionsQuery = `
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

    if (filters.searchInCV === 'true') {
      suggestionsQuery = `
        SELECT
          users_cvs.ucareer_id,
          ucareers.name,
          COUNT(*) AS total
        FROM users_cvs
        INNER JOIN ucareers ON
          users_cvs.ucareer_id = ucareers.ucareer_id
        WHERE users_ustudies.user_id IN (${carry})
        GROUP BY users_ustudies.ucareer_id, ucareers.name
        ORDER BY users_ustudies.ucareer_id ASC
      `
    }

    const { rows: careersSuggestions } = await pool.query({
      text: suggestionsQuery
    })

    return careersSuggestions
  } catch (error) {
    return []
  }
}
