/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { uploadImage, deleteImage } from '../../../utils/cloudinary'
import { isValidImageFormat } from '../../../utils/validate-image'

export const updateProject = async (
  req: ExtendedRequest,
  res: Response
): Promise<Response | undefined> => {
  try {
    const { name, description, projectUrl, coverImageId } = req.body
    const userId = req.user.id
    const { projectId } = req.params

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

    if (coverImageId === undefined && req.body.deletedImages === undefined) {
      return res.status(STATUS.CREATED).json({ message: 'Proyecto actualizado correctamente' })
    }

    if (coverImageId !== undefined) {
      if (req.files?.coverImage === undefined) {
        return res.status(STATUS.BAD_REQUEST).json({ message: 'se esperaba un reemplazo para el coverImage' })
      }
      if ((req.files?.coverImage) != null) {
        const coverImages = Array.isArray(req.files.coverImage) ? req.files.coverImage : [req.files.coverImage]
        const imageFileName = coverImages[0].name
        if (!isValidImageFormat(imageFileName)) {
          return res.status(STATUS.BAD_REQUEST).json({ message: 'Intento cargar un tipo de archivo no valido' })
        }
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

      if (req.files?.coverImage !== undefined) {
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

    const deletedImages = Array.isArray(req.body.deletedImages) ? req.body.deletedImages : [req.body.deletedImages]

    if (deletedImages?.length > 0) {
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

    if (req.files?.images !== undefined) {
      const images = Array.isArray(req.files?.images) ? req.files?.images : [req.files?.images]
      for (const image of images) {
        const imageFileName = image.name
        if (!isValidImageFormat(imageFileName)) {
          return res.status(STATUS.BAD_REQUEST).json({ message: 'Intento cargar un tipo de archivo no valido' })
        }
      }
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
    }

    return res.status(STATUS.CREATED).json({ message: 'Proyecto actualizado correctamente' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
