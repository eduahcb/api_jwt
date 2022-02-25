import { Router } from 'express'
import UserController from './user.controller'

import userValidator from './user.validator'

import bearerAuth from '@src/middlewares/bearerAuth'

const userRouter = (): Router => {
  const userController = new UserController()

  const routes = Router()

  routes.post('/', userValidator, userController.create)

  routes.get('/', userController.getAll)

  routes.get('/:id', userController.getById)

  routes.delete('/:id', bearerAuth, userController.delete)

  return routes
}

export default userRouter
