import fs from 'fs'

export function uploadCV (fileName: string, pdf: ArrayBuffer): void {
  const toUploadPDF = new DataView(pdf)
  fs.writeFileSync(fileName, toUploadPDF)
}
