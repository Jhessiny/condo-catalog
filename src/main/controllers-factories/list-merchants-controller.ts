import { ListMerchantController } from '@/presentation/controllers'
import { ListMerchantService } from '@/application/services/list-merchants/list-merchants'
import { type Controller } from '@/presentation/models/controller'
import { merchantPostgresRepository } from '@/infra/typeorm/repositories'

export const makeListMerchantsController = (): Controller =>
  new ListMerchantController(
    new ListMerchantService(merchantPostgresRepository),
  )
