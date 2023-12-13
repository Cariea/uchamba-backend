import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { getForInsertionItemsArray, getOccurrenceArray, removeDuplicates } from '../../../utils/get-occurence-array'

export const addProfileSoftSkills = async (
  req: ExtendedRequest,
  res: Response
): Promise<Response | undefined> => {
  try {
    const { rows: featuredSoftSkills } = await pool.query({
      text: `
        SELECT
          soft_skill_id AS id,
          name
        FROM soft_skills
      `
    })

    const { rows: userSoftSkills } = await pool.query({
      text: `
        SELECT
          ss.soft_skill_id,
          ss.name
        FROM
          users_soft_skills AS uss,
          soft_skills AS ss
        WHERE
          uss.user_id = $1 AND
          uss.soft_skill_id = ss.soft_skill_id
      `,
      values: [req.user.id]
    })

    const { rows: personalSoftSkills } = await pool.query({
      text: `
        SELECT
          psoft_skill_id,
          name
        FROM personal_soft_skills
        WHERE
          user_id = $1
      `,
      values: [req.user.id]
    })

    // Featured
    const userHardSkillsArray = userSoftSkills.map(item => item.soft_skill_id)
    const inputFeaturedOccurrences = getOccurrenceArray(featuredSoftSkills, req.body, 'id')
    const featuredInsertion = removeDuplicates(getForInsertionItemsArray(inputFeaturedOccurrences, userHardSkillsArray))

    // Personal
    const onlyFeatured = featuredSoftSkills.map(item => item.name)
    const onlyPersonal = getForInsertionItemsArray(req.body, onlyFeatured)
    const userPSoftSkillsArray = personalSoftSkills.map(item => item.name)
    const personalInsertion = removeDuplicates(getForInsertionItemsArray(onlyPersonal, userPSoftSkillsArray))

    if (featuredInsertion.length === 0 && personalInsertion.length === 0) {
      return res.status(STATUS.BAD_REQUEST).json({ message: 'Las habilidades blandas ingresadas ya existen' })
    }

    for (const item of featuredInsertion) {
      await pool.query({
        text: `
          INSERT INTO users_soft_skills (
            user_id,
            soft_skill_id
          ) VALUES ($1, $2)
        `,
        values: [req.user.id, item]
      })
    }

    for (const item of personalInsertion) {
      await pool.query({
        text: `
          INSERT INTO personal_soft_skills (
            user_id,
            name
          ) VALUES ($1, $2)
        `,
        values: [req.user.id, item]
      })
    }

    return res.status(STATUS.CREATED).json({ message: 'Habilidades blandas añadidas correctamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

// TO_CHAR(created_at, 'YYYY-MM-DD') AS created_at
