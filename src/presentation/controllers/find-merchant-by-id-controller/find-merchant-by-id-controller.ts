import { type FindMerchantByIdService } from '@/application/services/find-merchant-by-id/find-merchant-by-id'
import { type Controller } from '@/presentation/models/controller'
import { type HttpResponse } from '@/presentation/models/http'
import { badRequest, ok, notFound } from '../util'
import { ValidationBuilder } from '@/validations/validators/validation-builder/validation-builder'
import { type MerchantDTO } from '@/domain/merchant'

export class FindMerchantByIdController
  implements Controller<never, { id: string }>
{
  constructor(private readonly service: FindMerchantByIdService) {}

  async handle(request: {
    params: { id: string }
  }): Promise<HttpResponse<MerchantDTO>> {
    const error = ValidationBuilder.value(request.params.id, 'id')
      .uuid()
      .trigger()
    if (error) return badRequest(error)
    const serviceResponse = await this.service.execute(request.params)

    if (serviceResponse.isError()) {
      return notFound(serviceResponse.value)
    }
    return ok(serviceResponse.value)
  }
}
