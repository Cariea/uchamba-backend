/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import * as pdf from 'html-pdf'
interface MyPdfOptions extends pdf.CreateOptions {
  format: 'Letter' | 'A3' | 'A4' | 'A5' | 'Legal' | 'Tabloid' | undefined
  orientation: 'portrait' | 'landscape'
  border: {
    top: string
    right: string
    bottom: string
    left: string
  }
}

export const options: MyPdfOptions = {
  format: 'Letter', // Tamaño del papel  8.5 x 11 pulgadas.
  orientation: 'portrait', // Orientación del papel
  border: {
    top: '1cm', // Márgenes superior
    right: '1cm', // Márgenes derecho
    bottom: '1cm', // Márgenes inferior
    left: '1cm' // Márgenes izquierdo
  }
}

export const generatePdf = async (htmlContent: string): Promise<Buffer> => {
  return await new Promise((resolve, reject) => {
    pdf.create(htmlContent, options).toBuffer((err, buffer) => {
      if (err) {
        reject(err)
      } else {
        resolve(buffer)
      }
    })
  })
}
