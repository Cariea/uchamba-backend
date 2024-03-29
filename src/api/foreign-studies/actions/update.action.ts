import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { StatusError } from '../../../utils/responses/status-error'
import { regenerate } from '../../../utils/regenerate-cv/regenerate'

export const updateForeignStudie = async (
  req: ExtendedRequest,
  res: Response
): Promise<Response> => {
  try {
    const { foreignStudyId } = req.params
    const { name, universityName, degree, graduationYear } = req.body
    const formattedDate = `${graduationYear as string}-01-01`

    const response = await pool.query({
      text: `
        UPDATE foreign_studies
        SET 
          name = $1,
          university_name = $2,
          degree = $3,
          graduation_year = $4
        WHERE
          user_id = $5 AND
          foreign_study_id = $6
      `,
      values: [name, universityName, degree, formattedDate, req.user.id, foreignStudyId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se encontro el estudio: ${foreignStudyId} del usuario: ${req.user.id as number}`,
        statusCode: STATUS.NOT_FOUND
      })
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    regenerate()

    return res.status(STATUS.OK).json({ message: 'Estudio foraneo modificado correctamente' })
  } catch (error) {
    return handleControllerError(error, res)
  }
}
