import { Response, Request } from 'express'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { StatusError } from '../../../utils/responses/status-error'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import { loginWithEllucian } from '../_utils/loginWithEllucian'
import { Graduated } from '../../../types/banner'
import { generateToken } from '../_utils/generateToken'

export const logIn = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const { email, password } = req.body

    const existInEllucian = await loginWithEllucian(email, password)

    if (existInEllucian === true) {
      const { rows: response } = await pool.query({
        text: `
          SELECT
            COUNT(*)
          FROM users
          WHERE
            role IN ('admin', 'graduated') AND
            email = $1
        `,
        values: [email]
      })

      if (response[0].count !== '0') {
        return res.status(STATUS.OK).json(await generateToken(email))
      }

      const { rows: degreeQuantity } = await pool.query({
        text: `
          SELECT
            COUNT(*)
          FROM banner
          WHERE
            email = $1 AND
            degree = 'pregrado'
        `,
        values: [email]
      })

      if (degreeQuantity[0].count === '0') {
        throw new StatusError({
          message: 'Usted no cuenta con un pregrado en la UCAB',
          statusCode: STATUS.UNAUTHORIZED
        })
      }

      const { rows: bannerResponse } = await pool.query({
        text: `
          SELECT
            undergraduate_id,
            email,
            name,
            phone_number,
            residence_address,
            career,
            degree,
            graduation_year
          FROM banner
          WHERE
            email = $1
        `,
        values: [email]
      })

      if (bannerResponse.length === 0) {
        throw new StatusError({
          message: 'Usted no es egresado de la UCAB',
          statusCode: STATUS.UNAUTHORIZED
        })
      }

      const { rows: insertUser } = await pool.query({
        text: `
          INSERT INTO users(
            email,
            name,
            residence_address,
            phone_number
          ) VALUES ($1, $2, $3, $4)
          RETURNING
            user_id,
            email,
            name,
            role
        `,
        values: [
          bannerResponse[0].email,
          bannerResponse[0].name,
          bannerResponse[0].residence_address,
          bannerResponse[0].phone_number
        ]
      })

      let graduated: Graduated = {
        undergraduateId: 0,
        email: '',
        name: '',
        phoneNumber: '',
        residenceAddress: '',
        career: '',
        degree: '',
        graduation_year: ''
      }

      for (graduated of bannerResponse) {
        const careerId = await pool.query({
          text: `
              SELECT
                ucareer_id
              FROM ucareers
              WHERE
                name = $1
            `,
          values: [graduated.career]
        })

        await pool.query({
          text: `
            INSERT INTO users_ustudies(
              user_id,
              ucareer_id,
              degree,
              graduation_year
            ) VALUES ($1, $2, $3, $4)
            RETURNING
              user_id,
              ucareer_id,
              degree,
              graduation_year
          `,
          values: [
            insertUser[0].user_id,
            careerId.rows[0].ucareer_id,
            graduated.degree,
            graduated.graduation_year
          ]
        })
      }

      return res.status(STATUS.OK).json(await generateToken(email))
    } else {
      throw new StatusError({
        message: 'Email o Contraseña Incorrecta',
        statusCode: STATUS.UNAUTHORIZED
      })
    }
  } catch (error: unknown) {
    console.log('error', error)
    return handleControllerError(error, res)
  }
}
