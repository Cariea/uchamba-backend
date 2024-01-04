/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { StatusError } from '../../../utils/responses/status-error'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import camelizeObject from '../../../utils/camelizeObject'
import { uploadImage } from '../../../utils/cloudinary'
import { isValidImageFormat } from '../../../utils/validate-image'

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
          WHERE 
            user_id = $1 AND 
            name = $2 OR 
            project_url = $3
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

    if (req.files?.coverImage != null && req.files?.images != null) {
      const coverImages = Array.isArray(req.files?.coverImage) ? req.files?.coverImage : [req.files?.coverImage]
      for (const coverImage of coverImages) {
        const coverImageFileName: string = coverImage.name
        if (!isValidImageFormat(coverImageFileName)) {
          return res.status(STATUS.BAD_REQUEST).json({ message: 'Intento cargar un tipo de archivo no valido' })
        }
      }
      const images = Array.isArray(req.files?.images) ? req.files?.images : [req.files?.images]
      for (const image of images) {
        const imageFileName: string = image.name
        if (!isValidImageFormat(imageFileName)) {
          return res.status(STATUS.BAD_REQUEST).json({ message: 'Intento cargar un tipo de archivo no valido' })
        }
      }

      const projectCoverCloudResponse = await uploadImage(req.files?.coverImage)
      if (projectCoverCloudResponse === null) {
        return res.status(STATUS.BAD_REQUEST).json({ message: 'error al cargar el cover' })
      }
      const response = await pool.query({
        text: `
          INSERT INTO projects (
            user_id,
            name,
            description,
            cover_image_id,
            cover_image_url,
            project_url
          )
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING
            project_id,
            name,
            description,
            cover_image_id,
            cover_image_url,
            project_url
        `,
        values: [userId, name, description, projectCoverCloudResponse.public_id, projectCoverCloudResponse.url, projectUrl]
      })
      console.log(response.rows[0].cover_image_id, response.rows[0].cover_image_url)
      const responseImages = []

      for (const image of images) {
        const cloudinaryResponse = await uploadImage(image)
        if (cloudinaryResponse === null) {
          return res.status(STATUS.BAD_REQUEST).json({ message: 'error al cargar la imagen' })
        }
        const responseI = await pool.query({
          text: `
              INSERT INTO projects_images (
                user_id,
                project_id,
                image_cloud_id,
                image_url
              )
              VALUES ($1, $2, $3, $4)
              RETURNING
                image_cloud_id,
                image_url,
                created_at
              `,
          values: [req.user.id, response.rows[0].project_id, cloudinaryResponse.public_id, cloudinaryResponse.url]
        })
        responseImages.push(responseI.rows[0])
      }

      const allResponse = {
        ...response.rows[0],
        images: responseImages
      }
      return res.status(STATUS.CREATED).json(camelizeObject(allResponse))
    }
    return res.status(STATUS.CREATED).json({ message: 'Debe cargar una imagen' })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
