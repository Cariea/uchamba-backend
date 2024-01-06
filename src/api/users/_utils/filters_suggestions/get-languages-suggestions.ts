import { pool } from '../../../../database'
import { queryConstructor } from './query-constructor'

export async function getLanguagesSuggestions (
  validFilters: Array<{ [key: string]: string }>
): Promise<any[]> {
  try {
    const carry = queryConstructor(validFilters, 'languages')

    const languageQuery = `
      WITH AllLevels AS (
        SELECT
          language_id,
          level
        FROM (
          SELECT DISTINCT
            language_id,
            unnest(ARRAY['Native', 'C2', 'C1', 'B2', 'B1', 'A2', 'A1']::dom_proficiency_level[]) AS level
          FROM users_languages
        ) AS levels
      )
      SELECT
        al.language_id AS id,
        languages.name,
        al.level AS proficient_level,
        COALESCE(SUM(COUNT(ul.user_id)) OVER (
          PARTITION BY al.language_id
          ORDER BY al.level DESC ROWS BETWEEN UNBOUNDED PRECEDING AND
          CURRENT ROW
        ), 0) AS total
      FROM AllLevels al
      LEFT JOIN users_languages ul ON 
        al.language_id = ul.language_id AND 
        al.level::text = ul.proficient_level::text
      INNER JOIN languages ON
        al.language_id = languages.language_id
      WHERE ul.user_id IN (${carry})
      GROUP BY al.language_id, languages.name, al.level
      ORDER BY
        total DESC,
        al.language_id ASC,
        CASE al.level
          WHEN 'Native' THEN 1
          WHEN 'C2' THEN 2
          WHEN 'C1' THEN 3
          WHEN 'B2' THEN 4
          WHEN 'B1' THEN 5
          WHEN 'A2' THEN 6
          WHEN 'A1' THEN 7
      END;
    `

    const { rows: languagesSuggestions } = await pool.query({
      text: languageQuery
    })

    return languagesSuggestions
  } catch (error) {
    console.log(error)
    return []
  }
}
