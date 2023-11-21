import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { StatusError } from '../../../utils/responses/status-error'

export const deleteForeignStudie = async (
  req: ExtendedRequest, res: Response
): Promise<Response | undefined> => {
  try {
    const { foreignStudyId } = req.params
    const response = await pool.query({
      text: `
        DELETE
        FROM foreign_studies
        WHERE user_id = $1 and foreign_study_id = $2
      `,
      values: [req.user.id, foreignStudyId]
    })

    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se encontro el estudio foraneo: ${foreignStudyId} del usuario: ${req.user.id as number}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Estudio foraneo eliminado correctamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
