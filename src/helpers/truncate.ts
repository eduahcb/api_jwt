import { getConnection } from 'typeorm'

const truncatePostgres = async () => {
  const connection = getConnection()
  const entities = connection.entityMetadatas

  for (const entity of entities) {
    const repository = getConnection().getRepository(entity.name)

    await repository.clear()
  }
}

const truncateDatabase = async (): Promise<void> => {
  truncatePostgres()
}

export default truncateDatabase
