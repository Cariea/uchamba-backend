import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { StatusError } from '../../../utils/responses/status-error'

export const updateForeignStudie = async (
  req: ExtendedRequest,
  res: Response
): Promise<Response> => {
  try {
    const { foreignStudyId } = req.params
    const { name, universityName, degree, graduationDate } = req.body
    const response = await pool.query({
      text: `
        UPDATE foreign_studies
        SET 
          name = $1,
          university_name = $2,
          degree = $3,
          graduation_date = $4
        WHERE
          user_id = $5 AND
          foreign_study_id = $6
      `,
      values: [name, universityName, degree, graduationDate, req.user.id, foreignStudyId]
    })
    if (response.rowCount === 0) {
      throw new StatusError({
        message: `No se encontro el estudio: ${foreignStudyId} del usuario: ${req.user.id as number}`,
        statusCode: STATUS.NOT_FOUND
      })
    }
    return res.status(STATUS.OK).json({ message: 'Estudio foraneo modificado correctamente' })
  } catch (error) {
    return handleControllerError(error, res)
  }
}
