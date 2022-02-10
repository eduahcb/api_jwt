import 'express-async-errors'
import './config/autStrategy'
import './config/bearerStrategy'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import routes from './routes'

import exceptionHandler from './middlewares/exceptionHandler'
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

  init(): express.Application {
    this.middleware()
    this.routes()
    this.exceptionHandler()

    return this.server
  }
}

export default App
