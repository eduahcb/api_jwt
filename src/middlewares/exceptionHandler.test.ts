import { Request, Response, NextFunction } from 'express'

import exceptionHandler from './exceptionHandler'

import { config } from '../config'

describe('exceptionHandler', () => {
  let reqMock: Partial<Request>
  let resMock: Partial<Response>

  const nextMock: NextFunction = jest.fn()

  const errorMock = {
    isOperational: true,
    statusCode: 400,
    message: 'this is a error',
  }

  beforeEach(() => {
    reqMock = {}

    resMock = {
      status: jest.fn((code: number) => resMock as Response),
      json: jest.fn(),
    }
  })

  test('should return a application error when is not development env', async () => {
    errorMock.isOperational = false

    await exceptionHandler(
      errorMock,
      reqMock as Request,
      resMock as Response,
      nextMock as NextFunction
    )

    expect(resMock.status).toBeCalledWith(500)

    expect(resMock.json).toBeCalledWith({
      message: 'Internal server error',
      statusCode: 500,
    })
  })

  test('should return a application error when is development env', async () => {
    errorMock.isOperational = false

    config.set('env', 'development')

    await exceptionHandler(
      errorMock,
      reqMock as Request,
      resMock as Response,
      nextMock as NextFunction
    )

    expect(resMock.status).toBeCalledWith(500)

    expect(resMock.json).toBeCalledWith({
      error: {
        frames: [],
        message: 'this is a error',
      },
    })
  })

  test('should return a operational error', async () => {
    errorMock.isOperational = true

    await exceptionHandler(
      errorMock,
      reqMock as Request,
      resMock as Response,
      nextMock as NextFunction
    )

    // expect(resMock.status).toBeCalledWith(400)

    expect(resMock.json).toBeCalledWith({
      message: 'this is a error',
      statusCode: 400,
    })
  })
})
