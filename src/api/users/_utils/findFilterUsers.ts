import { pool } from '../../../database'
import { compoundFilter, generalFilter, inclusiveCompoundFilter, inclusiveGeneralFilter } from './GenerateSearchQuery'
import { languagesLevelList } from './languagesLevelList'
import { transformToCommaSeparatedString } from './transformToCommaSeparatedString'
import { Request } from 'express'
import { createHashMap } from './generateLanguageLevelPair'
import { getDailyRandomSeed } from './get-daily-random-seed'

export const findFilterUsers = async (
  validFilters: Array<{ [key: string]: string }>, req: Request
): Promise<string> => {
  let levelList = ''
  let { inclusiveH, inclusiveS } = req.query
  if (inclusiveH === undefined || (inclusiveH !== 'true' && inclusiveH !== 'false')) {
    inclusiveH = 'false'
  }
  if (inclusiveS === undefined || (inclusiveS !== 'true' && inclusiveS !== 'false')) {
    inclusiveS = 'false'
  }

  let carry = ''
  let isfirst = true

  if (validFilters.length > 0) {
    for (const filter of validFilters) {
      if (isfirst) {
        if (inclusiveH === 'true' && filter.tableName === 'users_hard_skills') {
          const query = inclusiveGeneralFilter(filter[Object.keys(filter)[0]], filter.tableName, filter.columnName, filter.country, filter.state, filter.city, levelList)
          const { rows } = await pool.query(query)
          carry = transformToCommaSeparatedString(rows)
          isfirst = false
        } else if (inclusiveS === 'true' && filter.tableName === 'users_soft_skills') {
          const query = inclusiveGeneralFilter(filter[Object.keys(filter)[0]], filter.tableName, filter.columnName, filter.country, filter.state, filter.city, levelList)
          const { rows } = await pool.query(query)
          carry = transformToCommaSeparatedString(rows)
          isfirst = false
        } else if (filter.tableName === 'users_languages') {
          const pairs = createHashMap(filter.languages)
          for (const languageId in pairs) {
            levelList = languagesLevelList(pairs[languageId])
            const query = generalFilter(languageId, filter.tableName, filter.columnName, filter.country, filter.state, filter.city, levelList)
            const { rows } = await pool.query(query)
            carry = transformToCommaSeparatedString(rows)
          }
        } else {
          const query = generalFilter(filter[Object.keys(filter)[0]], filter.tableName, filter.columnName, filter.country, filter.state, filter.city, levelList)
          const { rows } = await pool.query(query)
          carry = transformToCommaSeparatedString(rows)
          isfirst = false
        }
      } else {
        if (inclusiveH === 'true' && filter.tableName === 'users_hard_skills') {
          const query = inclusiveCompoundFilter(filter[Object.keys(filter)[0]], filter.tableName, filter.columnName, carry, levelList)
          const { rows } = await pool.query(query)
          carry = transformToCommaSeparatedString(rows)
        } else if (inclusiveS === 'true' && filter.tableName === 'users_soft_skills') {
          const query = inclusiveCompoundFilter(filter[Object.keys(filter)[0]], filter.tableName, filter.columnName, carry, levelList)
          const { rows } = await pool.query(query)
          carry = transformToCommaSeparatedString(rows)
        } else if (filter.tableName === 'users_languages') {
          const pairs = createHashMap(filter.languages)
          for (const languageId in pairs) {
            levelList = languagesLevelList(pairs[languageId])
            const query = compoundFilter(languageId, filter.tableName, filter.columnName, carry, levelList)
            const { rows } = await pool.query(query)
            carry = transformToCommaSeparatedString(rows)
          }
        } else {
          const query = compoundFilter(filter[Object.keys(filter)[0]], filter.tableName, filter.columnName, carry, levelList)
          const { rows } = await pool.query(query)
          carry = transformToCommaSeparatedString(rows)
        }
      }
    }
  } else {
    await pool.query({
      text: 'SELECT SETSEED($1)',
      values: [getDailyRandomSeed()]
    })

    const { rows } = await pool.query({
      text: `
        SELECT user_id
        FROM users
        WHERE is_active = TRUE
        ORDER BY random()
      `
    })
    carry = transformToCommaSeparatedString(rows)
  }
  return carry
}
