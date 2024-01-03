import { pool } from '../../../database'
import { SkillOccurrenceWithIndex, getOccurrenceArray } from '../../../utils/get-occurence-array'

interface InsertionArrays {
  featured: SkillOccurrenceWithIndex[]
  personal: SkillOccurrenceWithIndex[]
}

export async function getHSOccurrencesArrays (
  userId: number,
  body: string[]
): Promise<InsertionArrays> {
  const { rows: featuredHardSkills } = await pool.query({
    text: `
      SELECT
        uhs.hard_skill_id AS id,
        hs.name
      FROM users_hard_skills AS uhs
      INNER JOIN hard_skills AS hs ON
        uhs.hard_skill_id = hs.hard_skill_id
      WHERE uhs.user_id = $1
    `,
    values: [userId]
  })

  const { rows: personalHardSkills } = await pool.query({
    text: `
      SELECT
        phard_skill_id AS id,
        name
      FROM personal_hard_skills
      WHERE user_id = $1
    `,
    values: [userId]
  })

  const forInsertion: InsertionArrays = {
    featured: getOccurrenceArray(featuredHardSkills, body),
    personal: getOccurrenceArray(personalHardSkills, body)
  }

  return forInsertion
}
