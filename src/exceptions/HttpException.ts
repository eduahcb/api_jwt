class HttpException extends Error {
  public statusCode: number
  public isOperational: boolean

  constructor(message: string, statusCode: number) {
    super(message)
    this.message = message
    this.statusCode = statusCode
    this.name = 'HttpException'
    this.isOperational = true
  }
}

export default HttpException
