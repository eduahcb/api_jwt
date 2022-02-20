import App from './app'
import { config, DBConnection } from './config'

const startServer = async (): Promise<void> => {
  const connection = new DBConnection()

  await connection.start()

  const app = new App().init()

  const port = config.get('port')

  app.listen(port, () => {
    console.log(`server is running on port ${port}`)
  })
}

startServer()
