import { HttpStatusCode } from '@/helpers/HttpStatusCode'

class UnauthorizedException extends Error {
  public statusCode: number
  public isOperational: boolean

  constructor() {
    super()
    this.message = 'Unauthorized'
    this.statusCode = HttpStatusCode.UNAUTHORIZED
    this.name = 'UnauthorizedException'
    this.isOperational = true
  }
}

export default UnauthorizedException
