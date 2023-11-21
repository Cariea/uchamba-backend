import { Request, Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { StatusError } from '../../../utils/responses/status-error'

export const updateLanguage = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name } = req.body
    const { languageId } = req.params
    const response = await pool.query({
      text: `
        UPDATE languages
        SET 
          name = $1
        WHERE
          language_id = $2
      `,
      values: [name, languageId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se encontro el idioma de id: ${languageId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Usuario modificado correctamente' })
  } catch (error) {
    return handleControllerError(error, res)
  }
}
