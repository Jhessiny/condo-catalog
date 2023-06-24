import { Merchant } from '../entity/merchant.entity'
import { type MerchantDTO, type MerchantRepository } from '@/application/models'
import { DBTypeORMConnectionAdapter } from '../connection-adapter'

class MerchantPostgresRepository implements MerchantRepository {
  constructor(private readonly dbConnection: DBTypeORMConnectionAdapter) {}

  async add(merchantData: MerchantDTO): Promise<{ id: string }> {
    const newMerchant = new Merchant()
    newMerchant.category = merchantData.category
    newMerchant.name = merchantData.name
    newMerchant.subCategory = merchantData.subCategory
    newMerchant.phone = merchantData.phone
    newMerchant.miniBio = merchantData.miniBio
    const ormRepo = this.dbConnection.dataSource.getRepository(Merchant)
    const response = await ormRepo.save(newMerchant)
    return { id: response.id }
  }

  async findAll(): Promise<MerchantDTO[]> {
    const ormRepo = this.dbConnection.dataSource.getRepository(Merchant)
    const all = await ormRepo.find()
    return all as MerchantDTO[]
  }
}

export const merchantPostgresRepository = new MerchantPostgresRepository(
  DBTypeORMConnectionAdapter.getInstance(),
)
