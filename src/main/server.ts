import 'dotenv/config'
import expressServer from '../infra/express/express-server'
import { type Route } from '../application/models/route'
import { createMerchantController } from './controllers/create-merchant-controller'

const port = process.env.PORT ?? 5000
const origin =
  process.env.NODE_ENV === 'development' ? '*' : process.env.FRONTEND_URL

const routes: Route[] = [
  {
    name: 'catalog-list',
    path: '/catalog',
    method: 'post',
    handler: createMerchantController,
  },
]
expressServer.setRoutes(routes)
expressServer.start(Number(port), { origin })
