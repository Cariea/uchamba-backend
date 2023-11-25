import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { StatusError } from '../../../utils/responses/status-error'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import camelizeObject from '../../../utils/camelizeObject'

export const addProject = async (
  req: ExtendedRequest,
  res: Response
): Promise<Response | undefined> => {
  try {
    const { name, description, projectUrl } = req.body
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
    // --

    const response = await pool.query({
      text: `
        INSERT INTO projects (
          user_id,
          name,
          description,
          project_url
        )
        VALUES ($1, $2, $3, $4)
        RETURNING
          user_id,
          project_id,
          name,
          description,
          project_url
      `,
      values: [userId, name, description, projectUrl]
    })

    return res.status(STATUS.CREATED).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

// TO_CHAR(created_at, 'YYYY-MM-DD') AS created_at
