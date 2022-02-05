import { getConnection } from 'typeorm'

const truncateDatabase = async (): Promise<void> => {
  const connection = getConnection()

  const entities = connection.entityMetadatas

  for (const entity of entities) {
    const repository = getConnection().getRepository(entity.name)

    await repository.clear()
  }
}

export default truncateDatabase
