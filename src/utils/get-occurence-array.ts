export interface Skill {
  id: number
  name: string
}

export function removeDuplicates (inputArray: any[]): any[] {
  const uniqueSet = new Set(inputArray)

  const uniqueArray = Array.from(uniqueSet)

  return uniqueArray
}

export function getOccurrenceArray (
  ComparisonArray: Skill[],
  InputArray: string[],
  key: keyof Skill
): any[] {
  const occurrenceArray: any[] = []
  const inputArrayCurated = removeDuplicates(InputArray)

  for (const skill of ComparisonArray) {
    const occurrenceCount = inputArrayCurated.filter(name => name === skill.name).length

    if (occurrenceCount === 1) {
      occurrenceArray.push(skill[key])
    }
  }

  return occurrenceArray
}

export function getForInsertionItemsArray (input: any[], comparison: any[]): any[] {
  // Filtramos los elementos que no están en arreglo2
  const insertion = input.filter(elemento => !comparison.includes(elemento))

  return insertion
}
