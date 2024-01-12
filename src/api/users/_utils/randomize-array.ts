export function randomizeArray<T> (arr: T[]): T[] {
  // Utilizamos el algoritmo de Fisher-Yates para randomizar el arreglo
  const shuffledArray = [...arr]

  const seed = getDailyRandomSeed()

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    // Ajustamos la semilla para que esté entre 0 y 1
    const adjustedSeed = (seed + 1) / 2

    const j = Math.floor(adjustedSeed * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
  }

  return shuffledArray
}

export function getDailyRandomSeed (): number {
  const today = new Date()

  const startOfYear = new Date(today.getFullYear(), 0, 0)
  const dayOfYear = Math.floor((+today - +startOfYear) / 86400000)

  const randomValue = Math.sin(dayOfYear * 0.1)

  const adjustedValue = randomValue

  return adjustedValue
}
