import { Response, Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { generatePdf } from '../../../utils/pdfGenerator'
import {
  User,
  Language,
  HardSkills,
  PersonalHardSkills,
  SoftSkills,
  PersonalSoftSkills,
  FeaturedCareers,
  PersonalCareers,
  WorkExperience,
  Curriculum,
  FeaturedHardSkills,
  FeaturedSoftSkills,
  Education
} from '../../../types/cv'
import camelizeObject from '../../../utils/camelizeObject'
import { compileFile } from 'pug'

const compiledFunction = compileFile('./src/api/cv-generator/cv-template/template.pug')

export const cvGenerator = async (req: Request, res: Response): Promise<Response | undefined> => {
  try {
    const { userId } = req.params
    // User
    const userResponse = await pool.query({
      text: `
        SELECT
          name,
          email,
          about_me,
          phone_number,
          residence_address
        FROM users
        WHERE user_id = $1
      `,
      values: [userId]
    })

    // Languages
    const { rows: languagesResponse } = await pool.query({
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

    // HardSkills And SoftSkills

    const { rows: hardSkillsResponse } = await pool.query({
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

    const { rows: personalHardSkillsResponse } = await pool.query({
      text: `
        SELECT name
        FROM personal_hard_skills
        WHERE user_id = $1
        ORDER BY phard_skill_id ASC
      `,
      values: [userId]
    })

    const { rows: softSkillsResponse } = await pool.query({
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

    const { rows: personalSoftSkillsResponse } = await pool.query({
      text: `
        SELECT name
        FROM personal_soft_skills
        WHERE user_id = $1
        ORDER BY psoft_skill_id ASC
        `,
      values: [userId]
    })
    // User Studies
    const { rows: userUStudiesResponse } = await pool.query({
      text: `
      SELECT
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

    const { rows: foreignStudiesResponse } = await pool.query({
      text: `
        SELECT
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

    // Work experiences

    const { rows: workExperiencesResponse } = await pool.query({
      text: `
        SELECT
          organization_name,
          job_title,
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

    const user = camelizeObject(userResponse.rows[0]) as unknown as User
    const languages = camelizeObject(languagesResponse) as Language[]
    const userHardSkills = camelizeObject(hardSkillsResponse) as FeaturedHardSkills[]
    const personalHardSkills = camelizeObject(personalHardSkillsResponse) as PersonalHardSkills[]
    const userSoftSkill = camelizeObject(softSkillsResponse) as FeaturedSoftSkills[]
    const personalSoftSkills = camelizeObject(personalSoftSkillsResponse) as PersonalSoftSkills[]
    const featuredCareers = camelizeObject(userUStudiesResponse) as FeaturedCareers[]
    const personalCareers = camelizeObject(foreignStudiesResponse) as PersonalCareers[]
    const workExperiences = camelizeObject(workExperiencesResponse) as WorkExperience[]

    const hardSkills: HardSkills = { featured: userHardSkills, personal: personalHardSkills }
    const softSkills: SoftSkills = { featured: userSoftSkill, personal: personalSoftSkills }

    const education: Education = { featured: featuredCareers, personal: personalCareers }

    const CV: Curriculum = {
      ...user,
      languages,
      hardSkills,
      softSkills,
      education,
      workExperiences
    }

    const htmlContent = compiledFunction(CV)
    const pdfBuffer = await generatePdf(htmlContent)

    const filename = `cv_usuario_${userId}.pdf`
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`)
    res.setHeader('Content-Type', 'application/pdf')

    return res.status(STATUS.OK).send(pdfBuffer)
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
