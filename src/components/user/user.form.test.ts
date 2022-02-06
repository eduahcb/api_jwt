import User from './user.entity'
import UserForm from './user.form'

jest.mock('typeorm', () => ({
  ...jest.requireActual('typeorm'),
  getRepository: jest.fn(() => ({
    findOne: jest.fn(),
  })),
}))

const { getRepository } = require('typeorm')

describe('UserForm', () => {
  test('should return a instance of User', async () => {
    getRepository.mockImplementation(() => ({
      findOne: jest.fn(() => undefined),
    }))

    const userForm = new UserForm({
      name: 'Eduardo',
      email: 'test@test.com',
      password: '21212',
    })

    const user = await userForm.toModel()

    expect(userForm).toBeInstanceOf(UserForm)

    expect(user.Name).toBe('Eduardo')
    expect(user.Email).toBe('test@test.com')
    expect(user).toBeInstanceOf(User)
  })

  test('should throw exception', async () => {
    getRepository.mockImplementation(() => ({
      findOne: jest.fn(async () => new User('test', 'email', 'e32332')),
    }))

    const userForm = new UserForm({
      name: 'Eduardo',
      email: 'test@test.com',
      password: '21212',
    })

    try {
      await userForm.toModel()
    } catch (error: any) {
      expect(error.message).toBe('email already exists')
      expect(error.statusCode).toBe(400)
    }
  })
})
