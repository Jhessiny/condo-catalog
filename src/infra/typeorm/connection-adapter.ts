import { DataSource } from 'typeorm'
import { type DBTypeORMConnection } from './models'

export class DBTypeORMConnectionAdapter implements DBTypeORMConnection {
  private static instance: DBTypeORMConnectionAdapter
  private _dataSource: DataSource

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  async connect(params: DBTypeORMConnection.Params): Promise<void> {
    this._dataSource = new DataSource({
      type: 'postgres',
      host: params.host,
      port: params.port,
      username: params.username,
      password: params.password,
      database: params.database,
      // eslint-disable-next-line n/no-path-concat
      entities: [__dirname + '/**/*.entity.ts'],
      synchronize: true,
    })
    await this._dataSource.initialize()
  }

  async close(): Promise<void> {
    await this._dataSource.destroy()
  }

  get dataSource(): DataSource {
    return this._dataSource
  }

  public static getInstance(): DBTypeORMConnectionAdapter {
    if (!DBTypeORMConnectionAdapter.instance) {
      DBTypeORMConnectionAdapter.instance = new DBTypeORMConnectionAdapter()
    }

    return DBTypeORMConnectionAdapter.instance
  }
}
