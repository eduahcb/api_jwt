import { Router } from 'express'

import { userRouter } from './components/user'
import { loginRouter } from './components/login'

import { apiBaseUrl } from './config/constants/constants'

import bearerAuth from './middlewares/bearerAuth'

const routes = (): Router => {
  const routes = Router()

  routes.use(`${apiBaseUrl}/login`, loginRouter())

  routes.use(bearerAuth)

  routes.use(`${apiBaseUrl}/users`, userRouter())

  return routes
}

export default routes
