/* eslint-disable @typescript-eslint/strict-boolean-expressions */
export const createHashMap = (inputString: string): Record<string, string> => {
  const pairsArray = inputString.split(',')
  const hashMap: Record<string, string> = {}

  pairsArray.forEach(pair => {
    const [languageId, level] = pair.split('-')
    if (languageId && level) {
      hashMap[languageId.trim()] = level.trim()
    }
  })

  return hashMap
}
