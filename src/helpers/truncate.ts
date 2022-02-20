import { getConnection } from 'typeorm'

import RedisConnection from '../config/redis/connection'

const truncatePostgres = async () => {
  const connection = getConnection()
  const entities = connection.entityMetadatas

  for (const entity of entities) {
    const repository = getConnection().getRepository(entity.name)

    await repository.clear()
  }
}

const truncateRedisKeys = async () => {
  const connection = new RedisConnection()

  const client = await connection.start()

  client.flushAll()
}

const truncateDatabase = async (): Promise<void> => {
  truncatePostgres()
  truncateRedisKeys()
}

export default truncateDatabase
