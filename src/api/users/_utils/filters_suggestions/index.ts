import { Suggestions } from './Suggestions'
import { getCareersSuggestions } from './get-careers-suggestions'
import { getHardSkillsSuggestions } from './get-hard-skills-suggestions'
import { getLanguagesSuggestions } from './get-languages-suggestions'
import { getSoftSkillsSuggestions } from './get-soft-skills-suggestions'

export async function getFiltersSuggestion (
  validFilters: Array<{ [key: string]: string }>
): Promise<Suggestions | any> {
  try {
    const careers = await getCareersSuggestions(validFilters)
    const hardSkills = await getHardSkillsSuggestions(validFilters)
    const softSkills = await getSoftSkillsSuggestions(validFilters)
    const languages = await getLanguagesSuggestions(validFilters)

    const suggestions: Suggestions = {
      careers,
      skills: {
        hard: hardSkills,
        soft: softSkills
      },
      languages
    }

    return suggestions
  } catch (error: unknown) {
    console.log(error)
    return {}
  }
}
