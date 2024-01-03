import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { insertEntries } from '../_utils/insert-entries'
import { tidyUpCV } from '../_utils/tidy-up-cv'

export const updateUserCV = async (
  req: ExtendedRequest,
  res: Response
): Promise<Response | undefined> => {
  try {
    const { careerId, name, entries } = req.body
    const userId: number = req.user.id
    const { cvId } = req.params

    const { rows: userCvResponse } = await pool.query({
      text: `
        UPDATE users_cvs SET
          ucareer_id = $2,
          name = $3
        WHERE cv_id = $1
        RETURNING cv_id
      `,
      values: [cvId, careerId, name]
    })

    await tidyUpCV(Number(cvId))

    await insertEntries(userId, userCvResponse[0].cv_id, entries)

    return res.status(STATUS.CREATED).json({ message: 'Curriculum Vitae creado correctamente' })
  } catch (error: any) {
    if (error.code === '23503') {
      return res.status(STATUS.CONFLICT).json({ message: 'Está intentando crearle un cv a alguien que no se tiene registrado' })
    }
    return handleControllerError(error, res)
  }
}
