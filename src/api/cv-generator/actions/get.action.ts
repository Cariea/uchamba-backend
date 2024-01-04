import { Response, Request } from 'express'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { STATUS } from '../../../utils/constants'
import fs from 'fs'
import { generateCv } from '../../../utils/generate-cv'
import { StatusError } from '../../../utils/responses/status-error'
import { getCVPath } from '../../users-cvs/_utils/get-cv-path'
import { pool } from '../../../database'

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

    const cvPath = getCVPath(userId, cvId)

    if (!fs.existsSync(cvPath)) {
      if (await generateCv(userId, cvId)) {
        const pdf = fs.readFileSync(cvPath)
        return res.set({ 'Content-Type': 'application/pdf' }).status(STATUS.OK).send(pdf)
      }
      throw new StatusError({
        message: 'Error generando el cv',
        statusCode: STATUS.INTERNAL_SERVER_ERROR
      })
    }
    const pdf = fs.readFileSync(getCVPath(userId, cvId))
    return res.set({ 'Content-Type': 'application/pdf' }).status(STATUS.OK).send(pdf)
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
