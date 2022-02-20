import jwt from 'jsonwebtoken'
import { createHash } from 'crypto'

import RedisConnection from './connection'

type JWT = {
  exp: number
}

class BlockList {
  private connection: RedisConnection

  constructor() {
    this.connection = new RedisConnection()
  }

  private generateTokenHash = async (token: string) => {
    return createHash('sha256').update(token).digest('hex')
  }

  add = async (token: string): Promise<void> => {
    const client = await this.connection.start()

    const tokenHash = await this.generateTokenHash(token)

    const payload = jwt.decode(token) as JWT

    await client.set(tokenHash, '', {
      EXAT: payload.exp,
    })
  }

  containsTokenHash = async (token: string): Promise<boolean> => {
    const client = await this.connection.start()

    const tokenHash = await this.generateTokenHash(token)

    const result = await client.exists(tokenHash)

    return result === 1
  }
}

export default new BlockList()
