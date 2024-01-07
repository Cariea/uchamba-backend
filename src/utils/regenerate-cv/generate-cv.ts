/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { getCVGenerationData } from '../../api/cv-generator/_utils/get-cv-generation-data'
import {
  FRONTEND_BASE_URL,
  HTML_PDF_TOKEN,
  HTML_PDF_URL,
  compiledFunction
} from '../../config'

export async function generateCv (
  userId: string,
  cvId: string
): Promise<ArrayBuffer | null> {
  const CV = await getCVGenerationData(userId, cvId)

  const profileLink = `${FRONTEND_BASE_URL as string}/profile/${userId}`

  const htmlContent = compiledFunction({ ...CV, profileLink })

  const apiResponse = await fetch(String(HTML_PDF_URL), {
    method: 'POST',
    headers: {
      Authorization: `${String(HTML_PDF_TOKEN)}`
    },
    body: JSON.stringify({
      html: htmlContent,
      filename: 'Test',
      options: {
        pageSize: 'Letter',
        marginTop: '30px',
        marginBottom: '30px',
        marginRight: '50px',
        marginLeft: '50px'
      }
    })
  })

  const responseData = await apiResponse.json()
  if (responseData.FileUrl) {
    const pdf = await fetch(responseData.FileUrl, {
      method: 'GET'
    })

    return await pdf.arrayBuffer()
  }

  return null
}
