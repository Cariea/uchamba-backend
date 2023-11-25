import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import camelizeObject from '../../../utils/camelizeObject'
import { StatusError } from '../../../utils/responses/status-error'

export const getByProjectId = async (
  req: ExtendedRequest, res: Response
): Promise<Response | undefined> => {
  try {
    const { projectId } = req.params
    const response = await pool.query({
      text: `
        SELECT
          project_id,
          name,
          description,
          project_url,
          TO_CHAR(created_at, 'DD/MM/YYYY - HH12:MI AM') AS created_at,
          TO_CHAR(updated_at, 'DD/MM/YYYY - HH12:MI AM') AS updated_at
        FROM projects
        WHERE user_id = $1
        AND project_id = $2
      `,
      values: [req.user.id, projectId]
    })

    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro con el id de usuario: ${req.user.id as number} y el id de proyecto: ${projectId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    console.log(error)
    return handleControllerError(error, res)
  }
}
