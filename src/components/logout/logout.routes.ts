import { Router } from 'express'
import LogoutController from './logout.controller'

import bearerAuth from '../../middlewares/bearerAuth'

const logoutRouter = (): Router => {
  const logoutController = new LogoutController()

  const routes = Router()

  routes.get('/', bearerAuth, logoutController.logout)

  return routes
}

export default logoutRouter
