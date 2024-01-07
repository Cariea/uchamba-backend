import fs from 'fs'

export function deleteCv (cvPath: string): void {
  fs.rmSync(cvPath)
}
