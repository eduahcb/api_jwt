import { Request, Response } from 'express'

import Token from './tokens'

type User = {
  id: string
}

class LoginController {
  login = async (req: Request, res: Response): Promise<void> => {
    const accessToken = Token.createAccessToken(req.user as User)

    res.set('Authorization', accessToken)
    res.status(204).send()
  }
}

export default LoginController
