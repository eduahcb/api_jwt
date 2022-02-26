import jwt from 'jsonwebtoken'
import { createHash } from 'crypto'

import redisClient from './connection'

type JWT = {
  exp: number
}

class BlockList {
  private generateTokenHash = async (token: string) => {
    return createHash('sha256').update(token).digest('hex')
  }

  add = async (token: string): Promise<void> => {
    await redisClient.connect()

    const tokenHash = await this.generateTokenHash(token)
    const payload = jwt.decode(token) as JWT

    await redisClient.set(tokenHash, '', {
      EXAT: payload.exp,
    })

    await redisClient.quit()
  }

  containsTokenHash = async (token: string): Promise<boolean> => {
    await redisClient.connect()

    const tokenHash = await this.generateTokenHash(token)
    const result = await redisClient.exists(tokenHash)

    await redisClient.quit()

    return result === 1
  }
}

export default new BlockList()
