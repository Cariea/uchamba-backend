import { createHashMap } from '../generateLanguageLevelPair'
import { languagesLevelList } from '../languagesLevelList'
import { Filters } from './Filters'

export function queryConstructor (
  filters: Filters,
  exceptionTable: string | undefined
): string {
  let nameFilter = ''

  let countryFilter = ''
  let stateFilter = ''
  let cityFilter = ''

  let careersJoinAttachment = ''
  let careersActiveFilters = ''

  let languagesJoinAttachment = ''
  let languagesActiveFilters = ''

  let hardSkillsJoinAttachment = ''
  let hardSkillsActiveFilters = ''
  let inclusiveHardAttachment = ''

  let softSkillsJoinAttachment = ''
  let softSkillsActiveFilters = ''
  let inclusiveSoftAttachment = ''

  const havingAttachment = `
    GROUP BY u.user_id
    HAVING
  `
  let needsHaving = false

  if (filters.name !== null) {
    nameFilter += `u.name LIKE '%${String(filters.name)}%'`
  }

  if (filters.country !== null) {
    countryFilter += `u.country LIKE '%${filters.country}%'`
  }

  if (filters.state !== null) {
    stateFilter += `u.state LIKE '%${filters.state}%'`
  }

  if (filters.city !== null) {
    cityFilter += `u.city LIKE '%${filters.city}%'`
  }

  if (exceptionTable !== 'careers' && filters.careers !== null) {
    careersActiveFilters = `uc.ucareer_id IN (${filters.careers})`
    careersJoinAttachment = 'INNER JOIN users_ustudies AS uc ON u.user_id = uc.user_id'
  }

  if (exceptionTable !== 'languages' && filters.languages !== null) {
    const pairs = createHashMap(filters.languages)
    for (const languageId in pairs) {
      const levels = languagesLevelList(pairs[languageId])
      if (filters.inclusiveLang === 'true') {
        languagesActiveFilters += `
          EXISTS(
            SELECT 1
            FROM users_languages
            WHERE
              users_languages.user_id = u.user_id AND
              users_languages.language_id = ${languageId} AND 
              users_languages.proficient_level IN (${levels})
          ) AND 
        `
      } else {
        languagesActiveFilters +=
          `ul.language_id = ${languageId} AND ul.proficient_level IN (${levels}) OR `
      }
    }
    if (filters.inclusiveLang === 'true') {
      languagesActiveFilters = languagesActiveFilters.replace(/\s+/g, ' ').trim()
    }
    languagesActiveFilters = languagesActiveFilters.slice(
      0, languagesActiveFilters.length - 4
    )
    languagesJoinAttachment = 'INNER JOIN users_languages AS ul ON u.user_id = ul.user_id'
  }

  if (exceptionTable !== 'hskills' && filters.hskills !== null) {
    if (filters.inclusiveH === 'true') {
      needsHaving = true
      const ids = filters.hskills.split(',')
      inclusiveHardAttachment += ` COUNT(DISTINCT uhs.hard_skill_id) = ${ids.length}`
    }
    hardSkillsActiveFilters += `uhs.hard_skill_id IN (${filters.hskills})`
    hardSkillsJoinAttachment = 'INNER JOIN users_hard_skills AS uhs ON u.user_id = uhs.user_id'
  }

  if (exceptionTable !== 'sskills' && filters.sskills !== null) {
    if (filters.inclusiveS === 'true') {
      needsHaving = true
      const ids = filters.sskills.split(',')
      inclusiveSoftAttachment += ` COUNT(DISTINCT uss.soft_skill_id) = ${ids.length}`
    }
    softSkillsActiveFilters +=
      `uss.soft_skill_id IN (${filters.sskills})`
    softSkillsJoinAttachment = 'INNER JOIN users_soft_skills AS uss ON u.user_id = uss.user_id'
  }

  const defaultValidation = `
    SELECT users.user_id
    FROM users
    INNER JOIN users_cvs ON
      users.user_id = users_cvs.user_id
    WHERE users.is_active = TRUE
  `

  const resultantFilters = [
    nameFilter,
    countryFilter,
    stateFilter,
    cityFilter,
    careersActiveFilters,
    languagesActiveFilters,
    hardSkillsActiveFilters,
    softSkillsActiveFilters
  ].reduce((acc, current) => {
    if (current !== '') {
      return `${acc} AND ${current}`
    }
    return acc
  }, '')

  const resultantInclusiveAttachment = [
    inclusiveHardAttachment,
    inclusiveSoftAttachment
  ].reduce((acc, current, index, array) => {
    if (current !== '') {
      acc += `${current} AND `
    }

    if (index === array.length - 1) {
      acc = acc.slice(0, acc.length - 5)
    }

    return acc
  }, '')

  let resultantQuery = `
    SELECT DISTINCT u.user_id
    FROM users AS u
    ${careersJoinAttachment}
    ${languagesJoinAttachment}
    ${hardSkillsJoinAttachment}
    ${softSkillsJoinAttachment}
    WHERE u.user_id IN (${defaultValidation})
    ${resultantFilters}
    ${needsHaving ? havingAttachment : ''}
    ${resultantInclusiveAttachment}
    ORDER BY u.user_id
  `

  resultantQuery = resultantQuery.replace(/\s+/g, ' ').trim()

  return resultantQuery
}
