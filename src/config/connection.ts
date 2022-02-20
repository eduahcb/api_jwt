import { createConnection, getConnection } from 'typeorm'

class DBConnection {
  start = async (): Promise<void> => {
    await createConnection()
  }

  close = async (): Promise<void> => {
    const connection = getConnection()
    if (connection.isConnected) {
      await connection.close()
    }
  }
}

export default DBConnection
