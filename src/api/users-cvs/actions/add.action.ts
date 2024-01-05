import fs from 'fs'
import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { insertEntries } from '../_utils/insert-entries'
import { generateCv } from '../../../utils/generate-cv'
import { getCVPath } from '../_utils/get-cv-path'
import { StatusError } from '../../../utils/responses/status-error'

export const addUserCV = async (
  req: ExtendedRequest,
  res: Response
): Promise<Response | undefined> => {
  try {
    const { careerId, name, entries } = req.body
    const userId: number = req.user.id

    const { rows: userCvResponse } = await pool.query({
      text: `
        INSERT INTO users_cvs (
          user_id,
          ucareer_id,
          name
        ) VALUES ($1, $2, $3)
        RETURNING cv_id
      `,
      values: [userId, careerId, name]
    })

    await insertEntries(userId, userCvResponse[0].cv_id, entries)
    let isCreated: boolean
    let attempts = 0
    do {
      if (attempts > 3) {
        throw new StatusError({
          message: 'Ha ocurrido un error al generar el CV, intente de nuevo más tarde',
          statusCode: STATUS.INTERNAL_SERVER_ERROR
        })
      }
      const timeoutId = setTimeout(function () {
        try {
          throw new StatusError({
            message: 'Tiempo de espera agotado al generar CV',
            statusCode: STATUS.INTERNAL_SERVER_ERROR
          })
        } catch (error: unknown) {
          return handleControllerError(error, res)
        }
      }, 40000)

      isCreated = await generateCv(String(userId), userCvResponse[0].cv_id)

      clearTimeout(timeoutId)

      attempts++
    } while (
      !isCreated &&
      fs.readFileSync(getCVPath(String(userId), userCvResponse[0].cv_id)).length > 0
    )

    return res.status(STATUS.CREATED).json({ message: 'Curriculum Vitae creado correctamente' })
  } catch (error: any) {
    return handleControllerError(error, res)
  }
}
