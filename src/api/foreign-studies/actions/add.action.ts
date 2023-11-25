import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'

export const addForeignStudies = async (
  req: ExtendedRequest,
  res: Response
): Promise<Response> => {
  try {
    const { name, universityName, degree, graduationDate } = req.body
    const response = await pool.query({
      text: `
        INSERT INTO foreign_studies (
          user_id,
          name,
          university_name,
          degree,
          graduation_date
        )
        VALUES ($1,$2,$3,$4,$5)
        RETURNING
          user_id,
          foreign_study_id,
          name,
          university_name,
          degree,
          TO_CHAR(graduation_date, 'DD/MM/YYYY') AS graduation_date,
          TO_CHAR(created_at, 'DD/MM/YYYY - HH12:MI AM') AS created_at
      `,
      values: [req.user.id, name, universityName, degree, graduationDate]
    })

    return res.status(STATUS.OK).json(response.rows[0])
  } catch (error) {
    return handleControllerError(error, res)
  }
}
