import { type Either } from '../../shared/either'

export interface Service {
  execute: (request?: any) => Promise<Either<Error, any>>
}
