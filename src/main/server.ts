import 'dotenv/config'
import expressServer from '../infra/express/express-server'
import { routes } from './routes'

const port = process.env.PORT ?? 5000
const origin =
  process.env.NODE_ENV === 'development' ? '*' : process.env.FRONTEND_URL

expressServer.setRoutes(routes)
expressServer.start(Number(port), { origin })
