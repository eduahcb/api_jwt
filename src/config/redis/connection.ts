import { createClient } from 'redis'
import config from '../config'

const client = createClient({
  url: `redis://${config.get('redisHost')}:6379`,
})

export default client
