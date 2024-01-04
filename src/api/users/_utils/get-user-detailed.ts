import { pool } from '../../../database'
import { StatusError } from '../../../utils/responses/status-error'
import { STATUS } from '../../../utils/constants'
import camelizeObject from '../../../utils/camelizeObject'

export async function getUserDetailed (userId: string): Promise<any> {
  const user = await pool.query({
    text: `
      SELECT
        user_id,
        name,
        email,
        about_me,
        country,
        state,
        city,
        residence_address,
        role,
        is_active
      FROM users
      WHERE user_id = $1
    `,
    values: [userId]
  })

  if (user.rowCount === 0) {
    throw new StatusError({
      message: `No se pudo encontrar el registro de id: ${userId}`,
      statusCode: STATUS.NOT_FOUND
    })
  }

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

  const personalLinksQuery = pool.query({
    text: `
      SELECT
        link_id,
        url
      FROM personal_links
      WHERE user_id = $1
      ORDER BY link_id ASC
    `,
    values: [userId]
  })

  const userUStudiesQuery = pool.query({
    text: `
      SELECT
        uc.ucareer_id AS id,
        uc.name,
        uus.degree,
        TO_CHAR(uus.graduation_year, 'YYYY') AS graduation_year
      FROM users_ustudies AS uus
      INNER JOIN ucareers AS uc ON
        uus.ucareer_id = uc.ucareer_id
      WHERE uus.user_id = $1
      ORDER BY uus.graduation_year DESC
    `,
    values: [userId]
  })

  const foreignStudiesQuery = pool.query({
    text: `
      SELECT
        foreign_study_id AS id,
        name,
        university_name,
        degree,
        TO_CHAR(graduation_year, 'YYYY') AS graduation_year
      FROM foreign_studies
      WHERE user_id = $1
      ORDER BY graduation_year DESC
    `,
    values: [userId]
  })

  const workExperiencesQuery = pool.query({
    text: `
      SELECT
        work_exp_id,
        organization_name,
        job_title,
        freelancer,
        country,
        state,
        city,
        address,
        description,
        TO_CHAR(entry_date, 'YYYY-MM-DD') AS entry_date,
        TO_CHAR(departure_date, 'YYYY-MM-DD') AS departure_date
      FROM work_experiences
      WHERE user_id = $1
      ORDER BY
        departure_date DESC,
        entry_date DESC
    `,
    values: [userId]
  })

  const { rows: projects } = await pool.query({
    text: `
      SELECT
        project_id,
        name,
        description,
        project_url,
        cover_image_id,
        cover_image_url
      FROM projects
      WHERE user_id = $1
      ORDER BY project_id ASC
    `,
    values: [userId]
  })

  if (projects.length > 0) {
    for (let i = 0; i < projects.length; i++) {
      const { rows } = await pool.query({
        text: `
          SELECT
            image_cloud_id,
            image_url
          FROM projects_images
          WHERE 
            user_id = $1 AND
            project_id = $2
        `,
        values: [userId, projects[i].project_id]
      })

      projects[i] = {
        ...projects[i],
        images: rows
      }
    }
  }

  const languagesQuery = pool.query({
    text: `
      SELECT
        l.language_id,
        l.name,
        ul.proficient_level,
        ul.certificate_image_id,
        ul.certificate_image_url
      FROM users_languages AS ul
      INNER JOIN languages AS l ON
        ul.language_id = l.language_id
      WHERE ul.user_id = $1
      ORDER BY
        proficient_level DESC,
        name ASC
    `,
    values: [userId]
  })

  const queryResponses = await Promise.all([
    languagesQuery,
    personalLinksQuery,
    userHardSkillsQuery,
    personalHardSkillsQuery,
    userSoftSkillsQuery,
    personalSoftSkillsQuery,
    userUStudiesQuery,
    foreignStudiesQuery,
    workExperiencesQuery
  ])

  const { rows: languages } = queryResponses[0]
  const { rows: personalLinks } = queryResponses[1]
  const { rows: userHardSkills } = queryResponses[2]
  const { rows: personalHardSkills } = queryResponses[3]
  const { rows: userSoftSkills } = queryResponses[4]
  const { rows: personalSoftSkills } = queryResponses[5]
  const { rows: userUStudies } = queryResponses[6]
  const { rows: foreignStudies } = queryResponses[7]
  const { rows: workExperiences } = queryResponses[8]

  const userDetailed = {
    ...camelizeObject(user.rows[0]),
    languages: camelizeObject(languages),
    personalLinks: camelizeObject(personalLinks),
    skills: {
      hard: [...userHardSkills, ...personalHardSkills].map(item => item.name),
      soft: [...userSoftSkills, ...personalSoftSkills].map(item => item.name)
    },
    education: camelizeObject([...userUStudies, ...foreignStudies]),
    workExperiences: camelizeObject(workExperiences),
    projects: camelizeObject(projects)
  }

  return userDetailed
}
