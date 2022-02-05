import App from './app'
import { config, startConnection } from './config'

const startServer = async (): Promise<void> => {
  await startConnection()

  const app = new App().init()

  const port = config.get('port')

  app.listen(port, () => {
    console.log(`server is running on port ${port}`)
  })
}

startServer()
