import Rollbar from 'rollbar'

import config from './config'

const accessToken = config.get('rollbarAccessToken')

const rollbar = new Rollbar({
  accessToken: accessToken,
  captureUncaught: true,
  captureUnhandledRejections: true,
})

export default rollbar
