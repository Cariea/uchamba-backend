import { Request } from 'express'
import { createHashMap } from '../generateLanguageLevelPair'
import { languagesLevelList } from '../languagesLevelList'

export function queryConstructor (
  req: Request,
  validFilters: Array<{ [key: string]: string }>,
  exceptionTable: string | undefined
): string {
  try {
    const andAttachment = ' AND '

    let countryFilter = ''
    let stateFilter = ''
    let cityFilter = ''

    let careersJoinAttachment = ''
    let careersActiveFilters = ''

    let languagesJoinAttachment = ''
    let languagesActiveFilters = ''

    let hardSkillsJoinAttachment = ''
    let hardSkillsActiveFilters = ''

    let softSkillsJoinAttachment = ''
    let softSkillsActiveFilters = ''

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
          const keys = Object.keys(pairs)
          const ultimaClave = keys[keys.length - 1]
          for (const languageId in pairs) {
            const levels = languagesLevelList(pairs[languageId])
            if (pairs[languageId] === pairs[ultimaClave]) {
              languagesActiveFilters +=
                `ul.language_id = ${languageId} AND proficient_level IN (${levels})`
            } else {
              languagesActiveFilters +=
                `ul.language_id = ${languageId} AND proficient_level IN (${levels}) OR `
            }
          }
          languagesJoinAttachment =
            'INNER JOIN users_languages AS ul ON u.user_id = ul.user_id'
        }
        if (exceptionTable !== 'hskills' && Object.keys(filter)[0] === 'hskills') {
          if (req.query.inclusiveH === 'true') {
            const ids = filter[Object.keys(filter)[0]].split(',')
            for (let index = 0; index < ids.length; index++) {
              if (index === ids.length - 1) {
                hardSkillsActiveFilters += `uhs.hard_skill_id = ${ids[index]}`
              } else {
                hardSkillsActiveFilters += `uhs.hard_skill_id = ${ids[index]} AND `
              }
            }
          } else {
            hardSkillsActiveFilters +=
            `uhs.hard_skill_id IN (${filter[Object.keys(filter)[0]]})`
          }
          hardSkillsJoinAttachment =
            'INNER JOIN users_hard_skills AS uhs ON u.user_id = uhs.user_id'
        }
        if (exceptionTable !== 'sskills' && Object.keys(filter)[0] === 'sskills') {
          if (req.query.inclusiveS === 'true') {
            const ids = filter[Object.keys(filter)[0]].split(',')
            for (let index = 0; index < ids.length; index++) {
              if (index === ids.length - 1) {
                softSkillsActiveFilters += `uss.soft_skill_id = ${ids[index]}`
              } else {
                softSkillsActiveFilters += `uss.soft_skill_id = ${ids[index]} AND `
              }
            }
          } else {
            softSkillsActiveFilters +=
              `uss.soft_skill_id IN (${filter[Object.keys(filter)[0]]})`
          }
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

    let resultedQuery = `
      SELECT u.user_id
      FROM users AS u
      ${careersJoinAttachment}
      ${languagesJoinAttachment}
      ${hardSkillsJoinAttachment}
      ${softSkillsJoinAttachment}
      WHERE u.user_id IN (${defaultValidation})
      ${countryFilter !== '' ? andAttachment : ''}
      ${countryFilter}
      ${stateFilter !== '' ? andAttachment : ''}
      ${stateFilter}
      ${cityFilter !== '' ? andAttachment : ''}
      ${cityFilter}
      ${careersActiveFilters !== '' ? andAttachment : ''}
      ${careersActiveFilters}
      ${languagesActiveFilters !== '' ? andAttachment : ''}
      ${languagesActiveFilters}
      ${hardSkillsActiveFilters !== '' ? andAttachment : ''}
      ${hardSkillsActiveFilters}
      ${softSkillsActiveFilters !== '' ? andAttachment : ''}
      ${softSkillsActiveFilters}
      ORDER BY u.user_id
    `

    resultedQuery = resultedQuery.replace(/\s+/g, ' ').trim()

    return resultedQuery
  } catch (error) {
    return ''
  }
}
