import { Request } from 'express'
import { languagesLevelList } from './languagesLevelList'

export const validateFilters = (
  filters: Request['query']): Array<{ [key: string]: string
}> => {
  const {
    careers,
    languages,
    hskills,
    sskills,
    country,
    state,
    city,
    languageLevel
  } = filters
  const levelList = languagesLevelList(languageLevel as string)

  const filtersData = [
    { name: 'careers', value: careers, tableName: 'users_ustudies', columnName: 'ucareer_id', languageLevels: levelList, country, state, city },
    { name: 'languages', value: languages, tableName: 'users_languages', columnName: 'language_id', languageLevels: levelList, country, state, city },
    { name: 'hskills', value: hskills, tableName: 'users_hard_skills', columnName: 'hard_skill_id', languageLevels: levelList, country, state, city },
    { name: 'sskills', value: sskills, tableName: 'users_soft_skills', columnName: 'soft_skill_id', languageLevels: levelList, country, state, city }
  ]

  const validFilters = filtersData
    .filter(filter => filter.value !== undefined)
    .map(({ name, value, tableName, columnName, country, state, city }) => ({ [name]: value, tableName, columnName, country, state, city })) as Array<{ [key: string]: string }>
  return validFilters
}
