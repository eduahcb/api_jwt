import User from './user.entity'

class UserForm {
  private name: string
  private email: string
  private password: string

  constructor({
    name,
    email,
    password,
  }: {
    name: string
    email: string
    password: string
  }) {
    this.name = name
    this.email = email
    this.password = password
  }

  toModel(): User {
    return new User(this.name, this.email, this.password)
  }
}

export default UserForm
