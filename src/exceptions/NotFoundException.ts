import { HttpStatusCode } from '@/helpers/HttpStatusCode'

class NotFoundException extends Error {
  public statusCode: number
  public isOperational: boolean

  constructor() {
    super()
    this.message = 'Not found'
    this.statusCode = HttpStatusCode.NOT_FOUND
    this.name = 'NotFoundException'
    this.isOperational = true
  }
}

export default NotFoundException
