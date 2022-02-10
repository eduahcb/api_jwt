import casual from 'casual'
import Factory from '../helpers/factory'

import User from '../components/user/user.entity'

const startFactories = (): Factory => {
  const factory = new Factory()

  const name = casual.name
  const email = casual.email
  const password = '123'

  const userFactory = new User(name, email, password)

  factory.addFactory('user', User, userFactory, { name, password, email })

  return factory
}

export default startFactories
