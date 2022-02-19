import { Router } from 'express'

import { loginRouter } from './components/login'
import { logoutRouter } from './components/logout'
import { userRouter } from './components/user'

import { apiBaseUrl } from './config/constants/constants'

const routes = (): Router => {
  const routes = Router()

  routes.use(`${apiBaseUrl}/login`, loginRouter())

  routes.use(`${apiBaseUrl}/logout`, logoutRouter())

  routes.use(`${apiBaseUrl}/users`, userRouter())

  return routes
}

export default routes
