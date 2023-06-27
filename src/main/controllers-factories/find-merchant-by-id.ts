import { type Controller } from '@/presentation/models/controller'
import { merchantPostgresRepository } from '@/infra/typeorm/repositories'
import { FindMerchantByIdController } from '@/presentation/controllers/find-merchant-by-id-controller/find-merchant-by-id-controller'
import { FindMerchantByIdService } from '@/application/services/find-merchant-by-id/find-merchant-by-id'

export const makeFindMerchantByIdController = (): Controller =>
  new FindMerchantByIdController(
    new FindMerchantByIdService(merchantPostgresRepository),
  )
