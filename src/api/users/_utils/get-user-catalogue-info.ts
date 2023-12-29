import { pool } from '../../../database'
import camelizeObject from '../../../utils/camelizeObject'

export async function getUserCatalogueInfo (userId: string): Promise<any> {
  const userQuery = pool.query({
    text: `
      SELECT
        user_id,
        name,
        about_me,
        country,
        state,
        city
      FROM users
      WHERE user_id = $1
    `,
    values: [userId]
  })

  const languagesQuery = pool.query({
    text: `
      SELECT
        l.name,
        ul.proficient_level
      FROM
        users_languages AS ul,
        languages AS l
      WHERE
        ul.user_id = $1 AND
        ul.language_id = l.language_id
      ORDER BY l.language_id ASC
    `,
    values: [userId]
  })

  const userHardSkillsQuery = pool.query({
    text: `
      SELECT hs.name
      FROM 
        users_hard_skills AS uhs,
        hard_skills AS hs
      WHERE 
        uhs.user_id = $1 AND
        uhs.hard_skill_id = hs.hard_skill_id
      ORDER BY hs.hard_skill_id ASC
    `,
    values: [userId]
  })

  const personalHardSkillsQuery = pool.query({
    text: `
      SELECT name
      FROM personal_hard_skills
      WHERE user_id = $1
      ORDER BY phard_skill_id ASC
    `,
    values: [userId]
  })

  const userSoftSkillsQuery = pool.query({
    text: `
      SELECT ss.name
      FROM 
        users_soft_skills AS uss,
        soft_skills AS ss
      WHERE 
        uss.user_id = $1 AND
        uss.soft_skill_id = ss.soft_skill_id
      ORDER BY ss.soft_skill_id ASC
    `,
    values: [userId]
  })

  const personalSoftSkillsQuery = pool.query({
    text: `
      SELECT name
      FROM personal_soft_skills
      WHERE user_id = $1
      ORDER BY psoft_skill_id ASC
    `,
    values: [userId]
  })

  const userUStudiesQuery = pool.query({
    text: `
      SELECT
        uc.name
      FROM
        users_ustudies AS uus,
        ucareers AS uc
      WHERE
        uus.user_id = $1 AND
        uus.ucareer_id = uc.ucareer_id
      ORDER BY uc.ucareer_id ASC
    `,
    values: [userId]
  })

  const queryResponses = await Promise.all([
    userQuery,
    languagesQuery,
    userHardSkillsQuery,
    personalHardSkillsQuery,
    userSoftSkillsQuery,
    personalSoftSkillsQuery,
    userUStudiesQuery
  ])

  const { rows: user } = queryResponses[0]
  const { rows: languages } = queryResponses[1]
  const { rows: userHardSkills } = queryResponses[2]
  const { rows: personalHardSkills } = queryResponses[3]
  const { rows: userSoftSkills } = queryResponses[4]
  const { rows: personalSoftSkills } = queryResponses[5]
  const { rows: userUStudies } = queryResponses[6]

  const userCatalogue = {
    ...camelizeObject(user[0]),
    languages: camelizeObject(languages),
    skills: {
      hard: [...userHardSkills, ...personalHardSkills].map(item => item.name),
      soft: [...userSoftSkills, ...personalSoftSkills].map(item => item.name)
    },
    education: userUStudies.map(item => item.name)
  }

  return userCatalogue
}
