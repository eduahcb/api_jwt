import UnauthorizedException from './UnauthorizedException'

describe('HttpException', () => {
  test('should throw HttpException Error', () => {
    const exception = () => {
      throw new UnauthorizedException()
    }

    expect(exception).toThrow('Unauthorized')
    expect(exception).toThrowError()
  })

  test('should return a message and statusCode', () => {
    try {
      throw new UnauthorizedException()
    } catch (error: any) {
      expect(error).toBeInstanceOf(UnauthorizedException)
      expect(error.message).toBe('Unauthorized')
      expect(error.statusCode).toBe(401)
    }
  })
})
