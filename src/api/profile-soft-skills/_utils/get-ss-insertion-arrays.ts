import { pool } from '../../../database'
import { getForInsertionItemsArray, getSkillOccurrenceArray, removeDuplicates } from '../../../utils/get-occurence-array'

export async function getSSInsertionArrays (userId: number, body: string[]): Promise<any> {
  const { rows: featuredSoftSkills } = await pool.query({
    text: `
    SELECT
      soft_skill_id AS id,
      name
    FROM soft_skills
  `
  })

  const { rows: userSoftSkills } = await pool.query({
    text: `
    SELECT
      ss.soft_skill_id,
      ss.name
    FROM
      users_soft_skills AS uss,
      soft_skills AS ss
    WHERE
      uss.user_id = $1 AND
      uss.soft_skill_id = ss.soft_skill_id
  `,
    values: [userId]
  })

  const { rows: personalSoftSkills } = await pool.query({
    text: `
    SELECT
      psoft_skill_id,
      name
    FROM personal_soft_skills
    WHERE
      user_id = $1
  `,
    values: [userId]
  })

  // Featured
  const userHardSkillsArray = userSoftSkills.map(item => item.soft_skill_id)
  const inputFeaturedOccurrences = getSkillOccurrenceArray(featuredSoftSkills, body, 'id')
  const featuredInsertion = removeDuplicates(getForInsertionItemsArray(inputFeaturedOccurrences, userHardSkillsArray))

  // Personal
  const onlyFeatured = featuredSoftSkills.map(item => item.name)
  const onlyPersonal = getForInsertionItemsArray(body, onlyFeatured)
  const userPSoftSkillsArray = personalSoftSkills.map(item => item.name)
  const personalInsertion = removeDuplicates(getForInsertionItemsArray(onlyPersonal, userPSoftSkillsArray))

  const forInsertion = {
    featured: featuredInsertion,
    personal: personalInsertion
  }

  return forInsertion
}
