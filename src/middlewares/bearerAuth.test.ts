import { Request, Response, NextFunction } from 'express'
import { HttpException, UnauthorizeException } from '@/exceptions'

import bearerAuth from './bearerAuth'

jest.mock('passport', () => ({
  authenticate: jest.fn(),
}))

const passport = require('passport')

describe('exceptionHandler', () => {
  let reqMock: Partial<Request>
  let resMock: Partial<Response>

  const nextMock: NextFunction = jest.fn()

  const bearerAuthFunction = async (): Promise<void> => {
    await bearerAuth(
      reqMock as Request,
      resMock as Response,
      nextMock as NextFunction
    )
  }

  const passportAuthenticate = async (
    error: any,
    user: any,
    info: any
  ): Promise<void> => {
    passport.authenticate = jest.fn(
      (type, options, callback) =>
        (reqMock: any, resMock: any, nextMock: any) =>
          callback(error, user, info)
    )
  }

  test('should call next function success', async () => {
    await passportAuthenticate(
      undefined,
      { id: 'rieuwsoriu' },
      { token: 'faklf2' }
    )

    reqMock = {
      token: '',
    }

    await bearerAuthFunction()

    expect(nextMock).toHaveBeenCalledWith()
  })

  test('should call next function with JsonWebTokenError', async () => {
    await passportAuthenticate(
      { name: 'JsonWebTokenError', message: '' },
      undefined,
      undefined
    )

    await bearerAuthFunction()

    expect(nextMock).toHaveBeenCalledWith(new HttpException('', 401, true))
  })

  test('should call next function with some error', async () => {
    await passportAuthenticate(
      { name: 'InternalError', message: '' },
      undefined,
      undefined
    )

    await bearerAuthFunction()

    expect(nextMock).toHaveBeenCalledWith(new HttpException('', 500, false))
  })

  test('should call next function user is undefined', async () => {
    await passportAuthenticate(undefined, undefined, undefined)

    await bearerAuthFunction()

    expect(nextMock).toHaveBeenCalledWith(new UnauthorizeException())
  })
})
