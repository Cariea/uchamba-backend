import { pool } from '../../../database'
import { getForInsertionItemsArray, getSkillOccurrenceArray, removeDuplicates } from '../../../utils/get-occurence-array'

export async function getHSInsertionArrays (userId: number, body: string[]): Promise<any> {
  const { rows: featuredHardSkills } = await pool.query({
    text: `
    SELECT
      hard_skill_id AS id,
      name
    FROM hard_skills
  `
  })

  const { rows: userHardSkills } = await pool.query({
    text: `
    SELECT
      hs.hard_skill_id,
      hs.name
    FROM
      users_hard_skills AS uhs,
      hard_skills AS hs
    WHERE
      uhs.user_id = $1 AND
      uhs.hard_skill_id = hs.hard_skill_id
  `,
    values: [userId]
  })

  const { rows: personalHardSkills } = await pool.query({
    text: `
    SELECT
      phard_skill_id,
      name
    FROM personal_hard_skills
    WHERE
      user_id = $1
  `,
    values: [userId]
  })

  // Featured
  const userHardSkillsArray = userHardSkills.map(item => item.hard_skill_id)
  const inputFeaturedOccurrences = getSkillOccurrenceArray(featuredHardSkills, body, 'id')
  const featuredInsertion = removeDuplicates(getForInsertionItemsArray(inputFeaturedOccurrences, userHardSkillsArray))

  // Personal
  const onlyFeatured = featuredHardSkills.map(item => item.name)
  const onlyPersonal = getForInsertionItemsArray(body, onlyFeatured)
  const userPHardSkillsArray = personalHardSkills.map(item => item.name)
  const personalInsertion = removeDuplicates(getForInsertionItemsArray(onlyPersonal, userPHardSkillsArray))

  const forInsertion = {
    featured: featuredInsertion,
    personal: personalInsertion
  }

  return forInsertion
}
