import express, { type Router, type Express } from 'express'
import { type Server } from '../../application/models/server'
import cors from 'cors'
import router from './router'

const expressApp = express()

class ExpressServer implements Server {
  public start(port: number, corsConfig?: cors.CorsOptions): void {
    this.app.use(cors(corsConfig))
    this.app.use(this.router)
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  }

  constructor(private readonly app: Express, private readonly router: Router) {
    Object.freeze(this)
  }
}

export default new ExpressServer(expressApp, router)
