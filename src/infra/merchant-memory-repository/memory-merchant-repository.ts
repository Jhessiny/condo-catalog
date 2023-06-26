import { type MerchantDTO, type MerchantRepository } from '@/application/models'
import { v4 as uuidv4 } from 'uuid'
import { type Merchant } from '@/domain/merchant'

export class MemoryMerchantRepository implements MerchantRepository {
  private readonly merchantsList: MerchantDTO[] = []
  async add(merchantData: Merchant.CreateDto): Promise<{ id: string }> {
    const newMerchant: MerchantDTO = {
      id: uuidv4(),
      ...merchantData,
    }
    this.merchantsList.push(newMerchant)
    return { id: newMerchant.id }
  }

  async findAll(): Promise<MerchantDTO[]> {
    console.log(this.merchantsList)
    return this.merchantsList
  }
}

export const merchantMemoryRepository = new MemoryMerchantRepository()
