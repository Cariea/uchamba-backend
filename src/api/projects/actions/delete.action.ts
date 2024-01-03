import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { StatusError } from '../../../utils/responses/status-error'
import { deleteImage } from '../../../utils/cloudinary'
export const deleteProject = async (
  req: ExtendedRequest, res: Response
): Promise<Response | undefined> => {
  try {
    const { projectId } = req.params
    const userId: number = req.user.id

    const { rows } = await pool.query({
      text: `
        SELECT
          cover_image_id
        FROM projects
        WHERE 
          user_id = $1 AND 
          project_id = $2
      `,
      values: [userId, projectId]
    })

    for (const row of rows) {
      if (row.cover_image_id != null) {
        await deleteImage(row.cover_image_id)
      }
    }

    const { rows: pImages } = await pool.query({
      text: `
        select image_cloud_id
        FROM projects_images
        WHERE 
          user_id = $1 AND 
          project_id = $2
      `,
      values: [userId, projectId]
    })
    for (const row of pImages) {
      if (row.image_cloud_id != null) {
        await deleteImage(row.image_cloud_id)
      }
    }
    const response = await pool.query({
      text: `
        DELETE
        FROM projects
        WHERE 
          user_id = $1 AND 
          project_id = $2
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
