/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import 'dotenv/config'
import expressServer from '@/infra/express/express-server'
import { routes } from './routes'
import { DBTypeORMConnectionAdapter } from '@/infra/typeorm/connection-adapter'

const applicationBootstrap = async (): Promise<void> => {
  const connection = DBTypeORMConnectionAdapter.getInstance()
  await connection.connect({
    host: process.env.DB_HOST as string,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    username: process.env.DB_USER as string,
    password: process.env.DB_PASS as string,
    database: process.env.DB_NAME as string,
  })

  const origin =
    process.env.NODE_ENV === 'development' ? '*' : process.env.FRONTEND_URL

  expressServer.setRoutes(routes)
  expressServer.start(Number(process.env.PORT ?? 5000), { origin })
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
applicationBootstrap()
