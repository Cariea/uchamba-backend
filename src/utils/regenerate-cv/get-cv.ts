import fs from 'fs'
import { generateCv } from './generate-cv'
import { getCVPath } from '../../api/users-cvs/_utils/get-cv-path'
import { uploadCV } from './upload-cv'

export async function getCv (userId: string, cvId: string): Promise<Buffer> {
  const cvPath = getCVPath(userId, cvId)
  if (!fs.existsSync(cvPath)) {
    const pdf = await generateCv(userId, cvId)
    if (pdf !== null) {
      uploadCV(cvPath, pdf)
    }
  }

  const pdf = fs.readFileSync(cvPath)

  return pdf
}
