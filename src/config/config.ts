import convict from 'convict'

const config = convict({
  env: {
    doc: 'The application environment',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  port: {
    doc: 'The port of application',
    format: 'port',
    default: 8080,
    env: 'PORT',
  },
  jwtSecretKey: {
    doc: 'Secret key to jwt',
    format: '*',
    default: '',
    env: 'JWT_SECRET_KEY',
  },
  rollbarAccessToken: {
    doc: 'Access token from rollbar',
    format: '*',
    default: '',
    env: 'ROLLBAR_ACCESS_TOKEN',
  },
})

const env = config.get('env')

const basePath = env === 'development' || env === 'test' ? 'src' : 'build'

config.loadFile(`./${basePath}/environments/${env}.json`)

export default config
