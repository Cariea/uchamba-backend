/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import { CLOUDINARY_API, CLOUDINARY_CLOUD, CLOUDINARY_SECRET } from '../config'

import { UploadedFile } from 'express-fileupload'

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD,
  api_key: CLOUDINARY_API,
  api_secret: CLOUDINARY_SECRET,
  secure: true
})
type MyFile = Express.Multer.File | UploadedFile

export async function uploadImage (file: MyFile | MyFile[]): Promise<UploadApiResponse> {
  const filesArray = Array.isArray(file) ? file : [file]

  const imageBuffer = 'buffer' in filesArray[0] ? filesArray[0].buffer : filesArray[0].data

  const base64Image = imageBuffer.toString('base64')

  return await cloudinary.uploader.upload(`data:image/webp;base64,${base64Image}`, {
    folder: 'replit'
  })
}
