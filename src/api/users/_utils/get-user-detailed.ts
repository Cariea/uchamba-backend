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
        phone_number,
        country,
        state,
        city,
        residence_address,
        role
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

  const { rows: userHardSkills } = await pool.query({
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

  const { rows: personalHardSkills } = await pool.query({
    text: `
      SELECT name
      FROM personal_hard_skills
      WHERE user_id = $1
      ORDER BY phard_skill_id ASC
    `,
    values: [userId]
  })

  const { rows: userSoftSkills } = await pool.query({
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

  const { rows: personalSoftSkills } = await pool.query({
    text: `
      SELECT name
      FROM personal_soft_skills
      WHERE user_id = $1
      ORDER BY psoft_skill_id ASC
    `,
    values: [userId]
  })

  const { rows: personalLinks } = await pool.query({
    text: `
      SELECT
        link_id,
        name,
        url
      FROM personal_links
      WHERE user_id = $1
      ORDER BY link_id ASC
    `,
    values: [userId]
  })

  const { rows: userUStudies } = await pool.query({
    text: `
      SELECT
        uc.ucareer_id,
        uc.name,
        uus.degree,
        TO_CHAR(uus.graduation_year, 'YYYY') AS graduation_year
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

  const { rows: foreignStudies } = await pool.query({
    text: `
      SELECT
        foreign_study_id AS study_id,
        name,
        university_name,
        degree,
        TO_CHAR(graduation_year, 'YYYY') AS graduation_year
      FROM foreign_studies
      WHERE user_id = $1
      ORDER BY foreign_study_id ASC
    `,
    values: [userId]
  })

  const { rows: workExperiences } = await pool.query({
    text: `
      SELECT
        work_exp_id,
        organization_name,
        job_title,
        country,
        state,
        city,
        address,
        description,
        TO_CHAR(entry_date, 'DD/MM/YYYY') AS entry_date,
        TO_CHAR(departure_date, 'DD/MM/YYYY') AS departure_date
      FROM work_experiences
      WHERE user_id = $1
      ORDER BY work_exp_id ASC
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

  const { rows: languages } = await pool.query({
    text: `
      SELECT
        l.language_id,
        l.name,
        ul.proficient_level,
        ul.certificate_image_id,
        ul.certificate_image_url
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

  const userDetailed = {
    ...camelizeObject(user.rows[0]),
    languages: camelizeObject(languages),
    personalLinks: camelizeObject(personalLinks),
    hardSkills: {
      featured: camelizeObject(userHardSkills),
      personal: camelizeObject(personalHardSkills)
    },
    softSkills: {
      featured: camelizeObject(userSoftSkills),
      personal: camelizeObject(personalSoftSkills)
    },
    education: {
      featured: camelizeObject(userUStudies),
      personal: camelizeObject(foreignStudies)
    },
    workExperiences: camelizeObject(workExperiences),
    projects: camelizeObject(projects)
  }

  return userDetailed
}
