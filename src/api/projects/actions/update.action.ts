import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { StatusError } from '../../../utils/responses/status-error'

export const updateProject = async (
  req: ExtendedRequest,
  res: Response
): Promise<Response> => {
  try {
    const { name, description, projectUrl } = req.body
    const { projectId } = req.params
    const userId: number = req.user.id

    if (projectUrl !== '') {
      // Verficar la existencia del proyecto antes de crear

      const { rows } = await pool.query({
        text: `
          SELECT *
          FROM projects
          WHERE user_id = $1
          AND name = $2
          OR project_url = $3
        `,
        values: [userId, name, projectUrl]
      })

      if (rows.length > 0) {
        throw new StatusError({
          message: 'Ya existe otro proyecto con el mismo nombre o con el mismo url',
          statusCode: STATUS.BAD_REQUEST
        })
      }
    }

    if (projectUrl === '') {
      // Verficar la existencia del proyecto antes de crear

      const { rows } = await pool.query({
        text: `
          SELECT *
          FROM projects
          WHERE user_id = $1
          AND name = $2
        `,
        values: [userId, name]
      })

      if (rows.length > 0) {
        throw new StatusError({
          message: 'Ya existe otro proyecto con el mismo nombre',
          statusCode: STATUS.BAD_REQUEST
        })
      }
    }

    const response = await pool.query({
      text: `
        UPDATE projects
        SET 
          name = $1,
          description = $2,
          project_url = $3
        WHERE user_id = $4
        AND project_id = $5
      `,
      values: [name, description, projectUrl, userId, projectId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro con el id de usuario: ${userId} y el id de proyecto: ${projectId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Proyecto modificado correctamente' })
  } catch (error) {
    return handleControllerError(error, res)
  }
}
