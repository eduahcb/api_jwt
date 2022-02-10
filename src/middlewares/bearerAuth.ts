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
      if (error && error.name === 'JsonWebTokenError') {
        throw new HttpException(
          error.message,
          HttpStatusCode.UNAUTHORIZED,
          true
        )
      }

      if (error) {
        throw new HttpException(
          error.message,
          HttpStatusCode.UNAUTHORIZED,
          false
        )
      }

      if (!user) {
        throw new UnauthorizeException()
      }

      next()
    } catch (error) {
      next(error)
    }
  })(req, res, next)
}
