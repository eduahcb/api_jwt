import App from './app'
import { config } from './config'

const startServer = (): void => {
  const app = new App().init()

  const port = config.get('port')

  app.listen(port, () => {
    console.log(`server is running on port ${port}`)
  })
}

startServer()
