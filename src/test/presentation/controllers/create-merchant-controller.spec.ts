import { MemoryMerchantRepository } from '@/infra/merchant-memory-repository/memory-merchant-repository'
import { CreateMerchantService } from '../../../application/services/create-merchant/create-merchant'
import { faker } from '@faker-js/faker'
import { type MerchantDTO } from '@/application/models'
import { AggregateError } from '@/shared/error-aggregator'
import { CreateMerChantController } from '@/presentation/controllers/create-merchant-controller/create-merchant-controller'
import { type Controller } from '@/presentation/models/controller'

export const makeSut = (): Controller =>
  new CreateMerChantController(
    new CreateMerchantService(new MemoryMerchantRepository()),
  )

describe('Test CreateMerChantController', () => {
  it('should return statusCode 201 and id when passing correct params', async () => {
    const createParams: MerchantDTO = {
      name: faker.word.noun(),
      category: faker.word.noun(),
      subCategory: faker.word.noun(),
      miniBio: faker.word.words(5),
      phone: faker.phone.number('41 9#### ####'),
    }
    const sut = makeSut()
    const res = await sut.handle({ body: createParams })
    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty('id')
  })
  it('should return statusCode 400 and AggregateError when with incorrect phone', async () => {
    const createParams: MerchantDTO = {
      name: faker.word.noun(),
      category: faker.word.noun(),
      subCategory: faker.word.noun(),
      phone: faker.phone.number('41 9#### #### #'),
    }
    const sut = makeSut()
    const res = await sut.handle({ body: createParams })
    expect(res.statusCode).toBe(400)
    expect(res.body).toBeInstanceOf(AggregateError)
    expect('errors' in res.body && res.body.errors).toHaveLength(1)
  })
})
