import { WorkExperience } from '../../../types/cv'
import { monthToSpanish } from '../../../utils/month-to-spanish'

export function convertMonthToSpanish (workExperiences: WorkExperience[]): WorkExperience[] {
  return workExperiences.map((workExperience: WorkExperience) => {
    const [entryMonth, entryYear] = workExperience.entryDate.split(' ')

    if (workExperience.departureDate === null) {
      return {
        ...workExperience,
        entryDate: `${monthToSpanish(entryMonth)} ${entryYear}`
      }
    }

    const [departureMonth, departureYear] = workExperience.departureDate.split(' ')
    return {
      ...workExperience,
      entryDate: `${monthToSpanish(entryMonth)} ${entryYear}`,
      departureDate: `${monthToSpanish(departureMonth)} ${departureYear}`
    }
  })
}
