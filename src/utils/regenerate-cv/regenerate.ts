import { getCVPath } from '../../api/users-cvs/_utils/get-cv-path'
import { pool } from '../../database'
import { generateCv } from './generate-cv'
import { uploadCV } from './upload-cv'

export async function regenerate (): Promise<void> {
  try {
    const { rows } = await pool.query({
      text: `
      SELECT DISTINCT
        user_id, 
        cv_id
      FROM cv_queue
      `
    })

    for (const cv of rows) {
      const pdf = await generateCv(cv.user_id, cv.cv_id)
      if (pdf !== null) {
        uploadCV(getCVPath(cv.user_id, cv.cv_id), pdf)
      }
    }
  } catch (error) {
    console.log(error)
  }
}
