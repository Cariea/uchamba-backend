import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { StatusError } from '../../../utils/responses/status-error'

export const deleteProject = async (
  req: ExtendedRequest, res: Response
): Promise<Response | undefined> => {
  try {
    const { projectId } = req.params
    const userId: number = req.user.id
    const response = await pool.query({
      text: `
        DELETE
        FROM projects
        WHERE user_id = _$1
        AND project_id = $2
      `,
      values: [userId, projectId]
    })

    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro con el id de usuario: ${userId} y el id de proyecto: ${projectId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Proyecto eliminado correctamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
