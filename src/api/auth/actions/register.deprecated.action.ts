import { Response, Request } from 'express'
import bcrypt from 'bcrypt'
import { pool } from '../../../database'
import { STATUS } from '../../../utils/constants'
import { StatusError } from '../../../utils/responses/status-error'
import { handleControllerError } from '../../../utils/responses/handleControllerError'
import camelizeObject from '../../../utils/camelizeObject'
import { AUTH_ROUNDS, SMTP_MAIL } from '../../../config'
import { transporter } from '../../../utils/mailer'

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const { email, name } = req.body
    let { password } = req.body
    const registerData = [email, password]

    // Verficar la existencia de esa persona antes de crear

    const { rows } = await pool.query({
      text: `
        SELECT *
        FROM users
        WHERE email = $1
      `,
      values: [registerData[0]]
    })

    if (rows.length > 0) {
      throw new StatusError({
        message: 'Ya existe una cuenta con ese email',
        statusCode: STATUS.BAD_REQUEST
      })
    }

    // --

    password = await bcrypt.hash(registerData[1], Number(AUTH_ROUNDS))

    // Función para generar el codigo numérico de 6 dígitos
    const code = Math.floor(Math.random() * 900000) + 100000

    const response = await pool.query({
      text: `
        INSERT INTO users (
          email,
          name,
          password,
          confirmation_code
        )
        VALUES ($1, $2, $3, $4)
        RETURNING
          user_id,
          email,
          name
      `,
      values: [email, name, password, code]
    })

    // función para enviar correo con el código para confirmar cuenta
    await transporter.sendMail({
      from: `Eduardo Sucre < ${SMTP_MAIL as string} >`, // sender address
      to: email, // list of receivers
      subject: 'Código para validar tu correo', // Subject line
      html: `<b>Código para validar tu correo: ${code}</b>` // html body
    })

    return res.status(STATUS.CREATED).json(camelizeObject(response.rows[0]))
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
