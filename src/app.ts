import express from 'express'
import cors from 'cors'
import helmet from 'helmet'

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

  init(): express.Application {
    this.middleware()
    return this.server
  }
}

export default App
