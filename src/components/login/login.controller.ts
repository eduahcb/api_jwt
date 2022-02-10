import { Request, Response } from 'express'

import { createAccessToken } from './tokens'

type User = {
  id: string
}

class LoginController {
  login = async (req: Request, res: Response): Promise<void> => {
    const accessToken = createAccessToken(req.user as User)

    res.set('Authorization', accessToken)
    res.status(204).send()
  }
}

export default LoginController
