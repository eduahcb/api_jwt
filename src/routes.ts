import { Router } from 'express'

import { loginRouter } from '@src/components/login'
import { logoutRouter } from '@src/components/logout'
import { userRouter } from '@src/components/user'

import { apiBaseUrl } from './config/constants/constants'

const routes = (): Router => {
  const routes = Router()

  routes.use(`${apiBaseUrl}/login`, loginRouter())

  routes.use(`${apiBaseUrl}/logout`, logoutRouter())

  routes.use(`${apiBaseUrl}/users`, userRouter())

  return routes
}

export default routes
