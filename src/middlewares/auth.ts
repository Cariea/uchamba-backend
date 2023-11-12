import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { STATUS } from '../utils/constants'
import { AUTH_SECRET } from '../config'
import { errorResponse } from '../utils/responses'

export interface ExtendedRequest extends Request {
  user?: any // Esta propiedad almacenará la información del usuario decodificada
}

export const verifyToken = () =>
  (req: ExtendedRequest, res: Response, next: NextFunction): any => {
    const token = req.headers.authorization?.split(' ')[1]

    try {
      jwt.verify(String(token), String(AUTH_SECRET))
      const decoded = jwt.decode(String(token))
      req.user = decoded
      return next()
    } catch (error) {
      errorResponse(res, STATUS.UNAUTHORIZED, 'Error al decodificar el token')
    }
  }

export const isAdmin = () =>
  (req: ExtendedRequest, res: Response, next: NextFunction): any => {
    try {
      // Punto Critico
      const { role } = req.user
      // --

      if (role !== 'admin') {
        return errorResponse(res, STATUS.UNAUTHORIZED, 'No autorizado para realizar esta acción')
      }
      return next()
    } catch (error) {
      errorResponse(res, STATUS.UNAUTHORIZED, 'No autorizado para realizar esta acción')
    }
  }

export const isAdminOrViewer = () =>
  (req: ExtendedRequest, res: Response, next: NextFunction): any => {
    try {
      // Punto Critico
      const { role } = req.user
      // --

      if (role !== 'admin' && role !== 'viewer') {
        return errorResponse(res, STATUS.UNAUTHORIZED, 'No autorizado para realizar esta acción')
      }
      return next()
    } catch (error) {
      errorResponse(res, STATUS.UNAUTHORIZED, 'No autorizado para realizar esta acción')
    }
  }

export const isHealthCenter = () =>
  (req: ExtendedRequest, res: Response, next: NextFunction): any => {
    try {
      // Punto Critico
      const { role } = req.user
      // --

      if (role !== 'hcenter') {
        return errorResponse(res, STATUS.UNAUTHORIZED, 'No autorizado para realizar esta acción')
      }
      return next()
    } catch (error) {
      errorResponse(res, STATUS.UNAUTHORIZED, 'No autorizado para realizar esta acción')
    }
  }
