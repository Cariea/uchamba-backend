import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { StatusError } from '../../../utils/responses/status-error'
import { regenerate } from '../../../utils/regenerate-cv/regenerate'

export const deleteWorkExperience = async (
  req: ExtendedRequest, res: Response
): Promise<Response | undefined> => {
  try {
    const { workExpId } = req.params
    const userId: number = req.user.id
    const response = await pool.query({
      text: `
        DELETE
        FROM work_experiences
        WHERE user_id = $1
        AND work_exp_id = $2
      `,
      values: [userId, workExpId]
    })

    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro con el id de usuario: ${userId} y el id de experiencia de trabajo: ${workExpId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    regenerate()

    return res.status(STATUS.OK).json({ message: 'Experiencia de trabajo eliminada correctamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
