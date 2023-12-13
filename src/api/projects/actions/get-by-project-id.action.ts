import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { StatusError } from '../../../utils/responses/status-error'

export const getByProjectId = async (
  req: ExtendedRequest, res: Response
): Promise<Response | undefined> => {
  try {
    const { projectId } = req.params
    const { rows: projectResponse } = await pool.query({
      text: `
        SELECT
          p.user_id,
          p.project_id,
          p.name AS project_name,
          p.description AS project_description,
          p.project_url,
          p.cover_image_id,
          p.cover_image_url,
          pi.image_cloud_id,
          pi.image_url AS project_image_url
        FROM
          projects p
        LEFT JOIN
          projects_images pi ON p.user_id = pi.user_id AND 
          p.project_id = pi.project_id
        WHERE
          p.user_id = $1 AND 
          p.project_id = $2;
      `,
      values: [req.user.id, projectId]
    })

    if (projectResponse.length === 0) {
      throw new StatusError({
        message: `No se pudo encontrar el registro con el id de usuario: ${req.user.id as number} y el id de proyecto: ${projectId}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    const allResponse = {
      userId: projectResponse[0].user_id,
      projectId: projectResponse[0].project_id,
      projectName: projectResponse[0].project_name,
      projectDescription: projectResponse[0].project_description,
      projectUrl: projectResponse[0].project_url,
      coverImageId: projectResponse[0].cover_image_id,
      coverImageUrl: projectResponse[0].cover_image_url,
      images: projectResponse.map((row) => ({
        imageCloudId: row.image_cloud_id,
        imageUrl: row.project_image_url
      }))
    }
    return res.status(STATUS.OK).json(allResponse)
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
