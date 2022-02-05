import User from './user.entity'
import UserForm from './user.form'

describe('UserForm', () => {
  test('should return a instance of User', () => {
    const userForm = new UserForm({
      name: 'Eduardo',
      email: 'test@test.com',
      password: '21212',
    })

    const user = userForm.toModel()

    expect(userForm).toBeInstanceOf(UserForm)

    expect(user.Name).toBe('Eduardo')
    expect(user.Email).toBe('test@test.com')
    expect(user).toBeInstanceOf(User)
  })
})
