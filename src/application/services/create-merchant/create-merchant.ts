import { type CreateMerchantDTO, Merchant } from '@/domain/merchant'
import { type Either, error, success } from '@/shared/either'
import { type MerchantRepository, type Service } from '@/application/models'
import { type InvalidMerchantDataError } from '@/domain/errors'

export class CreateMerchantService implements Service {
  constructor(private readonly merchantRepository: MerchantRepository) {}

  public async execute(
    request: CreateMerchantDTO,
  ): Promise<Either<InvalidMerchantDataError, { id: string }>> {
    const merchantOrError = Merchant.create(request)
    if (merchantOrError.isError()) {
      return error(merchantOrError.value)
    }

    const merchant = merchantOrError.value

    const returnValue = await this.merchantRepository.add(merchant)
    return success(returnValue)
  }
}
