import passport from 'passport'
import jwt from 'jsonwebtoken'
import { getRepository } from 'typeorm'

import { Strategy as BearerStrategy } from 'passport-http-bearer'

import config from './config'
import blockList from './redis/blockList'

import User from '../components/user/user.entity'

type Payload = {
  id: string
}

const verifyTokenExists = async (token: string) => {
  const tokenExists = await blockList.containsTokenHash(token)

  if (tokenExists) {
    throw new jwt.JsonWebTokenError('Invalid token by logout')
  }
}

passport.use(
  new BearerStrategy(async (token, done) => {
    try {
      const userRepository = getRepository(User)

      await verifyTokenExists(token)

      const payload = jwt.verify(token, config.get('jwtSecretKey')) as Payload

      const user = await userRepository.findOne(payload.id)

      done(null, user, { token } as any)
    } catch (error) {
      done(error)
    }
  })
)
