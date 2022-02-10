import passport from 'passport'
import jwt from 'jsonwebtoken'
import { getRepository } from 'typeorm'

import { Strategy as BearerStrategy } from 'passport-http-bearer'

import config from './config'
import User from '../components/user/user.entity'

type Payload = {
  id: string
}

passport.use(
  new BearerStrategy(async (token, done) => {
    try {
      const userRepository = getRepository(User)

      const payload = jwt.verify(token, config.get('jwtSecretKey')) as Payload

      const user = await userRepository.findOne(payload.id)

      done(null, user)
    } catch (error) {
      done(error)
    }
  })
)
