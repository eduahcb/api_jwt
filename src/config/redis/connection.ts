import { createClient } from 'redis'

type RedisClient = ReturnType<typeof createClient>

class RedisConnection {
  private connection: RedisClient

  constructor() {
    this.connection = createClient()
  }

  start = async (): Promise<RedisClient> => {
    if (!this.connection.isOpen) {
      await this.connection.connect()
    }

    return this.connection
  }
}

export default RedisConnection
