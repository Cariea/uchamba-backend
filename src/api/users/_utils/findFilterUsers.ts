import { pool } from '../../../database'
import { DEFAULT_PAGE } from '../../../utils/constants'
import { compoundFilter, generalFilter, inclusiveCompoundFilter, inclusiveGeneralFilter } from './GenerateSearchQuery'
import { languagesLevelList } from './languagesLevelList'
import { transformToCommaSeparatedString } from './transformToCommaSeparatedString'
import { Request } from 'express'
import { createHashMap } from './generateLanguageLevelPair'

export const findFilterUsers = async (validFilters: Array<{ [key: string]: string }>, req: Request): Promise<string> => {
  let levelList = ''
  const { page = DEFAULT_PAGE.page, size = DEFAULT_PAGE.size } = req.query
  let { inclusiveH, inclusiveS } = req.query
  if (inclusiveH === undefined || (inclusiveH !== 'true' && inclusiveH !== 'false')) {
    inclusiveH = 'false'
  }
  if (inclusiveS === undefined || (inclusiveS !== 'true' && inclusiveS !== 'false')) {
    inclusiveS = 'false'
  }
  let offset = (Number(page) - 1) * Number(size)

  if (Number(page) < 1) {
    offset = 0
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
    const { rows } = await pool.query({
      text: `
        SELECT user_id
        FROM users
        WHERE is_active = TRUE
        ORDER BY random()
        LIMIT $1 OFFSET $2
      `,
      values: [size, offset]
    })
    carry = transformToCommaSeparatedString(rows)
  }
  return carry
}
