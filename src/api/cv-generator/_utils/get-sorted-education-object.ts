import { Education } from '../../../types/cv'

export function getSortedEducationObject (
  object1: Education[],
  object2: Education[]
): Education[] {
  const sortedObject = ([...object1, ...object2].sort((a, b) => Number(b.graduationYear) - Number(a.graduationYear)))

  return sortedObject
}
