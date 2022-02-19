import 'express-async-errors'
import './config/authStrategy'
import './config/bearerStrategy'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import swaggerUi from 'swagger-ui-express'
import routes from './routes'

import { apiBaseUrl } from './config/constants/constants'
import exceptionHandler from './middlewares/exceptionHandler'

import swaggerOptions from './config/swagger'
class App {
  private server: express.Application

  constructor() {
    this.server = express()
  }

  private middleware(): void {
    this.server.use(express.json())
    this.server.use(helmet())
    this.server.use(cors())
  }

  private routes(): void {
    this.server.use(routes())
  }

  private exceptionHandler(): void {
    this.server.use(exceptionHandler)
  }

  private swagger = () => {
    this.server.use(
      `${apiBaseUrl}/doc`,
      swaggerUi.serve,
      swaggerUi.setup(swaggerOptions())
    )
  }

  init(): express.Application {
    this.middleware()
    this.routes()
    this.exceptionHandler()
    this.swagger()

    return this.server
  }
}

export default App
