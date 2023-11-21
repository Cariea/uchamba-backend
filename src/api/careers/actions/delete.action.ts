import { Response, Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { StatusError } from '../../../utils/responses/status-error'
import { QueryResult } from 'pg'

export const deleteCareer = async (
  req: Request, res: Response
): Promise<Response | undefined> => {
  try {
    const { careerId } = req.params
    const response: QueryResult = await pool.query({
      text: `
        DELETE
        FROM ucareers
        WHERE ucareer_id = $1
      `,
      values: [careerId]
    })

    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${careerId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Carrera de la UCAB eliminada correctamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
