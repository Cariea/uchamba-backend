import { Skill } from '../../../types/cv'

export function getSortedSkillsArray (object1: Skill[], object2: Skill[]): string[] {
  const sortedObject = ([...object1, ...object2].sort((a, b) => a.orderIndex - b.orderIndex))

  const skillsArray = sortedObject.map(item => item.name)

  return skillsArray
}
