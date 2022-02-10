import jwt from 'jsonwebtoken'

import { config } from '../../config'

export const createAccessToken = ({ id }: { id: string }): string => {
  const payload = {
    id,
  }

  const token = jwt.sign(payload, config.get('jwtSecretKey'))

  return token
}
