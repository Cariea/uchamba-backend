import { Request } from 'express'
import { Suggestions } from './Suggestions'
import { getCareersSuggestions } from './get-careers-suggestions'
import { getHardSkillsSuggestions } from './get-hard-skills-suggestions'
import { getLanguagesSuggestions } from './get-languages-suggestions'
import { getSoftSkillsSuggestions } from './get-soft-skills-suggestions'

export async function getFiltersSuggestion (
  req: Request,
  validFilters: Array<{ [key: string]: string }>
): Promise<Suggestions | any> {
  try {
    const careers = await getCareersSuggestions(req, validFilters)
    const hardSkills = await getHardSkillsSuggestions(req, validFilters)
    const softSkills = await getSoftSkillsSuggestions(req, validFilters)
    const languages = await getLanguagesSuggestions(req, validFilters)

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
