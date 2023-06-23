import { CreateMerchantService } from '../../application/services/create-merchant/create-merchant'
import { CreateMerChantController } from '../../presentation/controllers/create-merchant-controller/create-merchant-controller'
import { merchantMemoryRepository } from '../../infra/merchant-memory-repository/memory-merchant-repository'
import { type Controller } from '@/presentation/models/controller'

export const makeCreateMerchantController = (): Controller =>
  new CreateMerChantController(
    new CreateMerchantService(merchantMemoryRepository),
  )
