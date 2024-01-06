import { createHashMap } from '../generateLanguageLevelPair'
import { languagesLevelList } from '../languagesLevelList'

export function queryConstructor (
  validFilters: Array<{ [key: string]: string }>,
  exceptionTable: string | undefined
): string {
  try {
    const andAttachment = ' AND '

    let careersJoinAttachment = ''
    let careersActiveFilters = ''

    let languagesJoinAttachment = ''
    let languagesActiveFilters = ''

    let hardSkillsJoinAttachment = ''
    let hardSkillsActiveFilters = ''

    let softSkillsJoinAttachment = ''
    let softSkillsActiveFilters = ''

    if (validFilters.length > 0) {
      for (const filter of validFilters) {
        if (exceptionTable !== 'careers' && Object.keys(filter)[0] === 'careers') {
          careersActiveFilters =
            'uc.ucareer_id IN (' + filter[Object.keys(filter)[0]] + ')'
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
                'ul.language_id = ' + languageId + ' AND proficient_level IN (' + levels + ')'
            } else {
              languagesActiveFilters +=
                'ul.language_id = ' + languageId + ' AND proficient_level IN (' + levels + ') OR '
            }
          }
          languagesJoinAttachment =
            'INNER JOIN users_languages AS ul ON u.user_id = ul.user_id'
        }
        if (exceptionTable !== 'hskills' && Object.keys(filter)[0] === 'hskills') {
          hardSkillsActiveFilters +=
            'uhs.hard_skill_id IN (' + filter[Object.keys(filter)[0]] + ')'
          hardSkillsJoinAttachment =
            'INNER JOIN users_hard_skills AS uhs ON u.user_id = uhs.user_id'
        }
        if (exceptionTable !== 'sskills' && Object.keys(filter)[0] === 'sskills') {
          softSkillsActiveFilters +=
            'uss.soft_skill_id IN (' + filter[Object.keys(filter)[0]] + ')'
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
      ${careersActiveFilters !== '' ? andAttachment : ''}
      ${careersActiveFilters}
      ${careersActiveFilters !== '' && languagesActiveFilters !== '' ? andAttachment : ''}
      ${languagesActiveFilters}
      ${languagesActiveFilters !== '' && hardSkillsActiveFilters !== '' ? andAttachment : ''}
      ${hardSkillsActiveFilters}
      ${hardSkillsActiveFilters !== '' && softSkillsActiveFilters !== '' ? andAttachment : ''}
      ${softSkillsActiveFilters}
      ORDER BY u.user_id
    `

    resultedQuery = resultedQuery.replace(/\s+/g, ' ').trim()

    return resultedQuery
  } catch (error) {
    return ''
  }
}
