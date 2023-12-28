export function getDailyRandomSeed (): number {
  const today = new Date()

  const startOfYear = new Date(today.getFullYear(), 0, 0)
  const dayOfYear = Math.floor((+today - +startOfYear) / 86400000)

  const randomValue = Math.sin(dayOfYear * 0.1)

  const adjustedValue = randomValue

  return adjustedValue
}
