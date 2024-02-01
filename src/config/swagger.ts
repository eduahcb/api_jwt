import swaggerJsdoc from 'swagger-jsdoc'
import { apiBaseUrl } from './constants/constants'

import config from './config'

const env = config.get('env')

let apisPath = ''

if (env === 'development' || env === 'test') {
  apisPath = './src/components/**/*.swagger.ts'
} else {
  apisPath = './build/components/**/*.swagger.js'
}

export default () => {
  const options = {
    definition: {
      components: {},
      openapi: '3.0.1',
      info: {
        version: '0.1.0',
        title: 'REST API Jwt example',
        description: 'A simple API using jwt',
        license: {
          name: 'MIT',
        },
      },
      servers: [
        {
          url: apiBaseUrl,
        },
      ],
    },
    apis: [apisPath],
  }

  return swaggerJsdoc(options)
}
