import { countNumbers } from './countNumbers'
export const generalFilter = (ids: string, crossTableName: string, columnIdName: string, country: string, state: string, city: string, levelList: string): string => {
  if (country === undefined) country = ''
  if (state === undefined) state = ''
  if (city === undefined) city = ''
  if (crossTableName === 'users_languages') {
    const query =
    `SELECT users.user_id 
      FROM users
      INNER JOIN ${crossTableName} ON users.user_id = ${crossTableName}.user_id
      WHERE ${columnIdName} = (${ids})
      AND users.is_active = TRUE
      AND users.country LIKE '%${country}%'
      AND users.state LIKE '%${state}%'
      AND users.city LIKE '%${city}%'
      AND ${crossTableName}.proficient_level IN (${levelList})
      GROUP BY users.user_id
      ORDER BY random();`
    return query
  }

  const query =
    `SELECT users.user_id 
      FROM users
      INNER JOIN ${crossTableName} ON users.user_id = ${crossTableName}.user_id
      WHERE ${columnIdName} IN (${ids})
      AND users.is_active = TRUE
      AND users.country LIKE '%${country}%'
      AND users.state LIKE '%${state}%'
      AND users.city LIKE '%${city}%'
      GROUP BY users.user_id
      ORDER BY random();`
  return query
}

export const compoundFilter = (ids: string, crossTableName: string, columnIdName: string, userIds: string, levelList: string): string => {
  if (crossTableName === 'users_languages') {
    const query =
    `SELECT users.user_id 
      FROM users
      INNER JOIN ${crossTableName} ON users.user_id = ${crossTableName}.user_id
      WHERE ${columnIdName} = (${ids})
      AND users.user_id IN (${userIds})
      AND users.is_active = TRUE
      AND ${crossTableName}.proficient_level IN (${levelList})
      GROUP BY users.user_id
      ORDER BY random();`
    return query
  }
  const query =
    `SELECT users.user_id 
      FROM users
      INNER JOIN ${crossTableName} ON users.user_id = ${crossTableName}.user_id
      WHERE ${columnIdName} IN (${ids})
      AND users.user_id IN (${userIds})
      AND users.is_active = TRUE
      GROUP BY users.user_id
      ORDER BY random();`
  return query
}

export const inclusiveGeneralFilter = (filterIds: string, crossTableName: string, columnIdName: string, country: string, state: string, city: string, levelList: string): string => {
  if (country === undefined) country = ''
  if (state === undefined) state = ''
  if (city === undefined) city = ''
  const query =
    `WITH Colums AS (
      SELECT user_id
      FROM ${crossTableName}
      WHERE ${columnIdName} IN (${filterIds})
      GROUP BY user_id
      HAVING COUNT(DISTINCT ${columnIdName}) = ${countNumbers(filterIds)}
    )

    SELECT co.user_id
    FROM Colums co
    JOIN users u ON co.user_id = u.user_id
    WHERE u.is_active = TRUE
    AND u.country LIKE '%${country}%'
    AND u.state LIKE '%${state}%'
    AND u.city LIKE '%${city}%'
    ORDER BY random();`
  return query
}

export const inclusiveCompoundFilter = (filterIds: string, crossTableName: string, columnIdName: string, userIds: string, levelList: string): string => {
  const query =
    `WITH Colums AS (
      SELECT user_id
      FROM ${crossTableName}
      WHERE ${columnIdName} IN (${filterIds})
      AND user_id IN (${userIds})
      GROUP BY user_id
      HAVING COUNT(DISTINCT ${columnIdName}) = ${countNumbers(filterIds)}
    )

    SELECT co.user_id
    FROM Colums co
    JOIN users u ON co.user_id = u.user_id;`
  return query
}

export const onlyWithCvFilter = (ids: string): string => {
  const query =
    `SELECT user_id
      FROM users_cvs
      WHERE user_id IN (${ids})
      GROUP BY user_id
      ORDER BY random();`
  return query
}
