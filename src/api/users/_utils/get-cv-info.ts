import { pool } from '../../../database'
import camelizeObject from '../../../utils/camelizeObject'

export async function getCVInfo (cvId: string): Promise<any> {
  const { rows: userCvs } = await pool.query({
    text: `
      SELECT
        uc.cv_id,
        uc.ucareer_id AS career_id,
        c.name AS career_name,
        uc.name
      FROM
        users_cvs AS uc,
        ucareers AS c
      WHERE
        cv_id = $1 AND
        c.ucareer_id = uc.ucareer_id
      ORDER BY cv_id
    `,
    values: [cvId]
  })

  const { rows: languages } = await pool.query({
    text: `
      SELECT language_id AS id
      FROM cv_languages
      WHERE cv_id = $1
      ORDER BY order_index ASC
    `,
    values: [cvId]
  })

  const { rows: hardSkills } = await pool.query({
    text: `
      SELECT hs.name
      FROM
        cv_hard_skills AS chs,
        hard_skills AS hs
      WHERE 
        chs.cv_id = $1 AND
        chs.hard_skill_id = hs.hard_skill_id
      ORDER BY hs.hard_skill_id ASC
    `,
    values: [cvId]
  })

  const { rows: personalHardSkills } = await pool.query({
    text: `
      SELECT phs.name
      FROM 
        cv_personal_hard_skills AS cphs,
        personal_hard_skills AS phs
      WHERE 
        cphs.cv_id = $1 AND
        cphs.phard_skill_id = phs.phard_skill_id
      ORDER BY phs.phard_skill_id ASC
    `,
    values: [cvId]
  })

  const { rows: softSkills } = await pool.query({
    text: `
      SELECT ss.name
      FROM 
        cv_soft_skills AS css,
        soft_skills AS ss
      WHERE 
        css.cv_id = $1 AND
        css.soft_skill_id = ss.soft_skill_id
      ORDER BY ss.soft_skill_id ASC
    `,
    values: [cvId]
  })

  const { rows: personalSoftSkills } = await pool.query({
    text: `
    SELECT pss.name
    FROM 
      cv_personal_soft_skills AS cpss,
      personal_soft_skills AS pss
    WHERE 
      cpss.cv_id = $1 AND
      cpss.psoft_skill_id = pss.psoft_skill_id
    ORDER BY pss.psoft_skill_id ASC
    `,
    values: [cvId]
  })

  const { rows: experiences } = await pool.query({
    text: `
      SELECT cwe.work_exp_id AS id
      FROM 
        cv_work_experiences AS cwe,
        work_experiences AS we
      WHERE 
        cv_id = $1 AND
        cwe.work_exp_id = we.work_exp_id
      ORDER BY we.departure_date
    `,
    values: [cvId]
  })

  const userCatalogue = {
    ...camelizeObject(userCvs[0]),
    languages: languages.map(item => item.id),
    skills: {
      hard: [...hardSkills, ...personalHardSkills].map(item => item.name),
      soft: [...softSkills, ...personalSoftSkills].map(item => item.name)
    },
    experiences: experiences.map(item => item.id)
  }

  return userCatalogue
}
