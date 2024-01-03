import { Response, Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
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
import { monthToSpanish } from '../../../utils/month-to-spanish'
import { compileFile } from 'pug'
import { HTML_PDF_URL, FRONTEND_BASE_URL } from '../../../config'
import { StatusError } from '../../../utils/responses/status-error'

const compiledFunction = compileFile('./src/api/cv-generator/cv-template/template.pug')

export const cvGenerator = async (
  req: Request, res: Response
): Promise<Response | undefined> => {
  try {
    const { userId, cvId } = req.params

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
    const { rows: userResponse } = await pool.query({
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
    const { rows: languagesResponse } = await pool.query({
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
        FROM cv_ustudies AS cvu
        INNER JOIN users_ustudies AS uus ON 
          cvu.user_id = uus.user_id AND 
          cvu.ucareer_id = uus.ucareer_id
        INNER JOIN ucareers AS uc ON 
          uus.ucareer_id = uc.ucareer_id
        WHERE
          cvu.user_id = $1 AND
          cvu.cv_id = $2
        ORDER BY
          uus.graduation_year DESC
      `,
      values: [userId, cvId]
    })

    const { rows: foreignStudiesResponse } = await pool.query({
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
        ORDER BY
          fs.graduation_year DESC
      `,
      values: [userId, cvId]
    })

    // Work experiences
    const { rows: workExperiencesResponse } = await pool.query({
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

    const user = camelizeObject({ ...{ userId }, ...userResponse[0] }) as unknown as User
    const cvData = camelizeObject({ ...cvInfo[0] }) as unknown as { careerName: string, cvName: string }
    const languages = camelizeObject(languagesResponse) as Language[]
    const userHardSkills = camelizeObject(hardSkillsResponse) as FeaturedHardSkills[]
    const personalHardSkills = camelizeObject(personalHardSkillsResponse) as PersonalHardSkills[]
    const userSoftSkill = camelizeObject(softSkillsResponse) as FeaturedSoftSkills[]
    const personalSoftSkills = camelizeObject(personalSoftSkillsResponse) as PersonalSoftSkills[]
    const featuredCareers = camelizeObject(userUStudiesResponse) as FeaturedCareers[]
    const personalCareers = camelizeObject(foreignStudiesResponse) as PersonalCareers[]
    const workExperiences = camelizeObject(workExperiencesResponse).map((workExperience: WorkExperience) => {
      const [entryMonth, entryYear] = workExperience.entryDate.split(' ')

      if (workExperience.departureDate === null) {
        return {
          ...workExperience,
          entryDate: `${monthToSpanish(entryMonth)} ${entryYear}`
        }
      }

      const [departureMonth, departureYear] = workExperience.departureDate.split(' ')
      return {
        ...workExperience,
        entryDate: `${monthToSpanish(entryMonth)} ${entryYear}`,
        departureDate: `${monthToSpanish(departureMonth)} ${departureYear}`
      }
    }) as WorkExperience[]

    const hardSkills: HardSkills = { featured: userHardSkills, personal: personalHardSkills }
    const softSkills: SoftSkills = { featured: userSoftSkill, personal: personalSoftSkills }

    const education: Education = { featured: featuredCareers, personal: personalCareers }

    const CV: Curriculum = {
      ...user,
      ...cvData,
      languages,
      hardSkills,
      softSkills,
      education,
      workExperiences
    }

    const profileLink = `${FRONTEND_BASE_URL as string}/profile/${userId}`

    const htmlContent = compiledFunction({ ...CV, profileLink })
    // ${HTML_PDF_URL as string}
    const pdfResponse = await fetch(`${HTML_PDF_URL as string}/convert`, {
      method: 'POST',
      body: htmlContent,
      headers: {
        'content-type': 'text/html'
      }
    })

    const pdf = Buffer.from(await pdfResponse.arrayBuffer())

    return res.set({ 'Content-Type': 'application/pdf' }).status(STATUS.OK).send(pdf)
  } catch (error: unknown) {
    console.log(error)
    return handleControllerError(error, res)
  }
}
