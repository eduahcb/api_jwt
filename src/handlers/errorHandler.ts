import { Request, Response, NextFunction } from 'express'
import Youch from 'youch'

import { config, rollbar } from '../config'

class ErrorHandler {
  private error: any
  private req: Request
  private res: Response
  private nextFunction: NextFunction
  private env: string

  constructor(
    error: any,
    req: Request,
    response: Response,
    nextFunction: NextFunction
  ) {
    this.error = error
    this.req = req
    this.res = response
    this.nextFunction = nextFunction
    this.env = config.get('env')
  }

  private isOperationalError = () => {
    return this.error.isOperational
  }

  private developmentResponse = async () => {
    const youch = new Youch(this.error, this.req)
    const result = await youch.toJSON()

    this.res.status(500).json(result)
  }

  private responseErrors = async () => {
    if (!this.isOperationalError()) {
      if (this.env === 'development') {
        return this.developmentResponse()
      }

      return this.res.status(500).json({
        message: 'Internal server error',
        statusCode: 500,
      })
    }

    return this.res.status(this.error.statusCode).json({
      message: this.error.message,
      statusCode: this.error.statusCode,
    })
  }

  private triggerErrorToRollbar = () => {
    if (this.env === 'production' && !this.isOperationalError()) {
      console.log('foi')
      rollbar.error(this.error, this.req)
    }
  }

  handle = async (): Promise<void> => {
    this.triggerErrorToRollbar()
    this.responseErrors()
  }
}

export default ErrorHandler
