import 'dotenv/config'
import expressServer from '../infra/express/express-server'

const port = process.env.PORT ?? 5000
const origin =
  process.env.NODE_ENV === 'development' ? '*' : process.env.FRONTEND_URL

expressServer.start(Number(port), { origin })
