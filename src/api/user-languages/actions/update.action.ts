import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { StatusError } from '../../../utils/responses/status-error'

export const updateUserLanguage = async (
  req: ExtendedRequest,
  res: Response
): Promise<Response> => {
  try {
    const { languageId } = req.params
    const { proficientLevel } = req.body
    const response = await pool.query({
      text: `
        UPDATE users_languages
        SET 
          proficient_level = $1
        WHERE
          user_id = $2 AND
          language_id = $3
      `,
      values: [proficientLevel, req.user.id, languageId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se encontro el idioma de id: ${languageId} del usuario: ${req.user.id as number}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'idioma modificado correctamente' })
  } catch (error) {
    return handleControllerError(error, res)
  }
}
