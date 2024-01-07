import { Request } from 'express'
import { createHashMap } from '../generateLanguageLevelPair'
import { languagesLevelList } from '../languagesLevelList'

export function queryConstructor (
  req: Request,
  validFilters: Array<{ [key: string]: string }>,
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

  if (req.query.name !== undefined) {
    nameFilter += `u.name LIKE '%${String(req.query.name)}%'`
  }

  if (validFilters.length > 0) {
    if (validFilters[0].country !== undefined) {
      countryFilter += `u.country LIKE '%${validFilters[0].country}%'`
    }
    if (validFilters[0].state !== undefined) {
      stateFilter += `u.state LIKE '%${validFilters[0].state}%'`
    }
    if (validFilters[0].city !== undefined) {
      cityFilter += `u.city LIKE '%${validFilters[0].city}%'`
    }
    for (const filter of validFilters) {
      if (exceptionTable !== 'careers' && Object.keys(filter)[0] === 'careers') {
        careersActiveFilters =
          `uc.ucareer_id IN (${filter[Object.keys(filter)[0]]})`
        careersJoinAttachment =
          'INNER JOIN users_ustudies AS uc ON u.user_id = uc.user_id'
      }
      if (exceptionTable !== 'languages' && Object.keys(filter)[0] === 'languages') {
        const pairs = createHashMap(filter[Object.keys(filter)[0]])
        for (const languageId in pairs) {
          const levels = languagesLevelList(pairs[languageId])
          if (req.query.inclusiveLang === 'true') {
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
        if (req.query.inclusiveLang === 'true') {
          languagesActiveFilters = languagesActiveFilters.replace(/\s+/g, ' ').trim()
        }
        languagesActiveFilters = languagesActiveFilters.slice(0,
          languagesActiveFilters.length - 4)
        languagesJoinAttachment =
          'INNER JOIN users_languages AS ul ON u.user_id = ul.user_id'
      }
      if (exceptionTable !== 'hskills' && Object.keys(filter)[0] === 'hskills') {
        if (req.query.inclusiveH === 'true') {
          needsHaving = true
          const ids = filter[Object.keys(filter)[0]].split(',')
          inclusiveHardAttachment += ` COUNT(DISTINCT uhs.hard_skill_id) = ${ids.length}`
        }
        hardSkillsActiveFilters +=
          `uhs.hard_skill_id IN (${filter[Object.keys(filter)[0]]})`
        hardSkillsJoinAttachment =
          'INNER JOIN users_hard_skills AS uhs ON u.user_id = uhs.user_id'
      }
      if (exceptionTable !== 'sskills' && Object.keys(filter)[0] === 'sskills') {
        if (req.query.inclusiveS === 'true') {
          needsHaving = true
          const ids = filter[Object.keys(filter)[0]].split(',')
          inclusiveSoftAttachment += ` COUNT(DISTINCT uss.soft_skill_id) = ${ids.length}`
        }
        softSkillsActiveFilters +=
          `uss.soft_skill_id IN (${filter[Object.keys(filter)[0]]})`
        softSkillsJoinAttachment =
          'INNER JOIN users_soft_skills AS uss ON u.user_id = uss.user_id'
      }
    }
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
  ].reduce((acc, current) => {
    if (current !== '') {
      return `${acc} ${current} AND `
    }
    return acc.slice(0, acc.length - 5)
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
