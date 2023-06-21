import { type Controller } from '../../presentation/models/controller'

export type Route = {
  name: string
  path: string
  method: 'get' | 'post'
  middlewares?: Array<(req: any, res: any, next: () => any) => void>
  handler: Controller
}
