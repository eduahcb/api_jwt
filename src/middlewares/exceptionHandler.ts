import { NextFunction, Request, Response } from 'express'

import ErrorHandler from '@src/handlers'

export default async function exceptionHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const errorHandler = new ErrorHandler(error, req, res, next)

  await errorHandler.handle()
}
