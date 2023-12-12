import { Response } from 'express'
import { ExtendedRequest } from '../../../middlewares/auth'
import { STATUS } from '../../../utils/constants'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { getUserDetailed } from '../_utils/get-user-detailed'

export const getMe = async (
  req: ExtendedRequest, res: Response
): Promise<Response | undefined> => {
  try {
    const { id: userId } = req.user

    const userDetailed = await getUserDetailed(userId)

    return res.status(STATUS.OK).json({ ...userDetailed })
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
