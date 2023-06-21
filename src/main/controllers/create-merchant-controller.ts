import { CreateMerchantService } from '../../application/services/create-merchant/create-merchant'
import { CreateMerChantController } from '../../presentation/controllers/create-merchant-controller/create-merchant-controller'
import { MemoryMerchantRepository } from '../../infra/merchant-memory-repository/memory-merchant-repository'

export const createMerchantController = new CreateMerChantController(
  new CreateMerchantService(new MemoryMerchantRepository()),
)
