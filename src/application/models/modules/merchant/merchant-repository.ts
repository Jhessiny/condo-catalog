import { type MerchantDTO } from './merchant-dto'

export interface MerchantRepository {
  add: (merchantData: object) => Promise<{ id: string }>
  findAll: () => Promise<MerchantDTO[]>
  // findById: (id: string) => Promise<Merchant[]>
}
