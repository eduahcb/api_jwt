import { createConnection, getConnection } from 'typeorm'

export const startConnection = async (): Promise<void> => {
  await createConnection()
}

export const closeConnection = async (): Promise<void> => {
  const connection = getConnection()
  if (connection.isConnected) {
    await connection.close()
  }
}
