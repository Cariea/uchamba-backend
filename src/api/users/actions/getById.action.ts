import { Response, Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import camelizeObject from '../../../utils/camelizeObject'
import { StatusError } from '../../../utils/responses/status-error'

export const getUserById = async (
  req: Request, res: Response
): Promise<Response | undefined> => {
  try {
    const { userId } = req.params
    const user = await pool.query({
      text: `
        SELECT
          user_id,
          name,
          email,
          about_me,
          phone_number,
          residence_address,
          role,
          is_verified,
          TO_CHAR(created_at, 'DD/MM/YYYY - HH12:MI AM') AS created_at,
          TO_CHAR(updated_at, 'DD/MM/YYYY - HH12:MI AM') AS updated_at
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

    const { rows: personalHardSkills } = await pool.query({
      text: `
        SELECT
          phard_skill_id AS skill_id,
          name,
          TO_CHAR(created_at, 'DD/MM/YYYY - HH12:MI AM') AS created_at
        FROM personal_hard_skills
        WHERE user_id = $1
        ORDER BY phard_skill_id ASC
      `,
      values: [userId]
    })

    const { rows: personalSoftSkills } = await pool.query({
      text: `
        SELECT
          psoft_skill_id AS skill_id,
          name,
          TO_CHAR(created_at, 'DD/MM/YYYY - HH12:MI AM') AS created_at
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
          url,
          TO_CHAR(created_at, 'DD/MM/YYYY - HH12:MI AM') AS created_at,
          TO_CHAR(updated_at, 'DD/MM/YYYY - HH12:MI AM') AS updated_at
        FROM personal_links
        WHERE user_id = $1
        ORDER BY link_id ASC
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
          TO_CHAR(graduation_date, 'DD/MM/YYYY') AS graduation_date,
          TO_CHAR(created_at, 'DD/MM/YYYY - HH12:MI AM') AS created_at,
          TO_CHAR(updated_at, 'DD/MM/YYYY - HH12:MI AM') AS updated_at
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
          address,
          description,
          TO_CHAR(entry_date, 'DD/MM/YYYY') AS entry_date,
          TO_CHAR(departure_date, 'DD/MM/YYYY') AS departure_date,
          TO_CHAR(created_at, 'DD/MM/YYYY - HH12:MI AM') AS created_at
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
          TO_CHAR(created_at, 'DD/MM/YYYY - HH12:MI AM') AS created_at,
          TO_CHAR(updated_at, 'DD/MM/YYYY - HH12:MI AM') AS updated_at
        FROM projects
        WHERE user_id = $1
        ORDER BY project_id ASC
      `,
      values: [userId]
    })

    // const { rows: projectImages } = await pool.query({
    //   text: `
    //   `,
    //   values: [userId, projects[].project_id]
    // })

    const { rows: languages } = await pool.query({
      text: `
        SELECT
          l.language_id,
          l.name,
          ul.proficient_level,
          TO_CHAR(ul.created_at, 'DD/MM/YYYY - HH12:MI AM') AS created_at,
          TO_CHAR(ul.updated_at, 'DD/MM/YYYY - HH12:MI AM') AS updated_at
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

    const { rows: userUStudies } = await pool.query({
      text: `
        SELECT
          uc.ucareer_id,
          uc.name,
          uus.degree,
          TO_CHAR(uus.graduation_date, 'DD/MM/YYYY') AS graduation_date,
          TO_CHAR(uus.created_at, 'DD/MM/YYYY - HH12:MI AM') AS created_at
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

    const { rows: userHardSkills } = await pool.query({
      text: `
        SELECT
          uhs.hard_skill_id,
          hs.name,
          TO_CHAR(uhs.created_at, 'DD/MM/YYYY - HH12:MI AM') AS created_at
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

    const { rows: userSoftSkills } = await pool.query({
      text: `
        SELECT
          uss.soft_skill_id,
          ss.name,
          TO_CHAR(uss.created_at, 'DD/MM/YYYY - HH12:MI AM') AS created_at
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

    return res.status(STATUS.OK).json({
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
    })
  } catch (error: unknown) {
    console.log(error)
    return handleControllerError(error, res)
  }
}
