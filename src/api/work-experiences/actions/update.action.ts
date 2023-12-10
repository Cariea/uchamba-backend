import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { StatusError } from '../../../utils/responses/status-error'

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
          entry_date = $7,
          departure_date = $8,
          description = $9
        WHERE 
          user_id = $10 AND
          work_exp_id = $11
      `,
      values: [organizationName, jobTitle, country, state, city, address, entryDate, departureDate, description, userId, workExpId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro con el id de usuario: ${userId} y el id de experiencia de trabajo: ${workExpId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Experiencia de trabajo modificada correctamente' })
  } catch (error) {
    return handleControllerError(error, res)
  }
}
