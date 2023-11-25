import { Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import camelizeObject from '../../../utils/camelizeObject'
import { ExtendedRequest } from '../../../middlewares/auth'

export const addUserLanguage = async (
  req: ExtendedRequest, res: Response
): Promise<Response | undefined> => {
  try {
    const { languageId } = req.params
    const { proficientLevel } = req.body
    const response = await pool.query({
      text: `
        INSERT INTO users_languages (
          user_id,
          language_id,
          proficient_level
        ) 
        VALUES ($1,$2,$3)
        RETURNING
          user_id,
          language_id,
          proficient_level,
          TO_CHAR(created_at, 'DD/MM/YYYY - HH12:MI AM') AS created_at
      `,
      values: [req.user.id, languageId, proficientLevel]
    })

    return res.status(STATUS.OK).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    console.log(error)
    return handleControllerError(error, res)
  }
}
