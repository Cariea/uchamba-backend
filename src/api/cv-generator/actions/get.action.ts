import { Response, Request } from 'express'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { STATUS } from '../../../utils/constants'
import { HTML_PDF_URL, FRONTEND_BASE_URL, compiledFunction } from '../../../config'
import { getCVInfo } from '../_utils/get-cv-info'

export const cvGenerator = async (
  req: Request, res: Response
): Promise<Response | undefined> => {
  try {
    const { userId, cvId } = req.params

    const CV = await getCVInfo(userId, cvId)

    const profileLink = `${FRONTEND_BASE_URL as string}/profile/${userId}`

    const htmlContent = compiledFunction({ ...CV, profileLink })
    // ${HTML_PDF_URL as string}
    const pdfResponse = await fetch(`${HTML_PDF_URL as string}/convert`, {
      method: 'POST',
      body: htmlContent,
      headers: {
        'content-type': 'text/html'
      }
    })

    const pdf = Buffer.from(await pdfResponse.arrayBuffer())

    return res.set({ 'Content-Type': 'application/pdf' }).status(STATUS.OK).send(pdf)
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
