import { type Controller } from '@/presentation/models/controller'
import { type HttpResponse, type HttpRequest } from '@/presentation/models/http'
import { badRequest, created } from '../util'
import { type CreateMerchantDTO } from '@/domain/merchant'
import { type CreateMerchantService } from '@/application/services'

export class CreateMerChantController implements Controller {
  constructor(private readonly service: CreateMerchantService) {}

  async handle(
    request: HttpRequest<CreateMerchantDTO>,
  ): Promise<HttpResponse<{ id: string }>> {
    if (!request.body) return badRequest(new Error('Invalid'))
    const merchantData: CreateMerchantDTO = {
      category: request.body.category,
      name: request.body.name,
      subCategory: request.body.subCategory,
      phone: request.body.phone,
      miniBio: request.body.miniBio,
    }
    const serviceResponse = await this.service.execute(merchantData)

    if (serviceResponse.isError()) {
      return badRequest(serviceResponse.value)
    }
    return created(serviceResponse.value)
  }
}
