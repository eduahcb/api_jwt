import User from './user.entity'

import { format } from 'date-fns-tz'

class UserResponse {
  private id: string
  private name: string
  private email: string
  private createdAt: string

  constructor(user: User) {
    this.id = user.Id
    this.name = user.Name
    this.email = user.Email
    this.createdAt = format(user.CreatedAt, 'yyyy-MM-dd')
  }
}

export default UserResponse
