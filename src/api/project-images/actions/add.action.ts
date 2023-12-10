import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { uploadImage } from '../../../utils/cloudinary'

export const addProjectImage = async (
  req: ExtendedRequest,
  res: Response
): Promise<Response | undefined> => {
  try {
    const { projectId } = req.params
    // const { name } = req.body
    if ((req.files?.image) != null) {
      const cloudinaryResponse = await uploadImage(req.files?.image)
      if (cloudinaryResponse === null) {
        return res.status(STATUS.BAD_REQUEST).json({ message: 'error al cargar la imagen' })
      }
      const response = await pool.query({
        text: `
        INSERT INTO projects_images (
          user_id,
          project_id,
          image_url
        )
        VALUES ($1, $2, $3)
        RETURNING
          user_id,
          project_id,
          image_url,
          created_at
      `,
        values: [req.user.id, projectId, cloudinaryResponse.url]
      })
      return res.status(STATUS.CREATED).json(response.rows[0])
    }
    return res.status(STATUS.BAD_REQUEST).json({ message: 'Debe cargar una imagen' })
  } catch (error: unknown) {
    console.log(error)
    return handleControllerError(error, res)
  }
}

// TO_CHAR(created_at, 'YYYY-MM-DD') AS created_at
