import { MemoryMerchantRepository } from '@/infra/merchant-memory-repository/memory-merchant-repository'
import { CreateMerchantService } from '../../../application/services/create-merchant/create-merchant'
import { faker } from '@faker-js/faker'
import { type MerchantDTO } from '@/application/models'
import { AggregateError } from '@/shared/error-aggregator'

describe('Test CreateMerchantService', () => {
  it('should return success on execute with correct params', async () => {
    const createService = new CreateMerchantService(
      new MemoryMerchantRepository(),
    )
    const createParams: MerchantDTO = {
      name: faker.word.noun(),
      category: faker.word.noun(),
      subCategory: faker.word.noun(),
      miniBio: faker.word.words(5),
      phone: faker.phone.number('41 9#### ####'),
    }
    const res = await createService.execute(createParams)
    expect(res.isSuccess()).toBeTruthy()
    expect(res.value).toHaveProperty('id')
  })
  it('should return error on execute with wrong params', async () => {
    const createService = new CreateMerchantService(
      new MemoryMerchantRepository(),
    )
    const createParams: MerchantDTO = {
      name: faker.word.noun(),
      category: faker.word.noun(),
      subCategory: faker.word.noun(),
      phone: faker.phone.number('41 9#### #### #'),
    }
    const res = await createService.execute(createParams)
    expect(res.isError()).toBeTruthy()
    expect(res.value).toBeInstanceOf(AggregateError)
  })
})
