import { createConnection } from 'typeorm'

const startConnection = async (): Promise<void> => {
  await createConnection()
}

export default startConnection
