import passport from 'passport'
import { getRepository } from 'typeorm'
import { Strategy as LocalStrategy } from 'passport-local'

import { UnauthorizeException, NotFoundException } from '@/exceptions'

import User from '@/components/user/user.entity'

import bcrypt from 'bcrypt'

const verifyPassword = async (
  password: string,
  passwordHash: string
): Promise<void> => {
  const isValidPassword = await bcrypt.compare(password, passwordHash)

  if (!isValidPassword) {
    throw new UnauthorizeException()
  }
}

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    async (email, password, done) => {
      try {
        const userRepository = getRepository(User)

        const user = await userRepository.findOne({ where: { email: email } })

        if (!user) {
          throw new NotFoundException()
        }

        await verifyPassword(password, user.PassWord)

        done(null, user)
      } catch (error) {
        done(error)
      }
    }
  )
)
