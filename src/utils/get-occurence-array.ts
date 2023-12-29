export interface Skill {
  id: number
  name: string
}

export function removeDuplicates (inputArray: any[]): any[] {
  const uniqueSet = new Set(inputArray)

  const uniqueArray = Array.from(uniqueSet)

  return uniqueArray
}

export function getSkillOccurrenceArray (
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

export interface SkillOccurrenceWithIndex {
  id: number
  index: number
}

export function getOccurrenceArray (
  ComparisonArray: Skill[],
  InputArray: string[]
): SkillOccurrenceWithIndex[] {
  const occurrenceArray: SkillOccurrenceWithIndex[] = []
  const inputArrayCurated = removeDuplicates(InputArray)

  for (let index = 1; index < inputArrayCurated.length; index++) {
    const value = ComparisonArray.filter(item => item.name === inputArrayCurated[index])
    if (value.length > 0) {
      occurrenceArray.push({
        id: value[0].id,
        index
      })
    }
  }

  return occurrenceArray
}

export function getForInsertionItemsArray (input: any[], comparison: any[]): any[] {
  // Filtramos los elementos que no están en arreglo2
  const insertion = input.filter(elemento => !comparison.includes(elemento))

  return insertion
}
