import { pool } from '../../../database'
import { compoundFilter, generalFilter, inclusiveCompoundFilter, inclusiveGeneralFilter, onlyWithCvFilter } from './GenerateSearchQuery'
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
  const { country, state, city } = req.query
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
    if (country !== undefined && state === undefined && city === undefined) {
      const { rows } = await pool.query({
        text: `
          SELECT user_id
          FROM users
          WHERE is_active = TRUE
          AND country = '${String(country)}'
          ORDER BY random()
        `
      })
      carry = transformToCommaSeparatedString(rows)
    }
    if (state !== undefined && city === undefined && country === undefined) {
      const { rows } = await pool.query({
        text: `
          SELECT user_id
          FROM users
          WHERE is_active = TRUE
          AND state = '${String(state)}'
          ORDER BY random()
        `
      })
      carry = transformToCommaSeparatedString(rows)
    }
    if (city !== undefined && state === undefined && country === undefined) {
      const { rows } = await pool.query({
        text: `
          SELECT user_id
          FROM users
          WHERE is_active = TRUE
          AND city = '${String(city)}'
          ORDER BY random()
        `
      })
      carry = transformToCommaSeparatedString(rows)
    }
    if (country !== undefined && state !== undefined && city === undefined) {
      const { rows } = await pool.query({
        text: `
          SELECT user_id
          FROM users
          WHERE is_active = TRUE
          AND country = '${String(country)}'
          AND state = '${String(state)}'
          ORDER BY random()
        `
      })
      carry = transformToCommaSeparatedString(rows)
    }
    if (country !== undefined && state === undefined && city !== undefined) {
      const { rows } = await pool.query({
        text: `
          SELECT user_id
          FROM users
          WHERE is_active = TRUE
          AND country = '${String(country)}'
          AND city = '${String(city)}'
          ORDER BY random()
        `
      })
      carry = transformToCommaSeparatedString(rows)
    }
    if (country === undefined && state !== undefined && city !== undefined) {
      const { rows } = await pool.query({
        text: `
          SELECT user_id
          FROM users
          WHERE is_active = TRUE
          AND state = '${String(state)}'
          AND city = '${String(city)}'
          ORDER BY random()
        `
      })
      carry = transformToCommaSeparatedString(rows)
    }
    if (country === undefined && state === undefined && city === undefined) {
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
  }
  console.log('carry', carry)
  console.log('query', onlyWithCvFilter(carry))
  const { rows } = await pool.query(onlyWithCvFilter(carry))
  carry = transformToCommaSeparatedString(rows)
  console.log('carry con cv', carry)
  return carry
}
