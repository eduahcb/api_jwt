import App from './app'

const startServer = (): void => {
  const port = process.env.PORT || 8080

  const app = new App().init()

  app.listen(port, () => {
    console.log(`server is running on port ${port}`)
  })
}

startServer()
