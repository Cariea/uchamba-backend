import { FRONTEND_BASE_URL, HTML_PDF_TOKEN, HTML_PDF_URL, compiledFunction } from '../config'
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

    const response = await fetch(String(HTML_PDF_URL), {
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

    const responseData = await response.json()
    if (responseData.FileUrl !== undefined) {
      const pdf = await fetch(responseData.FileUrl, {
        method: 'GET'
      })

      const sexo = await pdf.arrayBuffer()
      const masSexo = new DataView(sexo)

      fs.writeFileSync(getCVPath(userId, cvId), masSexo)
    } else {
      console.error('La descarga no fue exitosa. Mensaje:', responseData.Message)
    }

    return true
  } catch (error) {
    return false
  }
}
