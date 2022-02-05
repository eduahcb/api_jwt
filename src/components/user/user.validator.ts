import Joi from 'joi'

import { Request, Response, NextFunction } from 'express'

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    })

    await schema.validateAsync(req.body)

    next()
  } catch (error) {
    res.status(400).json(error)
  }
}
