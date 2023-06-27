import { type MerchantDTO } from '@/domain/merchant'
import { type Either, error, success } from '@/shared/either'
import { type MerchantRepository, type Service } from '@/application/models'

export class ListMerchantService implements Service {
  constructor(private readonly merchantRepository: MerchantRepository) {}

  public async execute(): Promise<Either<Error, MerchantDTO[]>> {
    const returnValue = await this.merchantRepository.findAll()
    if (returnValue) return success(returnValue)
    return error(new Error())
  }
}
