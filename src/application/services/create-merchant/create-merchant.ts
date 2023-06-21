import { Merchant } from '../../../domain/merchant'
import { type Either, error, success } from '../../../shared/either'
import { type MerchantRepository, type Service } from '../../models'

export class CreateMerchantService implements Service {
  constructor(private readonly merchantRepository: MerchantRepository) {}

  public async execute(request: any): Promise<Either<Error, { id: string }>> {
    const merchantOrError = Merchant.create(request)
    if (merchantOrError.isError()) {
      return error(new Error('invalid'))
    }

    const merchant = merchantOrError.value

    const returnValue = await this.merchantRepository.add(merchant)
    return success(returnValue)
  }
}
