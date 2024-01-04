
const validImageFormats = ['jpeg', 'png', 'svg', 'webp', 'jpg']

export const isValidImageFormat = (fileName?: string): Boolean => {
  if (fileName == null) {
    return false
  }
  const extension = fileName.split('.').pop()?.toLowerCase()

  if (extension == null) {
    return false
  }

  return validImageFormats.includes(extension)
}
