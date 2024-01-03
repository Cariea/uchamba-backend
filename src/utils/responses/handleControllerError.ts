import { Response } from 'express'
import { StatusError } from './status-error'
import { errorResponse } from '.'
import { STATUS } from '../constants'
import { PostgresError, handlePostgresError } from './postgres-error'

export function handleControllerError (error: any, res: Response): Response {
  if (error instanceof StatusError) {
    return errorResponse(res, error.getStatus(), error.message)
  }

  if (error.detail !== undefined) {
    return handlePostgresError(res, error as PostgresError)
  }

  return errorResponse(res, STATUS.INTERNAL_SERVER_ERROR, error)
}
