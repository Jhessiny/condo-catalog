import { success } from './../../../shared/either'
import { Merchant } from '../entity/merchant.entity'
import { type MerchantRepository } from '@/application/models'
import { DBTypeORMConnectionAdapter } from '../connection-adapter'
import { type Either, error } from '@/shared/either'
import { type MerchantDTO } from '@/domain/merchant'

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

  async findById(id: string): Promise<Either<Error, MerchantDTO>> {
    const ormRepo = this.dbConnection.dataSource.getRepository(Merchant)
    const one = await ormRepo.findOne({ where: { id } })
    if (!one) return error(new Error('No merchant found'))
    return success(one as MerchantDTO)
  }
}

export const merchantPostgresRepository = new MerchantPostgresRepository(
  DBTypeORMConnectionAdapter.getInstance(),
)
