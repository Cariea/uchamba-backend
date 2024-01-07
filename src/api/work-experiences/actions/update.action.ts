import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { StatusError } from '../../../utils/responses/status-error'
import { regenerate } from '../../../utils/regenerate-cv/regenerate'

export const updateWorkExperience = async (
  req: ExtendedRequest,
  res: Response
): Promise<Response> => {
  try {
    const {
      organizationName,
      jobTitle,
      country,
      state,
      city,
      address,
      freelancer,
      entryDate,
      departureDate,
      description
    } = req.body

    const { workExpId } = req.params
    const userId: number = req.user.id

    const { rows } = await pool.query({
      text: `
        SELECT *
        FROM work_experiences
        WHERE 
          user_id = $1 AND
          work_exp_id != $2 AND
          organization_name = $3 AND
          job_title = $4 AND
          entry_date = $5
      `,
      values: [userId, workExpId, organizationName, jobTitle, entryDate]
    })

    if (rows.length > 0) {
      throw new StatusError({
        message: 'Ya existe otro registro con datos parecidos',
        statusCode: STATUS.BAD_REQUEST
      })
    }

    const response = await pool.query({
      text: `
        UPDATE work_experiences
        SET 
          organization_name = $1,
          job_title = $2,
          country = $3,
          state = $4,
          city = $5,
          address = $6,
          freelancer = $7,
          entry_date = $8,
          departure_date = $9,
          description = $10
        WHERE 
          user_id = $11 AND
          work_exp_id = $12
      `,
      values: [
        organizationName,
        jobTitle,
        (freelancer === true ? null : country),
        (freelancer === true ? null : state),
        (freelancer === true ? null : city),
        (freelancer === true ? null : address),
        freelancer,
        entryDate,
        (departureDate === '' ? null : departureDate),
        description,
        userId,
        workExpId
      ]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro con el id de usuario: ${userId} y el id de experiencia de trabajo: ${workExpId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    regenerate()

    return res.status(STATUS.OK).json({ message: 'Experiencia de trabajo modificada correctamente' })
  } catch (error) {
    return handleControllerError(error, res)
  }
}
