import { Router } from 'express'
import LoginController from './login.controller'

import passport from 'passport'

const loginRouter = (): Router => {
  const loginController = new LoginController()

  const routes = Router()

  routes.post(
    '/',
    passport.authenticate('local', { session: false }),
    loginController.login
  )

  return routes
}

export default loginRouter
