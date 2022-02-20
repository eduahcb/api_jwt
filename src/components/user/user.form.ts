import { Repository, getRepository } from 'typeorm'
import { HttpStatusCode } from '@/helpers/HttpStatusCode'
import { HttpException } from '@/exceptions'
import User from './user.entity'

class UserForm {
  private name: string
  private email: string
  private password: string

  private repository: Repository<User>

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
    this.repository = getRepository(User)
  }

  async toModel(): Promise<User> {
    const user = await this.repository.findOne({ where: { email: this.email } })

    if (user) {
      throw new HttpException(
        'email already exists',
        HttpStatusCode.BAD_REQUEST,
        true
      )
    }

    return new User(this.name, this.email, this.password)
  }
}

export default UserForm
