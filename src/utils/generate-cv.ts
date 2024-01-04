import { FRONTEND_BASE_URL, HTML_PDF_URL, compiledFunction } from '../config'
import { getCVGenerationData } from '../api/cv-generator/_utils/get-cv-generation-data'
import fs from 'fs'
import { getCVPath } from '../api/users-cvs/_utils/get-cv-path'

export async function generateCv (
  userId: string,
  cvId: string
): Promise<boolean> {
  try {
    const CV = await getCVGenerationData(userId, cvId)

    const profileLink = `${FRONTEND_BASE_URL as string}/profile/${userId}`

    const htmlContent = compiledFunction({ ...CV, profileLink })

    const pdfResponse = await fetch(`${HTML_PDF_URL as string}/convert`, {
      method: 'POST',
      body: htmlContent,
      headers: {
        'content-type': 'text/html'
      }
    })

    const pdf = Buffer.from(await pdfResponse.arrayBuffer())

    await fs.promises.writeFile(getCVPath(userId, cvId), pdf)

    return true
  } catch (error) {
    return false
  }
}
