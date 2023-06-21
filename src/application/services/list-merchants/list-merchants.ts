import { type Either, error, success } from '../../../shared/either'
import { type MerchantRepository, type Service } from '../../models'
import { type MerchantDTO } from '../../models/merchant-dto'

export class ListMerchantService implements Service {
  constructor(private readonly merchantRepository: MerchantRepository) {}

  public async execute(request: any): Promise<Either<Error, MerchantDTO[]>> {
    const returnValue = await this.merchantRepository.findAll()
    if (returnValue) return success(returnValue)
    return error(new Error())
  }
}
