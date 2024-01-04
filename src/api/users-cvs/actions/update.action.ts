import fs from 'fs'
import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { insertEntries } from '../_utils/insert-entries'
import { tidyUpCV } from '../_utils/tidy-up-cv'
import { generateCv } from '../../../utils/generate-cv'
import { getCVPath } from '../_utils/get-cv-path'
import { StatusError } from '../../../utils/responses/status-error'

export const updateUserCV = async (
  req: ExtendedRequest,
  res: Response
): Promise<Response | undefined> => {
  try {
    const { careerId, name, entries } = req.body
    const userId: number = req.user.id
    const { cvId } = req.params

    await pool.query({
      text: `
        UPDATE users_cvs SET
          ucareer_id = $2,
          name = $3
        WHERE cv_id = $1
      `,
      values: [cvId, careerId, name]
    })

    await tidyUpCV(Number(cvId))
    await insertEntries(userId, Number(cvId), entries)
    let isCreated: boolean
    let attempts = 0
    do {
      if (attempts > 3) {
        throw new StatusError({
          message: 'Ha ocurrido un error al generar el CV, intente de nuevo más tarde',
          statusCode: STATUS.INTERNAL_SERVER_ERROR
        })
      }
      isCreated = await generateCv(String(userId), String(cvId))
      attempts++
    } while (
      !isCreated &&
      fs.readFileSync(getCVPath(String(userId), String(cvId))).length > 0
    )

    return res.status(STATUS.CREATED).json({ message: 'Curriculum Vitae creado correctamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
