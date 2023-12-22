import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import camelizeObject from '../../../utils/camelizeObject'
import { StatusError } from '../../../utils/responses/status-error'

export const getByWorkExperienceId = async (
  req: ExtendedRequest, res: Response
): Promise<Response | undefined> => {
  try {
    const { workExpId } = req.params
    const userId: number = req.user.id
    const response = await pool.query({
      text: `
        SELECT
          organization_name,
          job_title,
          country,
          state,
          city,
          address,
          freelancer,
          TO_CHAR(entry_date, 'DD/MM/YYYY') AS entry_date,
          TO_CHAR(departure_date, 'DD/MM/YYYY) AS departure_date,
          description,
          TO_CHAR(created_at, 'DD/MM/YYYY - HH12:MI AM') AS created_at
        FROM work_experiences
        WHERE user_id = $1
        AND work_exp_id = $2
      `,
      values: [userId, workExpId]
    })

    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro con el id de usuario: ${userId} y el id de experiencia de trabajo: ${workExpId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
