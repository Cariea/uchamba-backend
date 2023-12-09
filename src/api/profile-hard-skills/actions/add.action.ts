import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { getForInsertionItemsArray, getOccurrenceArray, removeDuplicates } from '../../../utils/get-occurence-array'

export const addProfileHardSkills = async (
  req: ExtendedRequest,
  res: Response
): Promise<Response | undefined> => {
  try {
    const { rows: featuredHardSkills } = await pool.query({
      text: `
        SELECT
          hard_skill_id AS id,
          name
        FROM hard_skills
      `
    })

    const { rows: userHardSkills } = await pool.query({
      text: `
        SELECT
          hs.hard_skill_id,
          hs.name
        FROM
          users_hard_skills AS uhs,
          hard_skills AS hs
        WHERE
          uhs.user_id = $1 AND
          uhs.hard_skill_id = hs.hard_skill_id
      `,
      values: [req.user.id]
    })

    const { rows: personalHardSkills } = await pool.query({
      text: `
        SELECT
          phard_skill_id,
          name
        FROM personal_hard_skills
        WHERE
          user_id = $1
      `,
      values: [req.user.id]
    })

    // Featured
    const userHardSkillsArray = userHardSkills.map(item => item.hard_skill_id)
    const inputFeaturedOccurrences = getOccurrenceArray(featuredHardSkills, req.body, 'id')
    const featuredInsertion = removeDuplicates(getForInsertionItemsArray(inputFeaturedOccurrences, userHardSkillsArray))

    // Personal
    const onlyFeatured = featuredHardSkills.map(item => item.name)
    const onlyPersonal = getForInsertionItemsArray(req.body, onlyFeatured)
    const userPHardSkillsArray = personalHardSkills.map(item => item.name)
    const personalInsertion = removeDuplicates(getForInsertionItemsArray(onlyPersonal, userPHardSkillsArray))

    if (featuredInsertion.length === 0 && personalInsertion.length === 0) {
      return res.status(STATUS.BAD_REQUEST).json({ message: 'Las habilidades duras ingresadas ya existen' })
    }

    for (const item of featuredInsertion) {
      await pool.query({
        text: `
          INSERT INTO users_hard_skills (
            user_id,
            hard_skill_id
          ) VALUES ($1, $2)
        `,
        values: [req.user.id, item]
      })
    }

    for (const item of personalInsertion) {
      await pool.query({
        text: `
          INSERT INTO personal_hard_skills (
            user_id,
            name
          ) VALUES ($1, $2)
        `,
        values: [req.user.id, item]
      })
    }

    return res.status(STATUS.CREATED).json({ message: 'Habilidades duras añadidas correctamente' })
  } catch (error: unknown) {
    console.log(error)
    return handleControllerError(error, res)
  }
}

// TO_CHAR(created_at, 'YYYY-MM-DD') AS created_at
