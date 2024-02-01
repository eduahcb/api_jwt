import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { NotFoundException } from '@src/exceptions'

import User from './user.entity'
import UserForm from './user.dto'
import UserResponse from './user.response'

class UserController {
  create = async (req: Request, res: Response): Promise<void> => {
    const userRepository = getRepository(User)
    const newUser = await new UserForm(req.body).toModel()

    const user = await userRepository.save(newUser)

    res.status(201).json(user)
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    const userRepository = getRepository(User)
    const users = await userRepository.find()

    const usersResponse = users.map((user) => new UserResponse(user))

    res.status(200).json(usersResponse)
  }

  getById = async (req: Request, res: Response): Promise<void> => {
    const userRepository = getRepository(User)
    const { id } = req.params

    const user = await userRepository.findOne(id)

    if (!user) {
      throw new NotFoundException()
    }

    const userResponse = new UserResponse(user)

    res.status(200).json(userResponse)
  }

  delete = async (req: Request, res: Response): Promise<void> => {
    const userRepository = getRepository(User)
    const { id } = req.params

    const user = await userRepository.findOne(id)

    if (!user) {
      throw new NotFoundException()
    }

    await userRepository.delete(id)

    res.status(204).send()
  }
}

export default UserController
