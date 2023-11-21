import { Request, Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { StatusError } from '../../../utils/responses/status-error'

export const updateCareer = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name } = req.body
    const { careerId } = req.params

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
        message: 'Ya existe otra carrera con este nombre',
        statusCode: STATUS.BAD_REQUEST
      })
    }

    const response = await pool.query({
      text: `
        UPDATE ucareers
        SET 
          name = $1
        WHERE
          ucareer_id = $2
      `,
      values: [name, careerId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se encontro el usuario de id: ${careerId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Carrera modificada correctamente' })
  } catch (error) {
    console.log(error)
    return handleControllerError(error, res)
  }
}
