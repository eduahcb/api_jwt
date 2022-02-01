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
})

const env = config.get('env')

config.load(`./src/environments/${env}.json`)

export default config
