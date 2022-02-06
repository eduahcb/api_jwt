import { Router } from 'express'
import UserController from './user.controller'

import userValidator from './user.validator'

const userRouter = (): Router => {
  const userController = new UserController()

  const routes = Router()

  routes.post('/', userValidator, userController.create)

  routes.get('/', userController.getAll)

  routes.get('/:id', userController.getById)

  return routes
}

export default userRouter
