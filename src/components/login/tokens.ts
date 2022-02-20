import jwt from 'jsonwebtoken'

import { config } from '../../config'

class Token {
  static createAccessToken = ({ id }: { id: string }): string => {
    const payload = {
      id,
    }

    const token = jwt.sign(payload, config.get('jwtSecretKey'), {
      expiresIn: '15m',
    })

    return token
  }
}

export default Token
