import { pool } from '../../../database'
import { Response, Request } from 'express'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { STATUS } from '../../../utils/constants'
import { StatusError } from '../../../utils/responses/status-error'
import { getCv } from '../../../utils/regenerate-cv/get-cv'

export const cvGenerator = async (
  req: Request, res: Response
): Promise<Response | undefined> => {
  try {
    const { userId, cvId } = req.params

    const { rows: response } = await pool.query({
      text: `
        SELECT COUNT(*)
        FROM users_cvs
        WHERE
          user_id = $1 AND
          cv_id = $2
      `,
      values: [userId, cvId]
    })

    if (Number(response[0].count) === 0) {
      throw new StatusError({
        message: 'No existe el Curriculum Vitae',
        statusCode: STATUS.NOT_FOUND
      })
    }

    const pdf = await getCv(userId, cvId)

    return res.set({ 'Content-Type': 'application/pdf' }).status(STATUS.OK).send(pdf)
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
