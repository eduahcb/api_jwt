import { Request, Response } from 'express'

import blockList from '../../config/redis/blockList'
class LogoutController {
  logout = async (req: Request, res: Response): Promise<void> => {
    await blockList.add(req.token)
    res.status(204).send()
  }
}

export default LogoutController
