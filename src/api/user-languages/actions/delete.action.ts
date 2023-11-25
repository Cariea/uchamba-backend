import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { StatusError } from '../../../utils/responses/status-error'

export const deleteUserLanguage = async (
  req: ExtendedRequest, res: Response
): Promise<Response | undefined> => {
  try {
    const { languageId } = req.params
    const response = await pool.query({
      text: `
        DELETE
        FROM users_languages
        WHERE 
          user_id = $1 AND 
          language_id = $2
      `,
      values: [req.user.id, languageId]
    })

    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se encontro el idioma de id: ${languageId} del usuario de id: ${req.user.id as number}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Lenguage eliminado correctamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
