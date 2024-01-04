/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Response } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import camelizeObject from '../../../utils/camelizeObject'
import { ExtendedRequest } from '../../../middlewares/auth'
import { uploadImage } from '../../../utils/cloudinary'
import { isValidImageFormat } from '../../../utils/validate-image'

export const addUserLanguage = async (
  req: ExtendedRequest, res: Response
): Promise<Response | undefined> => {
  try {
    const { languageId } = req.params
    const { proficientLevel } = req.body
    let certificateImageResponse: any = null

    if ((req.files?.certificateImage) != null) {
      const certificateImages = Array.isArray(req.files.certificateImage) ? req.files.certificateImage : [req.files.certificateImage]
      const imageFileName = certificateImages[0].name
      if (!isValidImageFormat(imageFileName)) {
        return res.status(STATUS.BAD_REQUEST).json({ message: 'Intento cargar un tipo de archivo no valido' })
      }
      certificateImageResponse = await uploadImage(req.files.certificateImage)
      if (certificateImageResponse === null) {
        throw new Error('Error al subir el certificado')
      }
    }

    const response = await pool.query({
      text: `
        INSERT INTO users_languages (
          user_id,
          language_id,
          proficient_level,
          certificate_image_id,
          certificate_image_url
        ) 
        VALUES ($1,$2,$3,$4,$5)
        RETURNING
          user_id,
          language_id,
          proficient_level,
          certificate_image_id,
          certificate_image_url,
          TO_CHAR(created_at, 'DD/MM/YYYY - HH12:MI AM') AS created_at
      `,
      values: [req.user.id, languageId, proficientLevel, certificateImageResponse?.public_id, certificateImageResponse?.secure_url]
    })
    return res.status(STATUS.OK).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
