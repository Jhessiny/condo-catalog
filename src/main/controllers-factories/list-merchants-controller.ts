import { ListMerchantController } from '../../presentation/controllers/list-merchants-controller copy/list-merchants-controller'
import { merchantMemoryRepository } from '../../infra/merchant-memory-repository/memory-merchant-repository'
import { ListMerchantService } from '../../application/services/list-merchants/list-merchants'
import { type Controller } from '@/presentation/models/controller'

export const makeListMerchantsController = (): Controller =>
  new ListMerchantController(new ListMerchantService(merchantMemoryRepository))
