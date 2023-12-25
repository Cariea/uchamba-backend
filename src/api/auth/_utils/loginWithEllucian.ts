import { pool } from '../../../database'
import bcrypt from 'bcrypt'

export const loginWithEllucian = async (email: string, password: string): Promise<Boolean> => {
  const response = await pool.query({
    text: `
      SELECT
        email,
        password
      FROM ellucian
      WHERE
        email = $1
    `,
    values: [email]
  })

  if (response.rowCount === 1) {
    const isPasswordCorrect = bcrypt.compareSync(password, response.rows[0].password)
    return isPasswordCorrect
  }
  return false
}
