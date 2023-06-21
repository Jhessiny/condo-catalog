export class Server {
  public start: (port: number, corsConfig: object) => void
  public setRoutes: (routesConfig: any) => void
}
