import { type Controller } from '@/presentation/models/controller'
import { type HttpResponse } from '@/presentation/models/http'
import { badRequest, created } from '../util'
import { type ListMerchantService } from '@/application/services'

export class ListMerchantController implements Controller {
  constructor(private readonly service: ListMerchantService) {}

  async handle(): Promise<HttpResponse> {
    const serviceResponse = await this.service.execute()

    if (serviceResponse.isError()) {
      return badRequest(serviceResponse.value)
    }
    return created(serviceResponse.value)
  }
}
