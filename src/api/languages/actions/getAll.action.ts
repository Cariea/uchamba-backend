import { Response, Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import camelizeObject from '../../../utils/camelizeObject'

export const getAllLanguages = async (
  _req: Request, res: Response
): Promise<Response | undefined> => {
  try {
    const { rows } = await pool.query({
      text: `
        SELECT
          language_id,
          name
        FROM languages
      `
    })

    return res.status(STATUS.OK).json(camelizeObject(rows))
  } catch (error: unknown) {
    console.error(error)
    return handleControllerError(error, res)
  }
}
