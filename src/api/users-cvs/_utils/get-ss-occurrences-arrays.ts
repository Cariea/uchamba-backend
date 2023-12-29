import { pool } from '../../../database'
import { SkillOccurrenceWithIndex, getOccurrenceArray } from '../../../utils/get-occurence-array'

interface InsertionArrays {
  featured: SkillOccurrenceWithIndex[]
  personal: SkillOccurrenceWithIndex[]
}

export async function getSSOccurrencesArrays (
  userId: number,
  body: string[]
): Promise<InsertionArrays> {
  const { rows: featuredSoftSkills } = await pool.query({
    text: `
    SELECT
      soft_skill_id AS id,
      name
    FROM soft_skills
  `
  })

  const { rows: personalSoftSkills } = await pool.query({
    text: `
    SELECT
      psoft_skill_id AS id,
      name
    FROM personal_soft_skills
    WHERE
      user_id = $1
  `,
    values: [userId]
  })

  const forInsertion: InsertionArrays = {
    featured: getOccurrenceArray(featuredSoftSkills, body),
    personal: getOccurrenceArray(personalSoftSkills, body)
  }

  return forInsertion
}
