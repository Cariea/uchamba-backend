import { Response } from 'express'
import { ExtendedRequest } from '../../middlewares/auth'
import { STATUS } from '../../utils/constants'
import { handleControllerError } from '../../utils/responses/handleControllerError'
import { getHSOccurrencesArrays } from '../users-cvs/_utils/get-hs-occurrences-arrays'

export const testEP = async (
  req: ExtendedRequest,
  res: Response
): Promise<Response | undefined> => {
  try {
    const { skills } = req.body

    if (skills.length === 0) {
      return res.status(STATUS.BAD_REQUEST).json({ message: 'Test EP Finalizado' })
    }

    await getHSOccurrencesArrays(4, skills)

    return res.status(STATUS.CREATED).json({ message: 'Test EP Finalizado' })
  } catch (error: unknown) {
    console.log(error)
    return handleControllerError(error, res)
  }
}
