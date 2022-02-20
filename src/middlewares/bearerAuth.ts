import { NextFunction, Request, Response } from 'express'

import { HttpStatusCode } from './../helpers/HttpStatusCode'
import { UnauthorizeException, HttpException } from '../exceptions'

import passport from 'passport'

export default async function bearerAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  passport.authenticate('bearer', { session: false }, (error, user, info) => {
    try {
      if (
        (error && error.name === 'JsonWebTokenError') ||
        (error && error.name === 'TokenExpiredError')
      ) {
        throw new HttpException(
          error.message,
          HttpStatusCode.UNAUTHORIZED,
          true
        )
      }

      if (error) {
        throw new HttpException(
          error.message,
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          false
        )
      }

      if (!user) {
        throw new UnauthorizeException()
      }

      req.token = info.token
      next()
    } catch (error) {
      next(error)
    }
  })(req, res, next)
}
