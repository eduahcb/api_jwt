import { Request, Response } from 'express'
import { getRepository, Repository } from 'typeorm'
import User from './user.entity'
import UserForm from './user.form'
import UserResponse from './user.response'

class UserController {
  userRepository: Repository<User>

  constructor() {
    this.userRepository = getRepository(User)
  }

  create = async (req: Request, res: Response): Promise<void> => {
    const newUser = await new UserForm(req.body).toModel()

    const user = await this.userRepository.save(newUser)

    res.status(201).json(user)
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    const users = await this.userRepository.find()

    const usersResponse = users.map((user) => new UserResponse(user))

    res.status(200).json(usersResponse)
  }
}

export default UserController
