import { Response, Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { StatusError } from '../../../utils/responses/status-error'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import camelizeObject from '../../../utils/camelizeObject'

export const addCareer = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const { name } = req.body

    // Verficar la existencia de esa carrera antes de crear

    const { rows } = await pool.query({
      text: `
        SELECT *
        FROM ucareers
        WHERE name = $1
      `,
      values: [name]
    })

    if (rows.length > 0) {
      throw new StatusError({
        message: 'Ya existe una carrera con este nombre',
        statusCode: STATUS.BAD_REQUEST
      })
    }

    // --

    const response = await pool.query({
      text: `
        INSERT INTO ucareers (
          name
        )
        VALUES ($1)
        RETURNING
          ucareer_id,
          name
      `,
      values: [name]
    })

    return res.status(STATUS.CREATED).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
