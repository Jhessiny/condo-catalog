import { type MerchantDTO } from '@/domain/merchant'
import { type Either } from '@/shared/either'

export interface MerchantRepository {
  add: (merchantData: object) => Promise<{ id: string }>
  findAll: () => Promise<MerchantDTO[]>
  findById: (id: string) => Promise<Either<Error, MerchantDTO>>
}
