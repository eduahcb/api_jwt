/* eslint-disable no-unused-vars */
import * as express from 'express'

declare global {
  namespace Express {
    interface Request {
      token: any
    }
  }
}
