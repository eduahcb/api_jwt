// CREATE DEFAULT USER

import { getRepository } from 'typeorm'
import DBConnection from './config/connection'

import User from './components/user/user.entity'

async function init() {
  const connection = new DBConnection()

  try {
    await connection.start()

    const userRepository = getRepository(User)
    const defaultUser = await userRepository.findOne({
      where: { name: 'cleitin' },
    })

    if (!defaultUser) {
      const newUser = new User('cleitin', 'cleitin@test.com', '123456')
      await userRepository.save(newUser)
      console.log('user was created')
    } else {
      console.log('user already exists')
    }
  } catch (error) {
    console.log(error)
  } finally {
    await connection.close()
  }
}

init()
