import { Router } from 'express'

import { userRouter } from './components/user'
import { loginRouter } from './components/login'

import { apiBaseUrl } from './config/constants/constants'

const routes = (): Router => {
  const routes = Router()

  routes.use(`${apiBaseUrl}/login`, loginRouter())

  routes.use(`${apiBaseUrl}/users`, userRouter())

  return routes
}

export default routes
