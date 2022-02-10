class HttpException extends Error {
  public statusCode: number
  public isOperational: boolean

  constructor(message: string, statusCode: number, isOperational: boolean) {
    super(message)
    this.message = message
    this.statusCode = statusCode
    this.name = 'HttpException'
    this.isOperational = isOperational
  }
}

export default HttpException
