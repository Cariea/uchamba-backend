import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { StatusError } from '../../../utils/responses/status-error'
import camelizeObject from '../../../utils/camelizeObject'
import {
  Curriculum,
  Education,
  Language,
  Skill,
  User,
  WorkExperience
} from '../../../types/cv'
import { convertMonthToSpanish } from './convert-month-to-spanish'
import { getSortedEducationObject } from './get-sorted-education-object'
import { getSortedSkillsArray } from './get-sorted-skills-array'

export async function getCVInfo (userId: string, cvId: string): Promise<Curriculum> {
  const { rows: cvInfo } = await pool.query({
    text: `
      SELECT
        c.name AS career_name,
        ucv.name AS cv_name
      FROM users_cvs AS ucv
      INNER JOIN ucareers AS c ON 
        ucv.ucareer_id = c.ucareer_id
      WHERE
        ucv.user_id = $1 AND
        ucv.cv_id = $2
    `,
    values: [userId, cvId]
  })

  if (cvInfo.length === 0) {
    throw new StatusError({
      message: 'El Curriculum Vitae que desea no ha sido encontrado',
      statusCode: STATUS.NOT_FOUND
    })
  }

  // User
  const userQuery = pool.query({
    text: `
      SELECT
        name,
        email,
        about_me,
        country,
        state,
        city,
        residence_address
      FROM users
      WHERE user_id = $1
    `,
    values: [userId]
  })

  // Languages
  const languagesQuery = pool.query({
    text: `
      SELECT
        l.name,
        ul.proficient_level
      FROM cv_languages AS cvl
      INNER JOIN users_languages AS ul ON
        cvl.user_id = ul.user_id AND
        cvl.language_id = ul.language_id
      INNER JOIN languages AS l ON 
        cvl.language_id = l.language_id
      WHERE
        cvl.user_id = $1 AND
        cvl.cv_id = $2
      ORDER BY
        ul.proficient_level DESC,
        l.name ASC
    `,
    values: [userId, cvId]
  })

  // HardSkills And SoftSkills
  const hardSkillsQuery = pool.query({
    text: `
      SELECT 
        hs.name,
        cvhs.order_index
      FROM cv_hard_skills AS cvhs
      INNER JOIN users_hard_skills AS uhs ON
        cvhs.user_id = uhs.user_id AND
        cvhs.hard_skill_id = uhs.hard_skill_id
      INNER JOIN hard_skills AS hs ON
        cvhs.hard_skill_id = hs.hard_skill_id
      WHERE
        cvhs.user_id = $1 AND
        cvhs.cv_id = $2
      ORDER BY cvhs.order_index ASC
    `,
    values: [userId, cvId]
  })

  const personalHardSkillsQuery = pool.query({
    text: `
      SELECT 
        phs.name,
        cvphs.order_index
      FROM cv_personal_hard_skills AS cvphs
      INNER JOIN personal_hard_skills AS phs ON
        cvphs.user_id = phs.user_id AND
        cvphs.phard_skill_id = phs.phard_skill_id
      WHERE 
        cvphs.user_id = $1 AND
        cvphs.cv_id = $2
      ORDER BY cvphs.order_index ASC
    `,
    values: [userId, cvId]
  })

  const softSkillsQuery = pool.query({
    text: `
      SELECT 
        ss.name,
        cvss.order_index
      FROM cv_soft_skills AS cvss
      INNER JOIN users_soft_skills AS uss ON
        cvss.user_id = uss.user_id AND
        cvss.soft_skill_id = uss.soft_skill_id
      INNER JOIN soft_skills AS ss ON
        cvss.soft_skill_id = ss.soft_skill_id
      WHERE
        cvss.user_id = $1 AND
        cvss.cv_id = $2
      ORDER BY cvss.order_index ASC
    `,
    values: [userId, cvId]
  })

  const personalSoftSkillsQuery = pool.query({
    text: `
      SELECT 
        pss.name,
        cvpss.order_index
      FROM cv_personal_soft_skills AS cvpss
      INNER JOIN personal_soft_skills AS pss ON
        cvpss.user_id = pss.user_id AND
        cvpss.psoft_skill_id = pss.psoft_skill_id
      WHERE 
        cvpss.user_id = $1 AND
        cvpss.cv_id = $2
      ORDER BY cvpss.order_index ASC
    `,
    values: [userId, cvId]
  })

  // User Studies
  const userUStudiesQuery = pool.query({
    text: `
      SELECT
        uc.name,
        uus.degree,
        TO_CHAR(uus.graduation_year, 'YYYY') AS graduation_year
      FROM cv_ustudies AS cvu
      INNER JOIN users_ustudies AS uus ON 
        cvu.user_id = uus.user_id AND 
        cvu.ucareer_id = uus.ucareer_id
      INNER JOIN ucareers AS uc ON 
        uus.ucareer_id = uc.ucareer_id
      WHERE
        cvu.user_id = $1 AND
        cvu.cv_id = $2
      ORDER BY uus.graduation_year DESC
    `,
    values: [userId, cvId]
  })

  const foreignStudiesQuery = pool.query({
    text: `
      SELECT
        fs.name,
        fs.university_name,
        fs.degree,
        TO_CHAR(fs.graduation_year, 'YYYY') AS graduation_year
      FROM cv_foreign_studies AS cvfs
      INNER JOIN foreign_studies AS fs ON
        cvfs.foreign_study_id = fs.foreign_study_id
      WHERE
        cvfs.user_id = $1 AND
        cvfs.cv_id = $2
      ORDER BY fs.graduation_year DESC
    `,
    values: [userId, cvId]
  })

  // Work experiences
  const workExperiencesQuery = pool.query({
    // FM in query due to this https://dba.stackexchange.com/questions/175811/why-is-to-char-left-padding-with-spaces
    text: `
      SELECT
        we.organization_name,
        we.job_title,
        we.freelancer,
        we.country,
        we.state,
        we.city,
        we.address,
        we.description,
        TO_CHAR(we.entry_date, 'FMMonth YYYY') AS entry_date,
        TO_CHAR(we.departure_date, 'FMMonth YYYY') AS departure_date
      FROM cv_work_experiences AS cvwe
      INNER JOIN work_experiences AS we ON
        cvwe.work_exp_id = we.work_exp_id
      WHERE
        cvwe.user_id = $1 AND
        cvwe.cv_id = $2
      ORDER BY
        we.departure_date DESC,
        we.entry_date DESC
    `,
    values: [userId, cvId]
  })

  const queryResponses = await Promise.all([
    userQuery,
    languagesQuery,
    hardSkillsQuery,
    personalHardSkillsQuery,
    softSkillsQuery,
    personalSoftSkillsQuery,
    userUStudiesQuery,
    foreignStudiesQuery,
    workExperiencesQuery
  ])

  const { rows: userResponse } = queryResponses[0]
  const { rows: languages } = queryResponses[1]
  const { rows: hardSkills } = queryResponses[2]
  const { rows: personalHardSkills } = queryResponses[3]
  const { rows: softSkills } = queryResponses[4]
  const { rows: personalSoftSkills } = queryResponses[5]
  const { rows: userUStudies } = queryResponses[6]
  const { rows: foreignStudies } = queryResponses[7]
  const { rows: workExperiences } = queryResponses[8]

  const user = camelizeObject({ ...{ userId }, ...userResponse[0] }) as unknown as User
  const cvData = camelizeObject({ ...cvInfo[0] }) as unknown as { careerName: string, cvName: string }

  const CV: Curriculum = {
    ...user,
    ...cvData,
    languages: camelizeObject(languages) as Language[],
    hardSkills: getSortedSkillsArray(
      camelizeObject(hardSkills) as Skill[],
      camelizeObject(personalHardSkills) as Skill[]
    ),
    softSkills: getSortedSkillsArray(
      camelizeObject(softSkills) as Skill[],
      camelizeObject(personalSoftSkills) as Skill[]
    ),
    education: getSortedEducationObject(
      camelizeObject(userUStudies) as Education[],
      camelizeObject(foreignStudies) as Education[]
    ),
    workExperiences: convertMonthToSpanish(
      camelizeObject(workExperiences) as WorkExperience[]
    )
  }

  return CV
}
