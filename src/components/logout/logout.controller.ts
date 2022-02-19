import { Request, Response } from 'express'

class LogoutController {
  logout = async (req: Request, res: Response): Promise<void> => {
    res.status(204).send()
  }
}

export default LogoutController
