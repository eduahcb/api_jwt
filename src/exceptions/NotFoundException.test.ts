import NotFoundException from './NotFoundException'

describe('HttpException', () => {
  test('should throw HttpException Error', () => {
    const exception = () => {
      throw new NotFoundException()
    }

    expect(exception).toThrow('Not found')
    expect(exception).toThrowError()
  })

  test('should return a message and statusCode', () => {
    try {
      throw new NotFoundException()
    } catch (error: any) {
      expect(error).toBeInstanceOf(NotFoundException)
      expect(error.message).toBe('Not found')
      expect(error.statusCode).toBe(404)
    }
  })
})
