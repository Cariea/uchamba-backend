import { Response, Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { StatusError } from '../../../utils/responses/status-error'
import { QueryResult } from 'pg'

export const deleteLanguage = async (
  req: Request, res: Response
): Promise<Response | undefined> => {
  try {
    const { languageId } = req.params
    const response: QueryResult = await pool.query({
      text: `
        DELETE
        FROM languages
        WHERE language_id = $1
      `,
      values: [languageId]
    })

    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro de id: ${languageId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Idioma eliminado correctamente' })
  } catch (error: unknown) {
    console.error(error)
    return handleControllerError(error, res)
  }
}
