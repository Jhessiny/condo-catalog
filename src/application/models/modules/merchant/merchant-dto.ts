import { type Merchant } from '@/domain/merchant'

export type MerchantDTO = Merchant.Data & {
  id: string
}
