import { type MerchantRepository } from '../../application/models'
import { v4 as uuidv4 } from 'uuid'
import { type Merchant } from '../../domain/merchant'

export class MemoryMerchantRepository implements MerchantRepository {
  private readonly merchantsList: Merchant.Data[] = []
  async add(merchantData: Merchant.Data): Promise<{ id: string }> {
    const newMerchant: MemoryMerchantRepository.Data = {
      id: uuidv4(),
      ...merchantData,
    }
    this.merchantsList.push(newMerchant)
    return { id: newMerchant.id }
  }
}

export namespace MemoryMerchantRepository {
  export type Data = Merchant.Data & {
    id: string
  }
}
