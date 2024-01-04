import path from 'path'
import { uploadPDFFolderPath } from '../../../config/path'

export function getCVPath (userId: string, cvId: string): string {
  return path.join(uploadPDFFolderPath, `user-${userId}-cv-${cvId}.pdf`)
}
