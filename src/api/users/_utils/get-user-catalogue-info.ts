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
      FROM users_languages AS ul
      INNER JOIN languages AS l ON
        ul.language_id = l.language_id
      WHERE ul.user_id = $1
      ORDER BY l.language_id ASC
    `,
    values: [userId]
  })

  const userHardSkillsQuery = pool.query({
    text: `
      SELECT hs.name
      FROM users_hard_skills AS uhs
      INNER JOIN hard_skills AS hs ON
        uhs.hard_skill_id = hs.hard_skill_id
      WHERE uhs.user_id = $1
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
      FROM users_soft_skills AS uss
      INNER JOIN soft_skills AS ss ON
        uss.soft_skill_id = ss.soft_skill_id
      WHERE uss.user_id = $1
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
      FROM users_ustudies AS uus
      INNER JOIN ucareers AS uc ON
        uus.ucareer_id = uc.ucareer_id
      WHERE uus.user_id = $1
      ORDER BY graduation_year DESC
    `,
    values: [userId]
  })

  const userCvsQuery = pool.query({
    text: `
      SELECT
        uc.cv_id,
        c.name AS career_name,
        uc.name,
        TO_CHAR(uc.updated_at, 'DD/MM/YYYY') AS updated_at
      FROM users_cvs AS uc
      INNER JOIN ucareers AS c ON
        c.ucareer_id = uc.ucareer_id
      WHERE user_id = $1
      ORDER BY cv_id ASC
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
    userUStudiesQuery,
    userCvsQuery
  ])

  const { rows: user } = queryResponses[0]
  const { rows: languages } = queryResponses[1]
  const { rows: userHardSkills } = queryResponses[2]
  const { rows: personalHardSkills } = queryResponses[3]
  const { rows: userSoftSkills } = queryResponses[4]
  const { rows: personalSoftSkills } = queryResponses[5]
  const { rows: userUStudies } = queryResponses[6]
  const { rows: userCvs } = queryResponses[7]

  const userCatalogue = {
    ...camelizeObject(user[0]),
    languages: camelizeObject(languages),
    skills: {
      hard: [...userHardSkills, ...personalHardSkills].map(item => item.name),
      soft: [...userSoftSkills, ...personalSoftSkills].map(item => item.name)
    },
    education: userUStudies.map(item => item.name),
    cvs: camelizeObject(userCvs)
  }

  return userCatalogue
}
