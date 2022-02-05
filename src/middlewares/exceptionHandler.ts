import { NextFunction, Request, Response } from 'express'
import Youch from 'youch'

import { config } from '../config'
import errorHandler from '../handlers'

export default async function exceptionHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> {
  const isOperational = await errorHandler.handleError(error)

  if (!isOperational) {
    const env = config.get('env')

    if (env === 'development') {
      const youch = new Youch(error, req)
      const result = await youch.toJSON()

      return res.status(500).json(result)
    }

    return res.status(500).json({
      message: 'Internal server error',
      statusCode: 500,
    })
  }

  return res.status(error.statusCode).json({
    message: error.message,
    statusCode: error.statusCode,
  })
}
