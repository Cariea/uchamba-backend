/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import * as pdf from 'html-pdf'
import { SpawnOptions } from 'child_process'

interface ExtendedChildProcessOptions extends SpawnOptions {
  env?: {
    OPENSSL_CONF: string
  }
}

interface MyPdfOptions extends pdf.CreateOptions {
  format: 'Letter' | 'A3' | 'A4' | 'A5' | 'Legal' | 'Tabloid' | undefined
  orientation: 'portrait' | 'landscape'
  border: {
    top: string
    right: string
    bottom: string
    left: string
  }
  childProcessOptions?: ExtendedChildProcessOptions
}

export const options: MyPdfOptions = {
  format: 'Letter', // Tamaño del papel  8.5 x 11 pulgadas.
  orientation: 'portrait', // Orientación del papel
  border: {
    top: '1cm', // Márgenes superior
    right: '1cm', // Márgenes derecho
    bottom: '1cm', // Márgenes inferior
    left: '1cm' // Márgenes izquierdo
  },
  childProcessOptions: {
    env: {
      OPENSSL_CONF: '/dev/null'
    }
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
