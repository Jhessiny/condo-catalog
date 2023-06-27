import { success } from '@/shared/either'
import { type MerchantRepository } from '@/application/models'
import { v4 as uuidv4 } from 'uuid'
import { type MerchantDTO, type CreateMerchantDTO } from '@/domain/merchant'
import { error, type Either } from '@/shared/either'

export class MemoryMerchantRepository implements MerchantRepository {
  private readonly merchantsList: MerchantDTO[] = []
  async add(merchantData: CreateMerchantDTO): Promise<{ id: string }> {
    const newMerchant: MerchantDTO = {
      id: uuidv4(),
      ...merchantData,
    }
    this.merchantsList.push(newMerchant)
    return { id: newMerchant.id }
  }

  async findAll(): Promise<MerchantDTO[]> {
    return this.merchantsList
  }

  async findById(id: string): Promise<Either<Error, MerchantDTO>> {
    const one = this.merchantsList.find((merchant) => merchant.id === id)
    if (!one) return error(new Error('No merchant found'))
    return success(one)
  }
}

export const merchantMemoryRepository = new MemoryMerchantRepository()
