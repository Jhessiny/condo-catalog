import { type Request, type Response } from 'express'
import { type Controller } from '../../presentation/models/controller'

export const expressRequestAdapter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpResponse = await controller.handle(req)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
