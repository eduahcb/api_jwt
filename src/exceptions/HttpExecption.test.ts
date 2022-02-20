import { HttpStatusCode } from '@/helpers/HttpStatusCode'
import HttpException from './HttpException'

describe('HttpException', () => {
  test('should throw HttpException Error', () => {
    const exception = () => {
      throw new HttpException(
        'this is a HttpException',
        HttpStatusCode.NOT_FOUND,
        true
      )
    }

    expect(exception).toThrow('this is a HttpException')
    expect(exception).toThrowError()
  })

  test('should return a message and statusCode', () => {
    try {
      throw new HttpException(
        'this a HttpException message',
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        true
      )
    } catch (error: any) {
      expect(error).toBeInstanceOf(HttpException)
      expect(error.message).toBe('this a HttpException message')
      expect(error.statusCode).toBe(500)
    }
  })
})
