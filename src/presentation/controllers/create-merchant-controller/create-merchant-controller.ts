import { type Service } from '@/application/models'
import { type Controller } from '@/presentation/models/controller'
import { type HttpResponse, type HttpRequest } from '@/presentation/models/http'
import { badRequest, created } from '../util'
import { type CreateMerchantDto } from '@/application/dtos'

export class CreateMerChantController implements Controller {
  constructor(private readonly service: Service) {}

  async handle(
    request: HttpRequest<CreateMerchantDto>,
  ): Promise<HttpResponse<{ id: string }>> {
    if (!request.body) return badRequest(new Error('Invalid'))
    const merchantData: CreateMerchantDto = {
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
