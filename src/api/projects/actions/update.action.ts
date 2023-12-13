import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { uploadImage, deleteImage } from '../../../utils/cloudinary'

export const updateProject = async (
  req: ExtendedRequest,
  res: Response
): Promise<Response | undefined> => {
  try {
    const { name, description, projectUrl, coverImageId, deletedImages } = req.body
    const userId = req.user.id
    const { projectId } = req.params

    if (coverImageId !== null) {
      if (req.files?.coverImage === null) {
        return res.status(STATUS.BAD_REQUEST).json({ message: 'se esperaba un reemplazo para el coverImage' })
      }

      await deleteImage(coverImageId)

      await pool.query({
        text: `
          UPDATE projects
          SET cover_image_id = null,
              cover_image_url = null
          WHERE user_id = $1
          AND project_id = $2
        `,
        values: [userId, projectId]
      })

      await pool.query({
        text: `
          UPDATE projects SET
            name = $1,
            description = $2,
            project_url = $3
          WHERE 
            user_id = $4 AND 
            project_id = $5
        `,
        values: [name, description, projectUrl, userId, projectId]
      })

      if (req.files?.coverImage != null) {
        const projectCoverCloudResponse = await uploadImage(req.files?.coverImage)
        if (projectCoverCloudResponse === null) {
          return res.status(STATUS.BAD_REQUEST).json({ message: 'error al cargar el cover' })
        }

        await pool.query({
          text: `
            UPDATE projects SET
              cover_image_id = $1,
              cover_image_url = $2
            WHERE 
              user_id = $3 AND 
              project_id = $4
          `,
          values: [projectCoverCloudResponse.public_id, projectCoverCloudResponse.url, userId, projectId]
        })
      }
    }

    if (deletedImages.length > 0) {
      for (const image of deletedImages) {
        await deleteImage(image)
        await pool.query({
          text: `
            DELETE
            FROM projects_images
            WHERE 
              user_id = $1 AND 
              project_id = $2 AND
              image_cloud_id = $3
          `,
          values: [userId, projectId, image]
        })
      }
    }

    if (req.files?.images != null) {
      const images = Array.isArray(req.files?.images) ? req.files?.images : [req.files?.images]

      for (const image of images) {
        const cloudinaryResponse = await uploadImage(image)
        if (cloudinaryResponse === null) {
          return res.status(STATUS.BAD_REQUEST).json({ message: 'error al cargar la imagen' })
        }

        await pool.query({
          text: `
              INSERT INTO projects_images (
                user_id,
                project_id,
                image_cloud_id,
                image_url
              )
              VALUES ($1, $2, $3, $4)
              `,
          values: [userId, projectId, cloudinaryResponse.public_id, cloudinaryResponse.url]
        })
      }

      return res.status(STATUS.CREATED).json({ message: 'Proyecto actualizado correctamente' })
    }
    return res.status(STATUS.CREATED).json({ message: 'Debe cargar una imagen' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

// TO_CHAR(created_at, 'YYYY-MM-DD') AS created_at
