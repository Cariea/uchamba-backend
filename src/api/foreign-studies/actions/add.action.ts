import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import camelizeObject from '../../../utils/camelizeObject'

export const addForeignStudies = async (
  req: ExtendedRequest,
  res: Response
): Promise<Response> => {
  try {
    const { name, universityName, degree, graduationYear } = req.body
    const formattedDate = `${graduationYear as string}-01-01`
    const response = await pool.query({
      text: `
        INSERT INTO foreign_studies (
          user_id,
          name,
          university_name,
          degree,
          graduation_year
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING
          user_id,
          foreign_study_id,
          name,
          university_name,
          degree,
          TO_CHAR(graduation_year, 'YYYY') AS graduation_year,
          TO_CHAR(created_at, 'DD/MM/YYYY - HH12:MI AM') AS created_at
      `,
      values: [req.user.id, name, universityName, degree, formattedDate]
    })

    return res.status(STATUS.OK).json(camelizeObject(response.rows[0]))
  } catch (error) {
    return handleControllerError(error, res)
  }
}
