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
      hard_skill_id AS id,
      name
    FROM hard_skills
  `
  })

  const { rows: personalHardSkills } = await pool.query({
    text: `
    SELECT
      phard_skill_id AS id,
      name
    FROM personal_hard_skills
    WHERE
      user_id = $1
  `,
    values: [userId]
  })

  const forInsertion: InsertionArrays = {
    featured: getOccurrenceArray(featuredHardSkills, body),
    personal: getOccurrenceArray(personalHardSkills, body)
  }

  return forInsertion
}
