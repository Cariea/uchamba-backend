import fs from 'fs'
import { uploadPDFFolderPath } from '../config/path'

export function validatePDFFolder (): void {
  if (!fs.existsSync(uploadPDFFolderPath)) {
    fs.mkdirSync(uploadPDFFolderPath, { recursive: true })
  }
}
