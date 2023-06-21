import { type Service } from '../../../application/models'
import { type Controller } from '../../models/controller'
import { type HttpResponse } from '../../models/http'
import { badRequest, created } from '../util'

export class ListMerchantController implements Controller {
  constructor(private readonly service: Service) {}

  async handle(): Promise<HttpResponse> {
    const serviceResponse = await this.service.execute({})

    if (serviceResponse.isError()) {
      return badRequest(serviceResponse.value)
    }
    return created(serviceResponse.value)
  }
}
