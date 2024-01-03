import { pool } from '../../../database'
import { Education, Skill } from '../../../types/cv'
import camelizeObject from '../../../utils/camelizeObject'
import { getSortedEducationObject } from '../../cv-generator/_utils/get-sorted-education-object'
import { getSortedSkillsArray } from '../../cv-generator/_utils/get-sorted-skills-array'

export async function getCVInfo (cvId: string): Promise<any> {
  const { rows: userCvs } = await pool.query({
    text: `
      SELECT
        uc.cv_id,
        uc.ucareer_id AS career_id,
        c.name AS career_name,
        uc.name
      FROM users_cvs AS uc
      INNER JOIN ucareers AS c ON
        c.ucareer_id = uc.ucareer_id
      WHERE cv_id = $1
      ORDER BY cv_id
    `,
    values: [cvId]
  })

  const { rows: languages } = await pool.query({
    text: `
      SELECT cvl.language_id AS id
      FROM cv_languages AS cvl
      INNER JOIN users_languages AS ul ON
        cvl.user_id = ul.user_id AND
        cvl.language_id = ul.language_id
      INNER JOIN languages AS l ON 
        cvl.language_id = l.language_id
      WHERE cvl.cv_id = $1
      ORDER BY
        ul.proficient_level DESC,
        l.name ASC
    `,
    values: [cvId]
  })

  const { rows: hardSkills } = await pool.query({
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
      WHERE cvhs.cv_id = $1
      ORDER BY cvhs.order_index ASC
    `,
    values: [cvId]
  })

  const { rows: personalHardSkills } = await pool.query({
    text: `
      SELECT 
        phs.name,
        cvphs.order_index
      FROM cv_personal_hard_skills AS cvphs
      INNER JOIN personal_hard_skills AS phs ON
        cvphs.user_id = phs.user_id AND
        cvphs.phard_skill_id = phs.phard_skill_id
      WHERE cvphs.cv_id = $1
      ORDER BY cvphs.order_index ASC
    `,
    values: [cvId]
  })

  const { rows: softSkills } = await pool.query({
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
      WHERE cvss.cv_id = $1
      ORDER BY cvss.order_index ASC
    `,
    values: [cvId]
  })

  const { rows: personalSoftSkills } = await pool.query({
    text: `
      SELECT 
        pss.name,
        cvpss.order_index
      FROM cv_personal_soft_skills AS cvpss
      INNER JOIN personal_soft_skills AS pss ON
        cvpss.user_id = pss.user_id AND
        cvpss.psoft_skill_id = pss.psoft_skill_id
      WHERE cvpss.cv_id = $1
      ORDER BY cvpss.order_index ASC
    `,
    values: [cvId]
  })

  const { rows: experiences } = await pool.query({
    text: `
      SELECT cvwe.work_exp_id AS id
      FROM cv_work_experiences AS cvwe
      INNER JOIN work_experiences AS we ON
        cvwe.work_exp_id = we.work_exp_id
      WHERE cvwe.cv_id = $1
      ORDER BY
        we.departure_date DESC,
        we.entry_date DESC
    `,
    values: [cvId]
  })

  const { rows: userUStudies } = await pool.query({
    text: `
      SELECT
        cvu.ucareer_id AS id,
        TO_CHAR(uus.graduation_year, 'YYYY') AS graduation_year
      FROM cv_ustudies AS cvu
      INNER JOIN users_ustudies AS uus ON 
        cvu.user_id = uus.user_id AND 
        cvu.ucareer_id = uus.ucareer_id
      INNER JOIN ucareers AS uc ON 
        uus.ucareer_id = uc.ucareer_id
      WHERE cvu.cv_id = $1
      ORDER BY uus.graduation_year DESC
    `,
    values: [cvId]
  })

  const { rows: foreignStudies } = await pool.query({
    text: `
      SELECT
        cvfs.foreign_study_id as id,
        TO_CHAR(fs.graduation_year, 'YYYY') AS graduation_year
      FROM cv_foreign_studies AS cvfs
      INNER JOIN foreign_studies AS fs ON
        cvfs.foreign_study_id = fs.foreign_study_id
      WHERE cvfs.cv_id = $1
      ORDER BY fs.graduation_year DESC
    `,
    values: [cvId]
  })

  const userCatalogue = {
    ...camelizeObject(userCvs[0]),
    languages: languages.map(item => item.id),
    skills: {
      hard: getSortedSkillsArray(
        camelizeObject(hardSkills) as Skill[],
        camelizeObject(personalHardSkills) as Skill[]
      ),
      soft: getSortedSkillsArray(
        camelizeObject(softSkills) as Skill[],
        camelizeObject(personalSoftSkills) as Skill[]
      )
    },
    experiences: experiences.map(item => item.id),
    education: getSortedEducationObject(
      camelizeObject(userUStudies) as Education[],
      camelizeObject(foreignStudies) as Education[]
    ).map(item => item.id)
  }

  return userCatalogue
}
