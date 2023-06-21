/* eslint-disable accessor-pairs */
import express, { Router, type Express } from 'express'
import { type Server } from '../../application/models/server'
import cors from 'cors'
import { type Route } from '../../application/models/route'
import bodyParser from 'body-parser'
import { expressRequestAdapter } from './request-adapter'

const expressApp = express()
const expressRouter = Router()
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

class ExpressServer implements Server {
  private readonly _app: Express
  private readonly _router: Router
  public start(port: number, corsConfig?: cors.CorsOptions): void {
    this._app.use(cors(corsConfig))
    this._app.use(urlencodedParser)
    this._app.use(jsonParser)
    this._app.use('/api', this._router)
    this._app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  }

  public setRoutes(routesConfig: Route[]): void {
    routesConfig.map((route) => {
      return this._router[route.method](
        [route.path],
        [...(route?.middlewares ?? []), expressRequestAdapter(route.handler)],
      )
    })
  }

  constructor(app: Express, router: Router) {
    this._app = app
    this._router = router
    Object.freeze(this)
  }
}

export default new ExpressServer(expressApp, expressRouter)
