import { NextFunction, Request, Response } from 'express'
import errorHandler from '../handlers'

export default async function exceptionHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const isOperational = await errorHandler.handleError(error)
  if (!isOperational) {
    res.status(500).json({
      message: 'Internal server error',
      statusCode: 500,
    })
  }
  res.status(error.statusCode).json({
    message: error.message,
    statusCode: error.statusCode,
  })
}
