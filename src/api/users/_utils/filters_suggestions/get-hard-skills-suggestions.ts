import { pool } from '../../../../database'
import { Filters } from './Filters'
import { queryConstructor } from './query-constructor'

export async function getHardSkillsSuggestions (
  filters: Filters
): Promise<any[]> {
  try {
    const carry = queryConstructor(filters, 'hskills')

    const { rows: hardSkillsSuggestions } = await pool.query({
      text: `
        SELECT
          users_hard_skills.hard_skill_id AS id,
          hard_skills.name,
          COUNT(*) AS total
        FROM users_hard_skills
        INNER JOIN hard_skills ON
          users_hard_skills.hard_skill_id = hard_skills.hard_skill_id
        WHERE users_hard_skills.user_id IN (${carry})
        GROUP BY users_hard_skills.hard_skill_id, hard_skills.name
        ORDER BY hard_skills.name
      `
    })

    return hardSkillsSuggestions
  } catch (error) {
    return []
  }
}
