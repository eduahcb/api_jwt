import { Request, Response } from 'express'
import { getRepository, Repository } from 'typeorm'
import User from './user.entity'
import UserForm from './user.form'

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
}

export default UserController
