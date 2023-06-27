import { type MerchantDTO } from '@/domain/merchant'
import { type Either, error, success } from '../../../shared/either'
import { type MerchantRepository, type Service } from '../../models'

export class FindMerchantByIdService implements Service {
  constructor(private readonly merchantRepository: MerchantRepository) {}

  public async execute(request: {
    id: string
  }): Promise<Either<Error, MerchantDTO>> {
    const returnValue = await this.merchantRepository.findById(request.id)
    if (returnValue.isError()) return error(returnValue.value)
    return success(returnValue.value)
  }
}
