export interface DBTypeORMConnection {
  connect: (params: DBTypeORMConnection.Params) => Promise<void>
  close: () => Promise<void>
}

export namespace DBTypeORMConnection {
  export type Params = {
    host: string
    database: string
    port?: number
    username: string
    password: string
    name?: string
  }
}
