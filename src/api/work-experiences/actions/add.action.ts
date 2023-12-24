import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { StatusError } from '../../../utils/responses/status-error'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import camelizeObject from '../../../utils/camelizeObject'

export const addWorkExperience = async (
  req: ExtendedRequest,
  res: Response
): Promise<Response | undefined> => {
  try {
    const {
      organizationName,
      jobTitle,
      freelancer,
      country,
      state,
      city,
      address,
      entryDate,
      departureDate,
      description
    } = req.body

    const userId: number = req.user.id

    const { rows } = await pool.query({
      text: `
        SELECT *
        FROM work_experiences
        WHERE 
          user_id = $1 AND
          organization_name = $2 AND
          job_title = $3 AND
          entry_date = $4
      `,
      values: [userId, organizationName, jobTitle, entryDate]
    })

    if (rows.length > 0) {
      throw new StatusError({
        message: 'Ya existe otro registro con datos parecidos',
        statusCode: STATUS.BAD_REQUEST
      })
    }

    const response = await pool.query({
      text: `
        INSERT INTO work_experiences (
          user_id,
          organization_name,
          job_title,
          freelancer,
          country,
          state,
          city,
          address,
          entry_date,
          departure_date,
          description
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING
          user_id,
          work_exp_id,
          organization_name,
          job_title,
          freelancer,
          country,
          state,
          city,
          address,
          TO_CHAR(entry_date, 'YYYY-MM-DD') AS entry_date,
          TO_CHAR(departure_date, 'YYYY-MM-DD') AS departure_date,
          description,
          TO_CHAR(created_at, 'DD/MM/YYYY - HH12:MI AM') AS created_at
      `,
      values: [
        userId,
        organizationName,
        jobTitle,
        freelancer,
        (freelancer === true ? null : country),
        (freelancer === true ? null : state),
        (freelancer === true ? null : city),
        (freelancer === true ? null : address),
        entryDate,
        (departureDate === '' ? null : departureDate),
        description
      ]
    })

    return res.status(STATUS.CREATED).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    console.log(error)
    return handleControllerError(error, res)
  }
}

// TO_CHAR(created_at, 'YYYY-MM-DD') AS created_at
