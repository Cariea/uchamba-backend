import { Filters } from './Filters'
import { Suggestions } from './Suggestions'
import { getCareersSuggestions } from './get-careers-suggestions'
import { getHardSkillsSuggestions } from './get-hard-skills-suggestions'
import { getLanguagesSuggestions } from './get-languages-suggestions'
import { getSoftSkillsSuggestions } from './get-soft-skills-suggestions'

export async function getFiltersSuggestion (
  filters: Filters
): Promise<Suggestions | any> {
  try {
    const careers = await getCareersSuggestions(filters)
    const hardSkills = await getHardSkillsSuggestions(filters)
    const softSkills = await getSoftSkillsSuggestions(filters)
    const languages = await getLanguagesSuggestions(filters)

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
    return {}
  }
}
