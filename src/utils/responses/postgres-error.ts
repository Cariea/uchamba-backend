import { Response } from 'express'
import { STATUS } from '../constants'
import { POSTGRES_ERROR } from './postgres-error-constants'

export interface PostgresError {
  message: string
  severity: string
  code: string
  detail: string
  table: string
  constraint: string
}

export function handlePostgresError (
  res: Response,
  error: PostgresError
): Response {
  if (error.code === POSTGRES_ERROR.UNIQUE_VIOLATION) {
    return res.status(STATUS.BAD_REQUEST).json({
      message: 'Mensaje de Error Personalizado para usuario'
    })
  }

  if (error.code === POSTGRES_ERROR.FOREIGN_KEY_VIOLATION) {
    return res.status(STATUS.CONFLICT).json({
      message: 'Mensaje de Error Personalizado para usuario'
    })
  }

  return res.status(STATUS.IM_A_TEAPOT)
}
