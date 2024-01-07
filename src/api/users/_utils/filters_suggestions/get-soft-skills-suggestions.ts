import { Request } from 'express'
import { pool } from '../../../../database'
import { queryConstructor } from './query-constructor'

export async function getSoftSkillsSuggestions (
  req: Request,
  validFilters: Array<{ [key: string]: string }>
): Promise<any[]> {
  try {
    const carry = queryConstructor(req, validFilters, 'sskills')

    const { rows: softSkillsSuggestions } = await pool.query({
      text: `
        SELECT
          users_soft_skills.soft_skill_id AS id,
          soft_skills.name,
        COUNT(*) AS total
        FROM users_soft_skills
        INNER JOIN soft_skills ON
          users_soft_skills.soft_skill_id = soft_skills.soft_skill_id
        WHERE users_soft_skills.user_id IN (${carry})
        GROUP BY users_soft_skills.soft_skill_id, soft_skills.name
        ORDER BY soft_skills.name ASC
      `
    })

    return softSkillsSuggestions
  } catch (error) {
    console.log(error)
    return []
  }
}
