import { merchantPostgresRepository } from '@/infra/typeorm/repositories'
import { CreateMerchantService } from '@/application/services/create-merchant/create-merchant'
import { CreateMerChantController } from '@/presentation/controllers/create-merchant-controller/create-merchant-controller'
import { type Controller } from '@/presentation/models/controller'

export const makeCreateMerchantController = (): Controller =>
  new CreateMerChantController(
    new CreateMerchantService(merchantPostgresRepository),
  )
