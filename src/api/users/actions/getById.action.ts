import { Response, Request } from 'express'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { getUserDetailed } from '../_utils/get-user-detailed'

export const getUserById = async (
  req: Request, res: Response
): Promise<Response | undefined> => {
  try {
    const { userId } = req.params

    const userDetailed = await getUserDetailed(userId)

    return res.status(STATUS.OK).json({ ...userDetailed })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
