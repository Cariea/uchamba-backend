import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { insertEntries } from '../_utils/insert-entries'

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

    return res.status(STATUS.CREATED).json({ message: 'Curriculum Vitae creado correctamente' })
  } catch (error: unknown) {
    console.log(error)
    return handleControllerError(error, res)
  }
}
