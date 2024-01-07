/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { StatusError } from '../../../utils/responses/status-error'
import { deleteImage, uploadImage } from '../../../utils/cloudinary'
import { isValidImageFormat } from '../../../utils/validate-image'
import { regenerate } from '../../../utils/regenerate-cv/regenerate'
export const updateUserLanguage = async (
  req: ExtendedRequest,
  res: Response
): Promise<Response> => {
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
    }

    if (req.files?.certificateImage != null) {
      const { rows } = await pool.query({
        text: `
          SELECT
            certificate_image_id
          FROM users_languages
          WHERE
            user_id = $1 AND
            language_id = $2
        `,
        values: [req.user.id, languageId]
      })
      if (rows[0].certificate_image_id != null) {
        await deleteImage(rows[0].certificate_image_id)
      }
      certificateImageResponse = await uploadImage(req.files.certificateImage)
    }
    const response = await pool.query({
      text: `
        UPDATE users_languages
        SET 
          proficient_level = $1,
          certificate_image_id = $4,
          certificate_image_url = $5
        WHERE
          user_id = $2 AND
          language_id = $3
      `,
      values: [proficientLevel, req.user.id, languageId, certificateImageResponse?.public_id, certificateImageResponse?.url]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se encontro el idioma de id: ${languageId} del usuario: ${req.user.id as number}`,
        statusCode: STATUS.NOT_FOUND
      })
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    regenerate()

    return res.status(STATUS.OK).json({ message: 'idioma modificado correctamente' })
  } catch (error) {
    return handleControllerError(error, res)
  }
}
