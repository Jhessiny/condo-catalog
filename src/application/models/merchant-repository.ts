export interface MerchantRepository {
  add: (merchantData: object) => Promise<{ id: string }>
}
